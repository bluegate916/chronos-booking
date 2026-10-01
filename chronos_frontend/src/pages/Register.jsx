import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
import api from '../api';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error states
    try {
      // FIXED: Using the full absolute path matching Django's layout variables
      await api.post('api/register/', {
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password
      });
      alert('Registration successful! Redirecting to login screen.');
      navigate('/login');
    } catch (err) {
      // Improved error tracking: reads direct validation errors from Django if present
      const detailedError = err.response?.data 
        ? JSON.stringify(err.response.data) 
        : 'Registration failed. Username might be taken.';
      setError(detailedError);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Create an Account</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} style={styles.input} placeholder="John" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} style={styles.input} placeholder="Doe" />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={styles.input} required placeholder="johndoe12" />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} required placeholder="john@example.com" />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} required placeholder="minimum of 6 characters" />
        </div>
        
        <button type="submit" style={styles.submitBtn}>Sign Up</button>
      </form>
      
      <p style={styles.footerText}>
        Already have an account? <Link to="/login" style={styles.loginLink}>Log in</Link>
      </p>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: '28rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '3rem',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    margin: '0',
  },
  errorMessage: {
    marginTop: '0.75rem',
    fontSize: '0.875rem',
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    textAlign: 'center',
    wordBreak: 'break-word'
  },
  form: {
    marginTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  input: {
    marginTop: '0.5rem',
    width: '100%',
    padding: '0.75rem',
    fontSize: '0.875rem',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    outline: 'none',
    boxSizing: 'border-box',
  },
  submitBtn: {
    width: '100%',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    marginTop: '0.5rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: '700',
    borderRadius: '0.75rem',
    border: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  footerText: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#4b5563',
  },
  loginLink: {
    color: '#2563eb',
    fontWeight: '700',
    textDecoration: 'none',
  }
};


// Embedded Native JavaScript Styles Object
// const styles = {
//   card: {
//     maxWidth: '28rem',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     marginTop: '3rem',
//     padding: '2rem',
//     backgroundColor: '#ffffff',
//     borderRadius: '1rem',
//     border: '1px solid #e5e7eb',
//     boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
//     boxSizing: 'border-box',
//   },
//   title: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#111827',
//     textAlign: 'center',
//     margin: '0',
//   },
//   errorMessage: {
//     marginTop: '0.75rem',
//     fontSize: '0.875rem',
//     color: '#dc2626',
//     backgroundColor: '#fef2f2',
//     padding: '0.5rem',
//     borderRadius: '0.5rem',
//     textAlign: 'center',
//   },
//   form: {
//     marginTop: '1.5rem',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//   },
//   formRow: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
//     gap: '1rem',
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     fontSize: '0.75rem',
//     fontWeight: '700',
//     color: '#6b7280',
//     textTransform: 'uppercase',
//   },
//   input: {
//     marginTop: '0.5rem',
//     width: '100%',
//     padding: '0.75rem',
//     fontSize: '0.875rem',
//     borderRadius: '0.75rem',
//     border: '1px solid #e5e7eb',
//     outline: 'none',
//     boxSizing: 'border-box',
//   },
//   submitBtn: {
//     width: '100%',
//     paddingTop: '0.75rem',
//     paddingBottom: '0.75rem',
//     marginTop: '0.5rem',
//     backgroundColor: '#2563eb',
//     color: '#ffffff',
//     fontWeight: '700',
//     borderRadius: '0.75rem',
//     border: 'none',
//     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
//     cursor: 'pointer',
//   },
//   footerText: {
//     marginTop: '1rem',
//     textAlign: 'center',
//     fontSize: '0.875rem',
//     color: '#4b5563',
//   },
//   loginLink: {
//     color: '#2563eb',
//     fontWeight: '700',
//     textDecoration: 'none',
//   }
// };
