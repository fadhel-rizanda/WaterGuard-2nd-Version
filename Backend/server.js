// https://chatgpt.com/c/935abce7-3485-4020-a030-fb73e3a6f71c lanjutin multer

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// database connection configuration
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

// Get data user account
app.get("/userAccount", (req, res) => {
  const sql = "SELECT * FROM user_accounts";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Insert data user account
app.post("/user-accounts", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
  INSERT INTO user_accounts (
    username, email, password) VALUES (?, ?, ?);`;

  db.query(sql, [username, email, password], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to insert record" });
    }
    res.json({ success: "Record inserted successfully" });
  });
});

// Forget Password Update data user account
app.put("/user-accounts/forgot-password/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const checkSql = `SELECT id FROM user_accounts WHERE id = ?`;
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
      UPDATE user_accounts
      SET password = ?
      WHERE id = ?`;

    db.query(sql, [password, id], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to update record" });
      }
      res.json({ success: "Record updated successfully" });
    });
  });
});

// Update data user account
app.put("/user-accounts/:id", (req, res) => {
  const { id } = req.params;
  const {
    username,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
    role,
    location_name,
    location_lat,
    location_lng,
  } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const checkSql = `SELECT id FROM user_accounts WHERE id = ?`;
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
      UPDATE user_accounts
      SET username = ?, email = ?, password = ?, phone_number = ?, gender = ?, date_of_birth = ?, role = ?, location_name = ?, location_lat = ?, location_lng = ?
      WHERE id = ?`;

    db.query(
      sql,
      [
        username,
        email,
        password,
        phone_number,
        gender,
        date_of_birth,
        role,
        location_name,
        location_lat,
        location_lng,
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

// Delete data user account
app.delete("/user-accounts/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sql = `DELETE FROM user_accounts WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to delete record" });
    }
    res.json({ success: "Record deleted successfully" });
  });
});

// =====================================================================================================

// Get data water condition
app.get("/user", (req, res) => {
  const sql = "SELECT * FROM water_conditions";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// file upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });
// Update data
app.put("/user/:id", upload.single("ika_file"), (req, res) => {
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

    const ika_file = req.file ? req.file.filename : null;
    const file_extension = req.file
      ? path.extname(req.file.originalname).substring(1)
      : null;

    const sql = `
      UPDATE water_conditions
      SET status = ?, ika_score = ?, reporter_name = ?, email = ?, description = ?, ikaCategories = ?, lastUpdate = ?, ika_file = ?, file_extension = ?
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
        ika_file,
        file_extension,
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

// Insert data water condition
app.post("/water-conditions", upload.single("ika_file"), (req, res) => {
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

  const ika_file = req.file ? req.file.filename : null;

  const sql = `
  INSERT INTO water_conditions (
    name, lat, lng, status, ika_score, reporter_name, email, description, ikaCategories, lastUpdate, ika_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

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
      ika_file,
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

// Delete data
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sql = `DELETE FROM water_conditions WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to delete record" });
    }
    res.json({ success: "Record deleted successfully" });
  });
});

// =====================================================================================================

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
