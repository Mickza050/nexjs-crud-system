const express = require("express");
const mysql = require("mysql2");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "YOUR_SECRET_KEY";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// Database host connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root@desktop",
  database: "next_crud",
});

// Database checking status
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Register Endpoint
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  // console.log('Received data:', { username, password }); // ตรวจสอบข้อมูลที่รับเข้ามา

  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        console.error("Database select error:", err); // Log ข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล
        return res.status(500).json({ error: err.message });
      }
      if (results.length > 0) {
        // console.log('Username already exists');
        return res
          .status(400)
          .json({ message: "มีชื่อผู้ใช้หรืออีเมลนี้ในระบบแล้ว" });
      }

      const uuid = uuidv4();
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      db.query(
        "INSERT INTO users (uuid, username, password, email) VALUES (?, ?, ?, ?)",
        [uuid, username, hashedPassword, email],
        (err, result) => {
          if (err) {
            console.error("Database insert error:", err); // Log ข้อผิดพลาดในการบันทึกข้อมูล
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ message: "สมัครสมาชิกเรียบร้อย" });
        }
      );
    }
  );
});


// Login Endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // เข้ารหัส password ด้วย SHA-256
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // ตรวจสอบ username และ password
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, hashedPassword],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: "ชื่อหรือรหัสผ่านไม่ถูกต้อง" });
      }

      const user = results[0];
      // สร้าง JWT Token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // ส่ง Token กลับไปยัง frontend
      res
        .status(200)
        .json({ message: "คุณเข้าสู่ระบบสำเร็จ", token, username: user.username });
    }
  );
});

// Config port for ther server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
