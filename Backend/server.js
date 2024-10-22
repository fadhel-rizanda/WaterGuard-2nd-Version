const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection configuration
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "watergua_admin",
  password: "){9IUWs29_BY",
  database: "watergua_db_waterguard",
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

// Sign Insert data user account
app.post("/user-accounts", (req, res) => {
  const {
    username,
    email,
    password,
    role = "Conventional User",
    location_name,
    location_lat,
    location_lng,
  } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    !location_name ||
    !location_lat ||
    !location_lng
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
  INSERT INTO user_accounts (
    username, email, password, role, location_name, location_lat, location_lng) VALUES (?, ?, ?, ?, ?, ?, ?);`;

  db.query(
    sql,
    [
      username,
      email,
      password,
      role,
      location_name,
      location_lat,
      location_lng,
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

// File upload configuration
const storagePP = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "/uploads/profile-picture");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const uploadPP = multer({ storage: storagePP });

// Update user account data
app.put(
  "/user-accounts/:id",
  uploadPP.single("profile_picture"),
  (req, res) => {
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

      const profile_picture = req.file ? req.file.filename : null;
      const profile_picture_extension = req.file
        ? path.extname(req.file.originalname).substring(1)
        : null;

      const sql = `
      UPDATE user_accounts
      SET username = ?, email = ?, password = ?, phone_number = ?, gender = ?, date_of_birth = ?, role = ?, location_name = ?, location_lat = ?, location_lng = ?, profile_picture = ?, profile_picture_extension = ?
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
          profile_picture,
          profile_picture_extension,
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
  }
);

// Middleware to give static folder directory
app.use(
  "/uploads/profile-picture",
  express.static(path.join(__dirname, "uploads/profile-picture"))
);
app.use(
  "/uploads/file-upload",
  express.static(path.join(__dirname, "uploads/file-upload"))
);

// =====================================================================================================

// Get data water condition
app.get("/user", (req, res) => {
  const sql = "SELECT * FROM water_conditions";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Get data water condition newest update
app.get("/user-newest", (req, res) => {
  const sql = "SELECT * FROM water_conditions ORDER BY lastUpdate LIMIT 1";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// File download
app.get("/user/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "/uploads/file-upload", filename);

  res.download(filePath, (err) => {
    if (err) {
      if (err.status === 404) {
        res.status(404).json({ error: "File not found" });
      } else {
        console.error("Error sending file:", err);
        res.status(500).json({ error: "Failed to download file" });
      }
    }
  });
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "/uploads/file-upload");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
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
  const file_extension = req.file
    ? path.extname(req.file.originalname).substring(1)
    : null;

  const sql = `
  INSERT INTO water_conditions (
    name, lat, lng, status, ika_score, reporter_name, email, description, ikaCategories, lastUpdate, ika_file, file_extension) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

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
      file_extension,
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

// user_monitoring_activity
// get data
app.get("/user-monitoring-activity/get", (req, res) => {
  const sql = "SELECT * FROM user_monitoring_activity";
  // const sql = "SELECT * FROM user_monitoring_activity uma JOIN water_conditions wc ON uma.location_id = wc.id JOIN user_accounts ua ON uma.user_id = ua.id"; kekurangan jika menggunakan join apabila diantara data lokasi ataupun akun user sudah dihapus maka data uma tidak ditampilkan semua karena hanya menampilkan data sesuai dengan ON
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// post activity
app.post("/user-monitoring-activity/post", (req, res) => {
  const { user_id, location_id, user_activity, user_activity_description } =
    req.body;
  if (!user_id || !location_id || !user_activity || !user_activity_description)
    return res.status(400).json({ error: "Missing required fields" });

  const sql =
    "INSERT INTO user_monitoring_activity (user_id, location_id, user_activity, user_activity_description) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [user_id, location_id, user_activity, user_activity_description],
    (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to insert record" });
      }
      res.json({ success: "Record inserted successfully" });
    }
  );
});

// Delete activity
app.delete("/user-monitoring-activity/delete/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sql = `DELETE FROM user_monitoring_activity WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to delete record" });
    }
    res.json({ success: "Record deleted successfully" });
  });
});

// update role user_accounts
app.put("/user-accounts/update-role/:id", (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) return res.status(400).json({ error: "Missing required fields" });

  const checkSql = "SELECT id FROM user_accounts WHERE id = ?";
  db.query(checkSql, [id], (checkErr, data) => {
    if (checkErr) {
      console.error("Database error:", checkErr);
      return res
        .status(500)
        .json({ error: "Failed to check record existence" });
    }

    if (data.length === 0)
      return res.status(404).json({ error: "Record not found" });

    const sql = "UPDATE user_accounts SET role = ? WHERE id = ?";
    db.query(sql, [role, id], (err) => {
      // Place role first, then id
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to update record" });
      }
      res.json({ success: "Record updated successfully" });
    });
  });
});

// =====================================================================================================

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
