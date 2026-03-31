require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DB_URL });

// ✅ Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Trang About (thông tin cá nhân)
app.get('/about', (req, res) => {
  res.json({
    name: 'Nguyễn Sỹ Huy Hoàng',
    student_id: '2251220179',
    class: '22CT4',
    app_name: process.env.APP_NAME
  });
});

// ✅ GET - Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
  const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
  res.json(result.rows);
});

// ✅ POST - Thêm sinh viên
app.post('/api/students', async (req, res) => {
  const { name, student_id, class: cls } = req.body;
  const result = await pool.query(
    'INSERT INTO students (name, student_id, class) VALUES ($1, $2, $3) RETURNING *',
    [name, student_id, cls]
  );
  res.status(201).json(result.rows[0]);
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.APP_NAME} running on port ${process.env.PORT}`);
});