# 🏆 Study Hub

A full-stack MERN web application designed for interactive learning through flashcards, quizzes, custom deck management, and online competitions.

## Overview
Study Hub helps students and self-learners organize study materials into custom decks, practice active recall with interactive flashcards, test their knowledge with quizzes, and participate in online competitions. Built with a modular React frontend and a secure Node.js/Express REST API backed by MongoDB.

## Key Features
- **User Authentication:** Secure registration and login flow using JSON Web Tokens (JWT) and protected routes.
- **Deck Management:** Create, organize, update, and delete custom study decks.
- **Interactive Flashcards:** Flip-card study mode for active recall and self-paced learning.
- **Quizzes & Competitions 🏆:** Timed/scored quizzes, online competition modes, and rewards to track progress.
- **User Dashboard:** Personalized dashboard displaying saved decks, quiz history, and performance stats.

## Tech Stack
- **Frontend:** React.js, Vite, React Router, Custom Hooks, CSS / Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas / Compass)
- **Authentication:** JWT (JSON Web Tokens), bcrypt

## Getting Started (Run Locally)

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas URI or local MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/lijits/studyhub.git
cd studyhub
```
### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file in the backend folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm start
```
###3. Frontend Setup
Open a new terminal window:

```Bash
cd frontend
npm install
npm run dev
```
###Author
Liji T.S

GitHub: [@lijits](https://github.com/lijits)

