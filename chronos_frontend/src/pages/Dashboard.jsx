import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
    async function fetchDashboardData() {

      // when using Promise.all in a code, 
      // if even one of the parallel API requests fails, 
      // it cancels the entire operation and crashes the 
      // whole block, throwing the page into a loading loop or a broken state

      // To prevent the endpoint from crashing the api call we should separate our 
      // API calls so they load independently instead of using strict Promise.all.
      // const [bookingsRes, roomsRes, profileRes] = await Promise.all([
      //     api.get('/api/user/profile/'),
      //     api.get('/api/my-bookings/'),
      //     api.get('/api/rooms/')
      //   ]);

      // First, try to fetch the profile info independently
      try {
        const profileRes = await api.get('/api/user/profile/');
        setProfile(profileRes.data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }

      // Next, fetch booking history
      try {
        const bookingsRes = await api.get('/api/my-bookings/');
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error("Bookings fetch failed with 404, using fallback empty array:", err);
        setBookings([]); // Use empty fallback array so code doesn't crash
      }

      // Finally, fetch recommended workspace slots
      try {
        const roomsRes = await api.get('/api/rooms/');
        setRecommendations(roomsRes.data.slice(0, 3));
      } catch (err) {
        console.error("Rooms recommendations fetch failed:", err);
      }

      // Turn off loading once the safe pipeline runs through
      setLoading(false);
    }
    
    fetchDashboardData();
  }, []);


  const handleCancelBooking = async (slotId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation schedule?")) return;
    try {
      await api.post(`/api/slots/${slotId}/cancel/`);
      alert("Booking successfully canceled.");
      // Refresh list from database
      setBookings(bookings.filter(b => b.id !== slotId));
    } catch (error) {
      console.error('Registration failed. Username might be taken.', error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  if (loading) return <div style={styles.loading}>Assembling personal dashboard metrics...</div>;
  // Fallback to username if first_name isn't configured in the database
  const userGreetingName = profile?.first_name || profile?.username || 'User';

  return (
    <div style={styles.container}>
      
      {/* nav hamburger*/}
      <div style={styles.navBar}>
        <button onClick={() => setIsSidebarOpen(true)} style={styles.menuIconBtn}>
          <div style={styles.menuLine}></div>
          <div style={styles.menuLine}></div>
          <div style={styles.menuLine}></div>
        </button>
        <span style={styles.navBrand}>CHRONOS User Portal</span>
        <div style={styles.userBadgeAvatar}>
          {userGreetingName.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* sliding sidebar */}
      <div 
        style={{ 
          ...styles.sidebarOverlay, 
          visibility: isSidebarOpen ? 'visible' : 'hidden',
          opacity: isSidebarOpen ? 1 : 0
        }}
        onClick={() => setIsSidebarOpen(false)} // Closes menu when clicking outside on the background shadow
      >
        <div 
          style={{ 
            ...styles.sidebarDrawer, 
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' 
          }}
          onClick={(e) => e.stopPropagation()} // Prevents clicks inside the sidebar drawer from closing it
        >
          <div style={styles.sidebarHeader}>
            <h3 style={styles.sidebarBrandTitle}>Chronos Navigation</h3>
            <button onClick={() => setIsSidebarOpen(false)} style={styles.closeMenuBtn}>✕</button>
          </div>

          <div style={styles.sidebarLinksList}>
            <div 
            style={styles.sidebarLinkItem} 
            onClick={() => { setIsSidebarOpen(false); navigate('/'); }}>
              browse workspace rooms
            </div>
            <div 
            style={styles.sidebarLinkItem} 
            onClick={() => { setIsSidebarOpen(false); 
              alert('System Notifications: No new alerts.'); }}> 
              system notifications
            </div>
            <div 
            style={styles.sidebarLinkItem} 
            onClick={() => { setIsSidebarOpen(false); 
              alert(`Account: logged in as ${profile?.email}`); }}> profile settings 
            </div>
            
            <div 
              style={{ ...styles.sidebarLinkItem, ...styles.logoutLinkColor }} 
              onClick={() => { setIsSidebarOpen(false); navigate('/logout'); }}
            >
              logout
            </div>
          </div>
        </div>
      </div>

      {/* welcome banner */}
      <header style={styles.welcomeBanner}>
        <h1 style={styles.title}>Welcome Back, {userGreetingName}!</h1>
        <p style={styles.subtitle}>Logged in as <span style={{fontWeight: 'bold', color: '#fff'}}>{profile?.email}</span>. Monitor your active workspace status below.</p>
      </header>

      {/* Main Layout Grid split columns */}
      <div style={styles.layoutGrid}>
        
        {/* Left Hand: Booking History */}
        <section style={styles.mainSection}>
          <h2 style={styles.sectionHeader}>Your Booked Schedules</h2>
          {bookings.length === 0 ? (
            <div style={styles.emptyCard}>
              <p style={{ color: '#9ca3af', margin: 0 }}>You do not possess any active or historic room allocations.</p>
              <button onClick={() => navigate('/')} style={styles.actionBtn}>Browse Spaces</button>
            </div>
          ) : (
            <div style={styles.listContainer}>
              {bookings.map((slot) => (
                <div key={slot.id} style={styles.bookingCard}>
                  <div>
                    <h4 style={styles.roomTitle}>{slot.room_details?.name || `Space Cluster #${slot.room}`}</h4>
                    <span style={styles.timeTag}>
                      {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <p style={styles.metaText}>{slot.total_hours} Hours Total • Charged: <b style={{color: '#2563eb'}}>\${slot.total_cost}</b></p>
                  </div>
                  <button onClick={() => handleCancelBooking(slot.id)} style={styles.cancelBtn}>Cancel Slot</button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Hand: Recommended Rooms */}
        <aside style={styles.sidebarSection}>
          <h2 style={styles.sectionHeader}>Recommended Spaces</h2>
          <div style={styles.listContainer}>
            {recommendations.map((room) => (
              <div key={room.id} style={styles.recommendCard}>
                <div style={styles.recommendMeta}>
                  <span style={styles.badge}>{room.room_type}</span>
                  <h4 style={styles.recommendTitle}>{room.name}</h4>
                  <p style={styles.metaText}>No. {room.room_number} • {room.location}</p>
                  <p style={styles.priceText}>\${room.price_per_hour}/hr</p>
                </div>
                <button onClick={() => navigate(`/room/${room.id}`)} style={styles.viewBtn}>Book Space</button>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}

// Pure Vanilla JavaScript Styles Object (No External CSS/Tailwind required)
const styles = {
  container: { 
    maxWidth: '1200px', 
    margin: '1rem auto', 
    padding: '0 1rem', 
    fontFamily: 'system-ui, sans-serif' 
  },
  loading: { 
    textAlign: 'center', 
    padding: '5rem', 
    fontSize: '1.25rem', 
    color: '#4b5563' 
  },
  // Custom Dashboard Action Header Bar CSS
  navBar: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '1rem 0', 
    marginBottom: '1.5rem', 
    borderBottom: '1px solid #e2e8f0' 
  },
  menuIconBtn: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '4px', 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    padding: '0.5rem' 
  },
  menuLine: { 
    width: '22px', 
    height: '3px', 
    backgroundColor: '#0f172a', 
    borderRadius: '2px' 
  },
  navBrand: { 
    fontSize: '1.1rem', 
    fontWeight: '700', 
    color: '#0f172a', 
    marginRight: 'auto', 
    marginLeft: '0.75rem' 
  },
  userBadgeAvatar: { 
    width: '36px', 
    height: '36px', 
    borderRadius: '50%', 
    backgroundColor: '#2563eb', 
    color: '#ffffff',  
    alignItems: 'center', 
    justifyCenter: 'center', 
    fontWeight: '700', 
    fontSize: '0.95rem', 
    display: 'flex', 
    justifyContent: 'center' 
  },
  // Sliding Drawer Modal Overlay Layer Layout CSS
  sidebarOverlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(15, 23, 42, 0.4)', 
    zIndex: 100, transition: 'all 0.3s ease' 
  },
  sidebarDrawer: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    bottom: 0, 
    width: '280px', 
    backgroundColor: '#ffffff', 
    boxShadow: '5px 0 25px rgba(0,0,0,0.1)', 
    padding: '1.5rem', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2rem', 
    transition: 'transform 0.3s ease', 
    boxSizing: 'border-box' 
  },
  sidebarHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  sidebarBrandTitle: { 
    margin: 0, 
    fontSize: '1.1rem', 
    fontWeight: '800', 
    color: '#0f172a' 
  },
  closeMenuBtn: { 
    background: 'none', 
    border: 'none', 
    fontSize: '1.25rem', 
    color: '#64748b', 
    cursor: 'pointer' 
  },
  sidebarLinksList: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '0.5rem' 
  },
  sidebarLinkItem: { 
    padding: '0.85rem 1rem', 
    borderRadius: '0.5rem', 
    fontSize: '0.9rem', 
    color: '#334155', 
    fontWeight: '600', 
    cursor: 'pointer', 
    transition: 'background 0.2s', 
    listStyle: 'none' 
  },
  logoutLinkColor: { 
    color: '#dc2626', 
    borderTop: '1px solid #f1f5f9', 
    marginTop: '1rem', 
    paddingTop: '1.25rem' 
  },
  // Dashboard Data cards styling layout
  welcomeBanner: { 
    backgroundColor: '#2563eb', 
    padding: '2.5rem', 
    borderRadius: '1.5rem', 
    color: '#ffffff', 
    marginBottom: '2rem', 
    boxShadow: '0 10px 20px -3px rgba(37,99,235,0.2)' 
  },
  title: { 
    margin: '0 0 0.5rem 0', 
    fontSize: '2rem', 
    fontWeight: '800' 
  },
  subtitle: { 
    margin: 0, 
    color: '#bfdbfe', 
    fontSize: '0.95rem' 
  },
  layoutGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '2rem', alignItems: 'start' 
  },
  mainSection: { 
    backgroundColor: '#ffffff', 
    padding: '1.5rem', 
    borderRadius: '1rem', 
    border: '1px solid #e2e8f0' 
  },
  sidebarSection: { 
    backgroundColor: '#f8fafc', 
    padding: '1.5rem', 
    borderRadius: '1rem', 
    border: '1px solid #e2e8f0' 
  },
  sectionHeader: { 
    margin: '0 0 1.5rem 0', 
    fontSize: '1.25rem', 
    fontWeight: '700', 
    color: '#0f172a', 
    borderBottom: '2px solid #f1f5f9', 
    paddingBottom: '0.75rem' 
  },
  emptyCard: { 
    textAlign: 'center', 
    padding: '3rem 1rem', 
    backgroundColor: '#f8fafc', 
    borderRadius: '0.75rem', 
    border: '1px dashed #cbd5e1' 
  },
  listContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '1rem' 
  },
  bookingCard: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '1.25rem', 
    backgroundColor: '#f8fafc', 
    borderRadius: '0.75rem', 
    border: '1px solid #e2e8f0' 
  },
  recommendCard: { 
    padding: '1.25rem', 
    backgroundColor: '#ffffff', 
    borderRadius: '0.75rem', 
    border: '1px solid #e2e8f0', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '1rem' 
  },
  roomTitle: { 
    margin: '0 0 0.25rem 0', 
    fontSize: '1.1rem', 
    fontWeight: '700', 
    color: '#1e293b' 
  },
  recommendTitle: { 
    margin: '0.5rem 0 0.25rem 0', 
    fontSize: '1rem', 
    fontWeight: '700', 
    color: '#1e293b' 
  },
  timeTag: { 
    display: 'inline-block', 
    fontSize: '0.85rem', 
    fontWeight: '600', 
    color: '#2563eb', 
    backgroundColor: '#eff6ff', 
    padding: '0.25rem 0.5rem', 
    borderRadius: '0.5rem', 
    marginBottom: '0.5rem' 
  },
  metaText: { 
    margin: 0, 
    fontSize: '0.85rem', 
    color: '#64748b' 
  },
  priceText: { 
    margin: 0, 
    fontSize: '0.95rem', 
    fontWeight: '700', 
    color: '#0f172a' 
  },
  badge: { 
    alignSelf: 'flex-start', 
    fontSize: '0.7rem', 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    backgroundColor: '#f1f5f9', 
    padding: '0.25rem 0.5rem', 
    borderRadius: '0.25rem', 
    color: '#475569' 
  },
  actionBtn: { 
    marginTop: '1rem', 
    backgroundColor: '#2563eb', 
    color: '#ffffff', 
    border: 'none', 
    padding: '0.6rem 1.2rem', 
    borderRadius: '0.5rem', 
    fontWeight: '600', 
    cursor: 'pointer' 
  },
  viewBtn: { 
    backgroundColor: '#0f172a', 
    color: '#ffffff', 
    border: 'none', 
    padding: '0.6rem', 
    borderRadius: '0.5rem', 
    fontWeight: '600', 
    cursor: 'pointer', 
    textAlign: 'center' 
  },
  cancelBtn: { 
    backgroundColor: '#fee2e2', 
    color: '#dc2626', 
    border: 'none', 
    padding: '0.5rem 1rem', 
    borderRadius: '0.5rem', 
    fontWeight: '600', 
    cursor: 'pointer' 
  }
};
