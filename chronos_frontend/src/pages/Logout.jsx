import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Wipe the security tokens from browser memory
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    // Short delay to ensure memory is cleared before navigating
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Animated Loading Circle Spinner */}
        <div style={styles.spinner}></div>
        <h2 style={styles.title}>Logging Out...</h2>
        <p style={styles.text}>Clearing user session.</p>
      </div>
    </div>
  );
}

// Pure Vanilla CSS Objects Dictionary
const styles = {
  container: {
    display: 'flex',
    minHeight: '70vh',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif',
    boxSizing: 'border-box'
  },
  card: {
    maxWidth: '24rem',
    width: '100%',
    padding: '2.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #2563eb',
    borderRadius: '50%',
    margin: '0 auto 1.5rem auto',
    animation: 'spin 1s linear infinite'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 0.5rem 0'
  },
  text: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.4'
  }
};
