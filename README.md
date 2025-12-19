Password Manager (Full Stack)

A full-stack Password Manager built with Node.js, Express, MySQL, and React.
The application securely encrypts passwords before storing them in the database and allows users to retrieve and decrypt passwords when needed.

Features
🔐 Encrypts passwords before saving them to the database
📦 Stores encrypted passwords securely in MySQL
🔓 Decrypts passwords when retrieving them
🌐 REST API built with Express & Node.js
💻 Frontend built with React
🧩 Clean separation between frontend and backend

Tech Stack
- React
- Node.js
- Express.js
- Crypto (Node.js built-in module)
- MySQL

How It Works
1. User enters a password in the React frontend
2. Password is sent to the backend via an API request
3. Backend encrypts the password using AES encryption
4. Encrypted password and IV are stored in MySQL
5. When requested, the backend decrypts the password and sends it back to the frontend
