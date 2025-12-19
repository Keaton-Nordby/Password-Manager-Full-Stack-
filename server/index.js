import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import { encrypt, decrypt } from "./EncryptionHandler.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000" 
}));

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
    connection.release();
});



app.post("/addpassword", (req, res) => {
    const {password, title} = req.body;
    const hashedPassword = encrypt(password);
    db.query(
        "INSERT INTO passwords (password, title, iv) VALUES (?,?,?)", 
        [hashedPassword.password, title, hashedPassword.iv],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Success')
            }
        }
   );
});

app.get('/showpasswords', (req, res) => {
   db.query('SELECT * FROM passwords;', 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
   })
});

app.post("/decryptpassword", (req, res) => {
    res.send(decrypt(req.body));
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});