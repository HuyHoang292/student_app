//test
import { useState, useEffect } from 'react';

const API = 'http://localhost:3000';

export default function App() {
  const [students, setStudents] = useState([]);
  const [about, setAbout] = useState(null);
  const [form, setForm] = useState({ name: '', student_id: '', class: '' });
  const [page, setPage] = useState('home');

  useEffect(() => {
    fetch(`${API}/api/students`).then(r => r.json()).then(setStudents);
    fetch(`${API}/about`).then(r => r.json()).then(setAbout);
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const newStudent = await res.json();
    setStudents([newStudent, ...students]);
    setForm({ name: '', student_id: '', class: '' });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button onClick={() => setPage('home')}>Trang chủ</button>
        <button onClick={() => setPage('about')}>Thông tin cá nhân</button>
      </nav>

      {page === 'about' && about && (
        <div style={{ background: '#f0f4ff', padding: 24, borderRadius: 12 }}>
          <h2>Thông tin sinh viên</h2>
          <p><strong>Họ tên:</strong> {about.name}</p>
          <p><strong>MSSV:</strong> {about.student_id}</p>
          <p><strong>Lớp:</strong> {about.class}</p>
        </div>
      )}

      {page === 'home' && (
        <>
          <h2>Quản lý sinh viên</h2>
          <form onSubmit={addStudent} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <input placeholder="Họ tên" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} required/>
            <input placeholder="MSSV" value={form.student_id}
              onChange={e => setForm({...form, student_id: e.target.value})} required/>
            <input placeholder="Lớp" value={form.class}
              onChange={e => setForm({...form, class: e.target.value})} required/>
            <button type="submit">Thêm</button>
          </form>
          <table width="100%" border="1" cellPadding="8">
            <thead><tr><th>Họ tên</th><th>MSSV</th><th>Lớp</th></tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}><td>{s.name}</td><td>{s.student_id}</td><td>{s.class}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}