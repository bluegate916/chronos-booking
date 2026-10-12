import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

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

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Hit your Django SimpleJWT auth token endpoint
      const response = await api.post('/api/token/', { 
        username: username, 
        password: password 
      });

      const access = response.data.access;
      
      // Save your security token badges to the browser storage context
      // localStorage.setItem('access_token', response.data.access);
      // localStorage.setItem('refresh_token', response.data.refresh);

      // Change them to use your imported constants exactly:
      // Because 'access_token' (lowercase string) does not match 
      // the actual variable value stored inside your ACCESS_TOKEN 
      // constant (which usually evaluates to "access" or something 
      // different), your Axios interceptor could not find the token. 
      // It sent an empty header to Django, resulting in the 401 
      // Unauthorized rejection log.

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      // Decrypt the token payload parameters
      const decodedUser = jwtDecode(access);

      // Conditional Routing Logic
      
      if (decodedUser.is_superuser === true || decodedUser.is_staff === true) {
        alert('Welcome Admin! Routing to Management Dashboard.');
        navigate('/admin-dashboard'); 
      } else if (decodedUser.username === 'admin' || decodedUser.is_superuser) {
        // Fallback catch boundary explicitly capturing the default master superuser account name
        alert('Welcome System Superuser! Routing to Admin Hub.');
        navigate('/admin-dashboard');
      } else {
        alert('Login Successful! Routing User to Dashboard.');
        navigate('/dashboard'); 
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Authication Failed", error)
      setLoading(false);
      // Fallback message if credentials don't match database records
      setError('Invalid username or password credentials. Please try again.');
    }
  }

return (
    <div style={styles.card}>
      <h2 style={styles.title}>Account Login</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
        Log in to access your dashboard and book spaces.
      </p>

      {/* Dynamic Error Container */}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleLogin} style={styles.form}>
        
        {/* Username Field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            style={styles.input} 
            required 
            placeholder="Enter username" 
            disabled={loading}
          />
        </div>
        
        {/* Password Field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={styles.input} 
            required 
            placeholder="••••••••" 
            disabled={loading}
          />
        </div>
        
        {/* Submit Action Handler */}
        <button type="submit" style={styles.submitBtn} disabled={loading}>
          {loading ? 'Verifying Credentials...' : 'Log In'}
        </button>
      </form>
      
      {/* Registration Redirect Option */}
      <p className="footer-text">
        Don't have an active account?{' '}
        <Link to="/register" className="login-link">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;