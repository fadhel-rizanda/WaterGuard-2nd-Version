const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

// Root route
app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

// Get data
app.get("/user", (req, res) => {
  const sql = "SELECT * FROM water_conditions";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Update data
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const {
    status,
    ika_score,
    reporter_name,
    email,
    description,
    ikaCategories,
    lastUpdate,
  } = req.body;

  if (
    !status ||
    !reporter_name ||
    !email ||
    !description ||
    !ikaCategories ||
    !lastUpdate
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const checkSql = `SELECT id FROM water_conditions WHERE id = ?`;
  db.query(checkSql, [id], (checkErr, results) => {
    if (checkErr) {
      console.error("Database error:", checkErr);
      return res
        .status(500)
        .json({ error: "Failed to check record existence" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    const sql = `
      UPDATE water_conditions
      SET status = ?, ika_score = ?, reporter_name = ?, email = ?, description = ?, ikaCategories = ?, lastUpdate = ?
      WHERE id = ?`;

    db.query(
      sql,
      [
        status,
        ika_score,
        reporter_name,
        email,
        description,
        ikaCategories,
        lastUpdate,
        id,
      ],
      (err) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Failed to update record" });
        }
        res.json({ success: "Record updated successfully" });
      }
    );
  });
});

// Insert data
app.post("/", (req, res) => {
  const {
    name,
    lat,
    lng,
    status,
    ika_score,
    reporter_name,
    email,
    description,
    ikaCategories,
    lastUpdate,
  } = req.body;
  if (
    !name ||
    !lat ||
    !lng ||
    !status ||    
    !reporter_name ||
    !email ||
    !description ||
    !ikaCategories ||
    !lastUpdate
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sql = `
  INSERT INTO water_conditions (
    name, lat, lng, status, ika_score, reporter_name, email, description, ikaCategories, lastUpdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  db.query(
    sql,
    [
      name,
      lat,
      lng,
      status,
      ika_score,
      reporter_name,
      email,
      description,
      ikaCategories,
      lastUpdate,
    ],
    (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to insert record" });
      }
      res.json({ success: "Record inserted successfully" });
    }
  );
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
