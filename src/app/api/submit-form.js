const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'schooldb',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: './schoolImages/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// API endpoint to handle form submissions
app.post('/submit-form', upload.single('file'), (req, res) => {
    console.log('hii');
  const { name, email, address, mobile, city, state } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO schools (name, email, address, number, city, state, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, email, address, mobile, city, state, image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      console.log('Data inserted into MySQL:', result);
      res.status(200).json({ success: true, message: 'Form submitted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
