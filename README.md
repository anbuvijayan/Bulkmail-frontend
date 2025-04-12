# 📬 Bulk Mail App - Frontend

A React-based frontend for sending bulk emails using uploaded Excel or CSV files. This application allows users to upload a list of email addresses and send a custom message to all of them at once via a connected backend API.

### 🔗 Live Demo
[Visit the Live App](https://bulkmail-frontend-alpha.vercel.app/)  
*(Replace with your actual deployed URL)*

---

## ✨ Features

- 📤 Upload `.xlsx` or `.csv` files containing email addresses
- 📝 Type and preview your custom message (max 500 characters)
- ✅ Validates emails before sending
- 🚀 Sends bulk emails via backend API
- 📊 Displays total number of emails
- 🔔 User-friendly toast notifications

---

## 🛠️ Tech Stack

- **React** with Hooks
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **XLSX** for file parsing
- **React Toastify** for alerts

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed (v14+)
- Backend API ready (see below)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/bulkmail-frontend.git
cd bulkmail-frontend

📦 Folder Structure

src/
│
├── App.js          # Main component
├── styles.css      # Tailwind + custom styles
├── index.js        # Entry point

📬 Backend
This frontend is meant to work with the Bulk Mail Backend.
Make sure the backend is up and running to send emails successfully.

🙌 Credits
Built with ❤️ by Anbarasan V
