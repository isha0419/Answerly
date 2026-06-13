# Answerly 🤖

Answerly is an AI-powered chatbot built using the MERN stack and LangChain. It enables users to have intelligent conversations with an AI assistant while maintaining persistent chat history and real-time communication.

## Features

* AI-powered conversations using LangChain
* User Authentication (Register/Login)
* Persistent Chat History
* Real-time messaging with Socket.IO
* MongoDB database integration

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Tailwind CSS
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO
* LangChain

## Project Structure

```text
Answerly/
├── Backend/
├── Frontend/
└── README.md
```

## Environment Variables

### Backend (.env)

```env
MONGO_URI=
MISTRAL_API_KEY=
JWT_SECRET=
GEMINI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_USER=
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd Answerly
```

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

## Future Improvements

* Multiple AI model support
* Image upload and analysis
* UI-UX enhancements
* AI memory and personalization
