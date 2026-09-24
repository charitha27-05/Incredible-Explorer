# Incredible Explorer 🌍✈️

> A responsive fullstack web application designed as an interactive tourist guide to explore famous attractions across Indian states and districts, built with clean UI design, Node.js & Express backend, and real-time API integration.

---

## 🌐 Live Application Link

- **Live URL:** [https://incredible-explorer-2.onrender.com/](https://incredible-explorer-2.onrender.com/)
- **Backend Health Check:** [https://incredible-explorer-2.onrender.com/api/health](https://incredible-explorer-2.onrender.com/api/health)

*(Both frontend and backend are hosted and running simultaneously on Render).*

---

## ✨ Features

- **Interactive Destination Finder:** Select states (e.g., Telangana, Andhra Pradesh) and districts to discover top tourist destinations with photos and descriptions.
- **Fullstack Node.js Backend:** Express.js server providing RESTful endpoints for places, authentication, and reviews.
- **User Authentication:** Sign up and log in system with credential verification.
- **Real-Time Ratings & Feedback:** Submit ratings that calculate live overall community review scores.
- **Live Backend Connection Indicator:** Visual badge showing real-time connectivity status (`🟢 Backend: Online`).
- **Responsive UI:** Glassmorphism-inspired design optimized across desktop and mobile screens.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Flexbox/Grid, Glassmorphism), Modern JavaScript (Fetch API)
- **Backend:** Node.js, Express.js, CORS
- **Data Persistence:** JSON-based database storage (`data/places.json`, `data/users.json`, `data/ratings.json`)
- **Deployment & Hosting:** [Render](https://render.com/)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend status and server timestamp |
| `GET` | `/api/places` | Fetch all states and tourist attractions |
| `GET` | `/api/places/:state` | Fetch districts and places for a specific state |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate an existing user |
| `POST` | `/api/ratings` | Submit user star rating and feedback |
| `GET` | `/api/ratings` | Get overall rating statistics and recent reviews |

---

## 💻 Local Development Setup

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/charitha27-05/Incredible-Explorer.git
   cd Incredible-Explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 👥 Team Members

- **ROSHANARA**
- **GAYATHRI**
- **KARISHMA**
- **MANOGNA**
- **CHARITHA**
- **VASUNDHARA**

---

## 📄 License
This project is open source and available under the [ISC License](LICENSE).
