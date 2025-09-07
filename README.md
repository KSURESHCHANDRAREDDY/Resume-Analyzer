# Resume Analyzer

## 📋 Project Description
Resume Analyzer is an AI-powered web application that helps job seekers analyze their resumes.  
The system scans uploaded PDF resumes against common Applicant Tracking System (ATS) criteria, provides a strength score, highlights issues, and suggests improvements and upskill recommendations.

---

## ⚡ Features
- Upload PDF resume for instant analysis.
- View detailed analysis results, including issues and improvement areas.
- AI-generated suggestions for upskilling and fixing resumes.
- Historical view of past uploaded resumes.

---

## 🛠️ Technologies Used
- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL  
- **AI Analysis**: Google Generative AI  
- **File Storage**: In-memory (Multer)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/KSURESHCHANDRAREDDY/Resume-Analyzer
cd resume-analyzer
````

---

### 2️⃣ Folder Structure Overview

```
resume-analyzer/
├── sample_data/           # Test PDF files for manual testing
├── screenshots/           # UI screenshots of the app
├── frontend/              # React frontend code
├── backend/               # Node.js backend code
├── .env.example           # Example environment config
├── README.md              # Project documentation
```

---

### 3️⃣ Setup Backend

#### ✅ Prerequisites

* Node.js installed
* PostgreSQL database

#### ✅ Steps

1. Create a `.env` file inside the `backend/` folder:

   ```env
   DB_USER=your_db_user
   DB_HOST=your_db_host
   DB_DATABASE=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   GOOGLE_API_KEY=your_google_api_key
   ```

2. Install dependencies and run the backend:

   ```bash
   cd backend
   npm install
   npm start
   ```

3. Backend runs on:
   `http://localhost:8080`

---

### 4️⃣ Setup Frontend

#### ✅ Prerequisites

* Node.js installed

#### ✅ Steps

1. Create a `.env` file inside the `frontend/` folder:

   ```env
   REACT_APP_API_BASE=http://localhost:8080/api
   ```

2. Install dependencies and run the frontend:

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. Open in browser:
   `http://localhost:3000`

---

## ✅ Sample Data

Add your test PDF files to the `sample_data/` folder.

---

## ✅ Screenshots

`./screenshots/` contains UI screenshots of the application.

---

## ⚠️ Notes

* Ensure PostgreSQL is running and configured properly.
* GOOGLE\_API\_KEY is required for resume analysis.
* Multer handles file upload with a max size of 8MB.

---

## 📞 Contact

Created by Koduru Suresh Chandra Reddy.
Email:sureshreddy56003@gmail.com
Feel free to open issues on GitHub or reach out for support.

