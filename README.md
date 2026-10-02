# 🏏 IPL Analytics & Machine Learning Prediction Dashboard (2008–2026)

![IPL Dashboard Banner](https://img.shields.io/badge/IPL_Dashboard-2008--2026-blue?style=for-the-badge&logo=cricket)
![Django](https://img.shields.io/badge/Django-5.2-092E20?style=for-the-badge&logo=django)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikit-learn)

---

## 📌 Executive Summary

The **IPL Analytics & ML Prediction Dashboard** is a full-stack research and interactive visualization platform covering 19 seasons of the **Indian Premier League (2008–2026)**. 

The platform combines a **Django REST Framework** backend with a high-performance **React + Vite** frontend. It features historical performance analysis, player leaderboards, server-side **Matplotlib analytics rendering**, interactive **Recharts visualizations**, and a **Machine Learning Match Outcome Predictor Engine**.

---

## 🚀 Key Features & Capabilities

### 1. 🏆 Season-by-Season Analytics (2008–2026)
- Complete coverage of all 19 IPL seasons.
- Winner details, runner-up, final venue, winning margin, and Player of the Season.
- **Orange Cap** (Most Runs) and **Purple Cap** (Most Wickets) breakdown for every season.
- Detailed match results with team scores, venue, and Player of the Match metrics.

### 2. 👑 All-Time Historical Leaderboards
- **Title Champions Leaderboard**: Ranking team dominance (e.g., CSK, MI, KKR).
- **All-Time Sixes & Fours Hitters**: Aggregated boundary stats over 19 years.
- **All-Time Top Run Scorers**: Comprehensive career run totals across all seasons.

### 3. 🤖 Machine Learning Match Predictor Engine
- Predicts win probabilities for any two IPL teams (e.g., Chennai Super Kings vs. Mumbai Indians).
- Features dynamic inputs for **Toss Winner**, **Toss Decision** (Bat/Field), **Venue**, and **Target Year**.
- Integrates historical head-to-head win percentages, venue bias, and toss factor algorithms.

### 4. 📊 Dual Visualization Engines
- **Interactive Client-Side Charts**: Built with `Recharts` for interactive boundary distributions, season trends, and team comparisons.
- **Server-Side Matplotlib Engine**: Python backend generates publication-grade data visualizations rendered as Base64 images directly on the frontend.

### 5. 🎉 Interactive Celebratory Champion Modal
- Interactive modal with confetti animations highlighting the champion team, theme colors, and celebration messages.

---

## 🏗 System Architecture & Technology Stack

```
 ┌─────────────────────────────────────────────────────────────┐
 │                      REACT 19 FRONTEND                      │
 │   - Vite 8.3 Dev Server (Port 5174)                         │
 │   - TailwindCSS v4 Styling & Lucide React Icons             │
 │   - Recharts Interactive Graphs & Canvas Confetti            │
 └──────────────────────────────┬──────────────────────────────┘
                                │ HTTP / REST API
 ┌──────────────────────────────▼──────────────────────────────┐
 │                      DJANGO REST BACKEND                    │
 │   - Python 3.13 & Django 5.2 Server (Port 8000)            │
 │   - Django REST Framework (DRF) Serializers & Views         │
 │   - Scikit-Learn / Custom ML Engine for Match Predictions   │
 │   - Matplotlib Base64 Image Generation Engine               │
 └──────────────────────────────┬──────────────────────────────┘
                                │ ORM Queries
 ┌──────────────────────────────▼──────────────────────────────┐
 │                      SQLITE DATABASE                        │
 │   - Season Model (19 Seasons, 2008–2026)                    │
 │   - PlayerSeasonStat Model (Orange/Purple Cap & Stats)      │
 │   - Match Model (Detailed Match Results & Venues)           │
 └─────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```directory
dashboard/
├── backend/                        # Django REST Backend
│   ├── api/                        # Main API Application
│   │   ├── management/
│   │   │   └── commands/
│   │   │       └── seed_ipl.py     # Django Management Command to seed database
│   │   ├── models.py               # Season, PlayerSeasonStat, Match models
│   │   ├── serializers.py          # DRF Serializers
│   │   ├── views.py                # REST Endpoints (Seasons, Predictor, Overview)
│   │   ├── ml_engine.py            # Machine Learning Match Outcome Model
│   │   ├── matplotlib_engine.py    # Python Matplotlib chart generator
│   │   └── urls.py                 # API Routing configuration
│   ├── ipl_backend/                # Django Project Settings & Root URLs
│   │   ├── settings.py             # App configuration, Installed apps, CORS
│   │   └── urls.py                 # Root URL router
│   ├── seed_data.py                # Direct Python script to seed database
│   ├── db.sqlite3                  # SQLite Database
│   └── manage.py                   # Django CLI Runner
│
├── frontend/                       # React 19 + Vite Frontend
│   ├── public/                     # Static Assets & Icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                  # Top Navigation & Season Switcher
│   │   │   ├── SeasonOverviewTab.jsx       # Season KPI, Orange/Purple Cap cards
│   │   │   ├── AllTimeAnalyticsTab.jsx     # All-Time 2008-2026 Leaderboards
│   │   │   ├── GraphsVisualizationsTab.jsx # Recharts interactive analytics
│   │   │   ├── MatplotlibEngineTab.jsx     # Server-side Matplotlib views
│   │   │   ├── MLPredictorTab.jsx          # Machine Learning Match Predictor UI
│   │   │   ├── SixesAndFoursTab.jsx        # Boundary analytics
│   │   │   └── WinnerCongratulationsModal.jsx # Celebratory Modal
│   │   ├── App.jsx                 # Main application state & router
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # TailwindCSS & Global Design System
│   ├── package.json                # React & Node Dependencies
│   └── vite.config.js              # Vite configuration
└── README.md                       # Comprehensive Project Documentation
```

---

## 🔌 API Endpoint Documentation

Base URL: `http://127.0.0.1:8000/api/`

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/seasons/` | `GET` | Retrieves list of all 19 IPL seasons (2008–2026) with winner metadata. |
| `/api/seasons/{year}/` | `GET` | Retrieves full season breakdown, player stats, match list, and **Matplotlib Base64 charts**. |
| `/api/overview/` | `GET` | Aggregates all-time 2008–2026 stats (title counts, top 10 sixes/fours/runs hitters, yearly trends). |
| `/api/predict/` | `POST` / `GET` | Executes ML prediction model for given `team1`, `team2`, `toss_winner`, `toss_decision`, `venue`, and `year`. |

### Sample ML Predictor Payload (`POST /api/predict/`)

```json
{
  "team1": "Chennai Super Kings",
  "team2": "Mumbai Indians",
  "toss_winner": "Chennai Super Kings",
  "toss_decision": "Bat",
  "venue": "Wankhede Stadium, Mumbai",
  "year": 2026
}
```

---

## 🛠️ Step-by-Step Installation & Setup Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Python**: 3.10+ (Python 3.13 recommended)
- **Node.js**: 18+ (Node 20+ recommended) & `npm`

---

### 2. Backend Setup (Django REST Framework)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Activate the Virtual Environment**:
   - **Windows (PowerShell)**:
     ```powershell
     ..\Scripts\Activate.ps1
     ```
   - **Windows (CMD)**:
     ```cmd
     ..\Scripts\activate.bat
     ```
   - **Linux / macOS**:
     ```bash
     source ../bin/activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install django djangorestframework django-cors-headers matplotlib scikit-learn pandas numpy
   ```

4. **Run Database Migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Seed the IPL Database (2008–2026 Data)**:
   ```bash
   python seed_data.py
   ```
   *(Or alternatively via Django Management Command)*:
   ```bash
   python manage.py seed_ipl
   ```

---

### 3. Frontend Setup (React + Vite)

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Node Dependencies**:
   ```bash
   npm install
   ```

---

## ⚡ Running the Servers

### Starting the Django Backend Server
Run the Django server on Port **8000**:
```bash
cd backend
python manage.py runserver 8000
```
*(The REST API will be accessible at `http://127.0.0.1:8000/api/`)*

### Starting the Vite Frontend Server
In a separate terminal window, launch the frontend dev server:
```bash
cd frontend
cmd /c npm run dev
```
*(The Web Dashboard will open at `http://localhost:5174/` or `http://localhost:5173/`)*

---

## 🎯 Verification & Testing

1. Open your browser and navigate to `http://localhost:5174/`.
2. Select any IPL season from **2008 to 2026** using the top navigation bar.
3. Explore the tabs:
   - **Season Overview**: View Champion details, Orange & Purple Cap winners.
   - **All-Time Analytics**: View overall 19-year leaderboards.
   - **ML Predictor**: Select teams and run match simulations.
   - **Matplotlib Engine**: Inspect server-rendered analytical plots.

---

## 🤝 Technical Architecture Highlights

- **CORS Configured**: Backend configured with `django-cors-headers` allowing seamless requests from `http://localhost:5173` and `http://localhost:5174`.
- **StatReloader Enabled**: Instant backend updates upon code modification.
- **Vite Hot Module Replacement (HMR)**: Sub-second UI state updates.
