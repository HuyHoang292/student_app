//test
import { useState, useEffect } from 'react';

const API = '';

export default function App() {
  const [students, setStudents] = useState([]);
  const [about, setAbout] = useState(null);
  const [form, setForm] = useState({ name: '', student_id: '', class: '' });
  const [page, setPage] = useState('home');

  useEffect(() => {
    fetch(`${API}/api/students`).then(r => r.json()).then(setStudents).catch(console.error);
    fetch(`${API}/about`).then(r => r.json()).then(setAbout).catch(console.error);
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

  const styles = {
    app: { fontFamily: 'Inter, sans-serif', maxWidth: 860, margin: '0 auto', padding: '32px 24px', background: '#f0f4ff', minHeight: '100vh' },
    header: { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: 16, padding: 32, color: 'white', marginBottom: 24 },
    nav: { display: 'flex', gap: 8, marginBottom: 24 },
    navBtn: (active) => ({ padding: '10px 20px', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500, background: active ? '#4f46e5' : 'white', color: active ? 'white' : '#6b7280' }),
    card: { background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 24 },
    cardTitle: { fontSize: 18, fontWeight: 600, color: '#1f2937', marginBottom: 20 },
    formRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
    input: { flex: 1, minWidth: 160, padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none' },
    addBtn: { padding: '10px 24px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' },
    td: { padding: '14px 16px', fontSize: 14, color: '#374151', borderBottom: '1px solid #f3f4f6' },
    badge: { display: 'inline-block', padding: '2px 10px', borderRadius: 99, background: '#ede9fe', color: '#5b21b6', fontSize: 12, fontWeight: 500 },
    avatar: { width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, fontWeight: 700, marginBottom: 20 },
    infoRow: { display: 'flex', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f3f4f6' },
    infoLabel: { fontSize: 13, color: '#9ca3af', width: 120 },
    infoValue: { fontSize: 15, color: '#1f2937', fontWeight: 500 },
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>🎓 Quản lý sinh viên</h1>
        <p style={{ opacity: 0.8, fontSize: 14 }}>Student Management System</p>
      </div>

      <nav style={styles.nav}>
        <button style={styles.navBtn(page === 'home')} onClick={() => setPage('home')}>🏠 Trang chủ</button>
        <button style={styles.navBtn(page === 'about')} onClick={() => setPage('about')}>👤 Thông tin cá nhân</button>
      </nav>

      {page === 'home' && (
        <>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>➕ Thêm sinh viên</h2>
            <form onSubmit={addStudent} style={styles.formRow}>
              <input style={styles.input} placeholder="Họ và tên" value={form.name}
                onChange={e => setForm({...form, name: e.target.value})} required />
              <input style={styles.input} placeholder="Mã số sinh viên" value={form.student_id}
                onChange={e => setForm({...form, student_id: e.target.value})} required />
              <input style={styles.input} placeholder="Lớp" value={form.class}
                onChange={e => setForm({...form, class: e.target.value})} required />
              <button type="submit" style={styles.addBtn}>Thêm</button>
            </form>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📋 Danh sách sinh viên</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Họ tên</th>
                  <th style={styles.th}>MSSV</th>
                  <th style={styles.th}>Lớp</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td style={styles.td}>{s.name}</td>
                    <td style={styles.td}><span style={styles.badge}>{s.student_id}</span></td>
                    <td style={styles.td}>{s.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {page === 'about' && about && (
        <div style={styles.card}>
          <div style={styles.avatar}>{about.name?.charAt(0)}</div>
          <h2 style={{ ...styles.cardTitle, fontSize: 20 }}>Thông tin sinh viên</h2>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Họ tên</span>
            <span style={styles.infoValue}>{about.name}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>MSSV</span>
            <span style={styles.infoValue}>{about.student_id}</span>
          </div>
          <div style={{ ...styles.infoRow, borderBottom: 'none' }}>
            <span style={styles.infoLabel}>Lớp</span>
            <span style={styles.infoValue}>{about.class}</span>
          </div>
        </div>
      )}
    </div>
  );
}