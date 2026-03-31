CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  student_id VARCHAR(20) UNIQUE NOT NULL,
  class VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Dữ liệu mẫu (tuỳ chọn)
INSERT INTO students (name, student_id, class) VALUES
  ('Michael Hoàng', '2902', '22CT4'),
  ('Đoàn Mạnh Hùng',   '2201220180', '22CT4'),
  ('Trần Khánh Duy',   '2201220162', '22CT4'),
ON CONFLICT DO NOTHING;