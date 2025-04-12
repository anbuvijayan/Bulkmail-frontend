import "./styles.css";
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);
  const [emailList, setEmailList] = useState([]);

  function handleMsg(evt) {
    setMsg(evt.target.value);
  }

  function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emails = XLSX.utils
        .sheet_to_json(worksheet, { header: 1 })
        .map((row) => {
          const email = Array.isArray(row) ? row[0] : row;
          return typeof email === "string" ? email.trim() : "";
        })
        .filter((email) => email !== "" && /\S+@\S+\.\S+/.test(email));

      setEmailList(emails);
      console.log("Parsed Emails:", emails);
    };
    reader.readAsBinaryString(file);
  }

  function send() {
    if (emailList.length === 0) {
      toast.warning("Please upload a valid file with emails.");
      return;
    }
    if (!msg.trim()) {
      toast.warning("Please enter a message before sending.");
      return;
    }

    setStatus(true);
    toast.info("Sending...");

    axios
      .post("https://bulkmail-backend-lmb7.onrender.com/sendemail", { msg: msg, emails: emailList })
      .then((res) => {
        if (res.data === true) {
          toast.success("Email sent successfully!");
        } else {
          toast.error("Failed to send emails.");
        }
        setStatus(false);
      })
      .catch((err) => {
        toast.error("Error sending emails.");
        setStatus(false);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center px-4 py-12">
      <div className="bg-slate-800 text-white w-full max-w-3xl rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-300">
          📨 Send Bulk Emails
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Upload your email list and send custom messages easily.
        </p>

        {/* Enhanced Message Box */}
        <div className="relative w-full">
          <textarea
            className="w-full h-40 p-4 rounded-lg bg-slate-700 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
            placeholder="Type your email message here..."
            value={msg}
            onChange={handleMsg}
            maxLength={500}
          />
          <p className="absolute bottom-2 right-4 text-sm text-gray-400">
            {msg.length}/500
          </p>
        </div>

        {/* Custom File Upload Input */}
        <div className="mt-6">
          <label className="cursor-pointer w-full block">
            <div className="border-2 border-dashed border-blue-400 bg-slate-700 text-center p-6 rounded-xl hover:border-blue-300 hover:bg-slate-600 transition">
              <p className="text-white font-medium">
                📁 Click to upload file (.xlsx or .csv)
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Drag and drop also works
              </p>
            </div>
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFile}
              className="hidden"
            />
          </label>
          <p className="mt-4 text-center text-blue-300 font-medium">
            Total Emails: {emailList.length}
          </p>
        </div>

        {/* Send Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={send}
            disabled={status}
            className={`bg-blue-600 hover:bg-blue-500 transition font-semibold py-3 px-6 rounded-xl shadow-md ${status && "opacity-60 cursor-not-allowed"
              }`}
          >
            {status ? "Sending..." : "Send"}
          </button>
        </div>

      </div>

      {/* Toast Alerts */}
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </div>
  );
}

export default App;
