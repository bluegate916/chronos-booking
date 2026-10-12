import { useState } from 'react';
import api from '../api';

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: '', room_type: 'SINGLE', room_number: '', location: '', description: '', price_per_hour: ''
  });

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/rooms/', formData);
      alert("Room successfully committed to PostgreSQL database!");
      setFormData({ name: '', room_type: 'SINGLE', room_number: '', location: '', description: '', price_per_hour: '' });
    } catch (err) {
        console.error("Error fetching dashboard payload:", err);
      alert("Failed to create room. Ensure your account possesses Admin rights.");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.banner}>
        <h1 style={styles.title}>Chronos Admin Panel</h1>
        <p style={styles.subtitle}>Management control console for system assets.</p>
      </header>

      <form onSubmit={handleCreateRoom} style={styles.form}>
        <h3 style={styles.formTitle}>Database Entry Panel</h3>
        <div style={styles.grid}>
          <div style={styles.group}>
            <label style={styles.label}>Room Name</label>
            <input type="text" placeholder="Executive Hub" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Room Number</label>
            <input type="text" placeholder="302B" value={formData.room_number} onChange={e => setFormData({...formData, room_number: e.target.value})} style={styles.input} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Building Location</label>
            <input type="text" placeholder="Floor 3, Wing A" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={styles.input} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Price Per Hour ($)</label>
            <input type="number" placeholder="50" value={formData.price_per_hour} onChange={e => setFormData({...formData, price_per_hour: e.target.value})} style={styles.input} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Room Classification</label>
            <select value={formData.room_type} onChange={e => setFormData({...formData, room_type: e.target.value})} style={styles.input}>
              <option value="SINGLE">Single Room</option>
              <option value="DOUBLE">Double Room</option>
              <option value="SUITE">Suite</option>
              <option value="CONF">Conference Room</option>
            </select>
          </div>
        </div>
        <div style={{ ...styles.group, marginTop: '1rem' }}>
          <label style={styles.label}>Description</label>
          <textarea placeholder="Detail room parameters..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={styles.textarea} />
        </div>
        <button type="submit" style={styles.submitBtn}>Commit Room to PostgreSQL</button>
      </form>
    </div>
  );
}

const styles = {
  container: { 
    maxWidth: '800px', 
    margin: '3rem auto', 
    padding: '0 1rem', 
    fontFamily: 'system-ui, sans-serif' 
},
  banner: { 
    backgroundColor: '#1e293b', 
    padding: '2rem', 
    borderRadius: '1rem', 
    color: '#ffffff', 
    marginBottom: '2rem' 
},
  title: { 
    margin: '0 0 0.25rem 0', 
    fontSize: '1.75rem' 
},
  subtitle: { 
    margin: 0, 
    color: '#94a3b8', 
    fontSize: '0.9rem' 
},
  form: { 
    backgroundColor: '#ffffff', 
    padding: '2rem', 
    borderRadius: '1rem', 
    border: '1px solid #e2e8f0', 
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' 
},
  formTitle: { 
    margin: '0 0 1.5rem 0', 
    fontSize: '1.25rem', 
    color: '#0f172a' 
},
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '1rem' 
},
  group: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '0.35rem' 
},
  label: { 
    fontSize: '0.75rem', 
    fontWeight: '700', 
    color: '#64748b', 
    textTransform: 'uppercase' 
},
  input: { 
    padding: '0.75rem', 
    borderRadius: '0.5rem', 
    border: '1px solid #cbd5e1', 
    fontSize: '0.875rem', 
    outline: 'none' 
},
  textarea: { 
    padding: '0.75rem', 
    borderRadius: '0.5rem', 
    border: '1px solid #cbd5e1', 
    fontSize: '0.875rem', 
    outline: 'none', 
    height: '80px', 
    resize: 'vertical' 
},
  submitBtn: { 
    width: '100%', 
    marginTop: '1.5rem', 
    padding: '1rem', 
    backgroundColor: '#2563eb', 
    color: '#ffffff', 
    border: 'none', 
    borderRadius: '0.5rem', 
    fontWeight: '700', 
    cursor: 'pointer' 
}
};
