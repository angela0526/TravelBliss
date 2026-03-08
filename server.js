const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/book", (req, res) => {

  const {
    fullname,
    email,
    phone,
    gender,
    date,
    destination,
    notes
  } = req.body;

  const query = `
    INSERT INTO bookings
    (fullname, email, phone, gender, travel_date, destination, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [fullname, email, phone, gender, date, destination, notes],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).json({ message: "Database error" });
      } else {
        res.json({ message: "Booking stored successfully!" });
      }

    }
  );

});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "john2005",
  database: "travel_bliss",
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});