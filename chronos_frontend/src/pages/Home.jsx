import  { useState,useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import CompanyInfo from '../components/CompanyInfo';
import api from '../api';
import './Home.css';

const MOCK_ROOMS = [
  { id: 1, 
    name: "Executive Suite A", 
    type: "SUITE", 
    location: "Floor 3, Wing B", 
    price_per_hour: 45.00, 
    description: "A luxury suite tailored for high-end meetings.", 
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" 
},
  { id: 2, 
    name: "Conference Room Alpha", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 75.00, 
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80" 
},
  { id: 3, 
    name: "Hotel Room", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 25.00, 
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
},
  { id: 4, 
    name: "Hotel Room", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 35.00,
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1667125095636-dce94dcbdd96?q=80&w=852&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
},
  { id: 5, 
    name: "Single Workspace Hub", 
    type: "SINGLE", 
    location: "Floor 2, Quiet Zone", 
    price_per_hour: 15.00, 
    description: "Quiet personal workspace.", 
    image: "https://images.unsplash.com/photo-1681783165686-76e8d1f7663d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{ 
    id: 6, 
    name: "Collaborative Huddle Room", 
    type: "MEETING", 
    location: "Floor 1, Wing A", 
    price_per_hour: 25.00, 
    description: "Small, cozy meeting spaces for 2 to 6 people. Perfect for quick team syncs, brainstorming, and hybrid video calls.", 
    image: "https://images.unsplash.com/photo-1605797491749-0c6989a44356?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
  { 
    id: 7, 
    name: "Privacy Focus Pod", 
    type: "WORKSPACE", 
    location: "Floor 2, Common Area", 
    price_per_hour: 12.00, 
    description: "Compact, sound-insulated booths meant for single users who need to take confidential calls or dive into uninterrupted, deep work.", 
    image: "https://images.unsplash.com/photo-1560264401-b76ed96f3134?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
    { 
    id: 8, 
    name: "Creative Workshop Studio", 
    type: "STUDIO", 
    location: "Floor 4, Penthouse Wing", 
    price_per_hour: 60.00, 
    description: "Open, flexible layouts equipped with whiteboards, dynamic seating, and plenty of light, designed for design-thinking sessions and hands-on workshops.", 
    image: "https://images.unsplash.com/photo-1763630730215-d97346f23065?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
  { 
    id: 9, 
    name: "High-Tech Boardroom", 
    type: "BOARDROOM", 
    location: "Floor 3, Wing A", 
    price_per_hour: 85.00, 
    description: "A premium, ultra-modern corporate space equipped with integrated smart tables, interactive whiteboards, and high-end video conferencing gear.", 
    image: "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
    { 
    id: 10, 
    name: "Premium Deluxe Suite", 
    type: "HOTEL", 
    location: "Floor 7, Suite 702", 
    price_per_hour: 75.00, 
    description: "Spacious luxury lodging with an independent living lounge, beautiful skyline views, mini-bar, and fine automation features.", 
    image: "https://images.unsplash.com/photo-1776500587875-8a0653e9c10e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },

  // --- Additional Flexible & Leisure Rooms ---
  { 
    id: 11, 
    name: "Communal Lounge & Kitchenette", 
    type: "LOUNGE", 
    location: "Floor 1, Central Hub", 
    price_per_hour: 50.00, 
    description: "An open-concept social space built for networking mixers, team happy hours, casual break periods, and catering operations.", 
    image: "https://media.istockphoto.com/id/2266757839/photo/hostel-common-area-with-tv-lounge-and-kitchenette-facility.jpg?s=1024x1024&w=is&k=20&c=4b-2dzwXBYUOmmLXZaG1K-b3qKWIa4SGD0YEY6OGG9k=" 
  },
  { 
    id: 12, 
    name: "Zen Wellness & Meditation Room", 
    type: "WELLNESS", 
    location: "Floor 2, Wing C", 
    price_per_hour: 20.00, 
    description: "A quiet oasis designed for mental resets, yoga, and screen-free relaxation. Equipped with soft floor lighting and comfortable mats.", 
    image: "https://images.unsplash.com/photo-1749642955698-ebe5e4579034?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
   { 
    id: 13, 
    name: "Standard King Room", 
    type: "HOTEL", 
    location: "Floor 5, Rooms 501-520", 
    price_per_hour: 30.00, 
    description: "A modern stay option featuring a plush plush king mattress, private workspace desk, and sleek modern bathroom facilities.", 
    image: "https://images.unsplash.com/photo-1631048730670-ff5cd0d08f15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
    { id: 14, 
    name: "Hotel Room", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 75.00, 
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1630660664869-c9d3cc676880?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
},
    { id: 15, 
    name: "Hotel Room", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 75.00, 
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
},
    { id: 16, 
    name: "Hotel Room", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 75.00, 
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
},
    { id: 17, 
    name: "Hotel Room", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 75.00, 
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1711059985570-4c32ed12a12c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
},
    { id: 18, 
    name: "Hotel Room", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 75.00, 
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1725962479542-1be0a6b0d444?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
},
    { id: 19, 
    name: "Hotel Room", 
    type: "CONF", 
    location: "Floor 1, Main Hall", 
    price_per_hour: 75.00, 
    description: "Equipped with modern visual systems.", 
    image: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
},
];

export default function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const navigate = useNavigate();

  // New Room Form State (For Admins)
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    room_type: 'SINGLE', 
    room_number: '', 
    location: '', 
    description: '', 
    price_per_hour: ''
  });

  const fetchRooms = async () => {
    try {
      const response = await api.get('/api/rooms/');
      setRooms(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data from database:", err);
      setLoading(false);
    }
  };

  // Fetch rooms on component mount 
  useEffect(() => {
    fetchRooms();
  }, []);

  // Submit Handler for Admin Creating a Room
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/rooms/', formData);
      setShowAddForm(false);
      setFormData({ name: '', room_type: 'SINGLE', room_number: '', location: '', description: '', price_per_hour: '' });
      fetchRooms(); // Refresh the feed dynamically
    } catch (err) {
      console.error("Error fetching data from database:", err);
      alert("Failed to create room. Ensure you are logged in as an Admin superuser account.");
    }
  };

  const filteredRooms = selectedCategory === 'ALL' 
    ? MOCK_ROOMS 
    : MOCK_ROOMS.filter(room => room.type === selectedCategory);

  if (loading) return <div style={styles.loadingText}>Connecting to PostgreSQL matrix...</div>;

  return (
    <div>
      <div className="header-section">
        {/* Global Navigation Header */}
          <nav className="navbar">
            <div className="navContainer">
                    <Link to="/" className="brandLogo">
                      CHRONOS<span className="brand-subtext">BOOKING</span>
                    </Link>
                    <div className="navLinks">
                      <Link to="/register" className="navLink">Sign Up</Link>
                      <Link to="/login" className="navLink">Log In</Link>
                      <Link to="/summary" className="btnMyBookings">My Bookings</Link>
                    </div>
                  </div>
                </nav>
        <h1 className="main-title">Find Your Perfect Workspace</h1>
        <p className="subtitle">Flexible hourly room rentals tailored to your scheduling requirements.</p>
      </div>

      {/* Category Filter Badges */}
      <div className="category-container">
        {['ALL', 'SINGLE', 'DOUBLE', 'SUITE', 'CONF'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`badge-btn ${selectedCategory === category ? 'active' : 'inactive'}`}
          >
            {category === 'ALL' ? 'All Spaces' : `${category} Rooms`}
          </button>
        ))}
      </div>

      {/* Rooms Grid Layout */}
      <div className="rooms-grid">
        {filteredRooms.map((room) => (
          <div key={room.id} className="room-card">
            <img src={room.image} alt={room.name} className="room-image" />
            <div className="room-body">
              <span className="room-type-tag">{room.type}</span>
              <h3 className="room-title">{room.name}</h3>
              <p className="room-location">{room.location}</p>
              <p className="room-description">{room.description}</p>
              
              <div className="room-footer">
                <div>
                  <span className="price-text">${room.price_per_hour}</span>
                  <span className="unit-text"> / hour</span>
                </div>
                <button 
                  onClick={() => navigate(`/room/${room.id}`)}
                  className="btn-details"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <CompanyInfo />
    </div>
  );
}

// Pure Vanilla CSS Objects Dictionary
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    boxSizing: 'border-box'
  },
  navContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box'
  },
  brandLogo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '-0.025em',
    color: '#2563eb',
    textDecoration: 'none'
  },
  brandSubtext: {
    color: '#6b7280'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  navLink: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#111827',
    textDecoration: 'none',
    transition: 'color 0.2s ease'
  },
  // Note: Hover states are applied interactively via inline handlers or base styles
  navLinkHover: {
    color: '#2563eb'
  },
  btnMyBookings: {
    borderRadius: '8px',
    backgroundColor: '#2563eb',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#ffffff',
    textDecoration: 'none',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  btnMyBookingsHover: {
    backgroundColor: '#1d4ed8'
  },
  loadingText: {
    textAlign: 'center',
    padding: '3rem 0',
    fontWeight: '600',
    color: '#6b7280',
    fontSize: '1.125rem'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem'
  },
  mainTitle: {
    fontSize: '1.875rem',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 0.5rem 0'
  },
  subtitle: {
    color: '#4b5563',
    margin: 0,
    fontSize: '1rem'
  },
  adminToggleBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.75rem',
    padding: '0.75rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
  },
  adminForm: {
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '2.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    boxSizing: 'border-box'
  },
  formTitle: {
    gridColumn: '1 / -1',
    margin: 0,
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e3a8a'
  },
  formInput: {
    padding: '0.75rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
    width: '100%'
  },
  formTextarea: {
    padding: '0.75rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
    height: '45px',
    resize: 'none',
    width: '100%'
  },
  formSubmitBtn: {
    gridColumn: '1 / -1',
    backgroundColor: '#111827',
    color: '#ffffff',
    fontWeight: '700',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '0.875rem'
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '2rem'
  },
  filterBtn: {
    borderRadius: '9999px',
    padding: '0.5rem 1.25rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  filterBtnActive: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
  },
  filterBtnInactive: {
    backgroundColor: '#ffffff',
    color: '#4b5563',
    border: '1px solid #e5e7eb'
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '3rem 0',
    margin: 0
  },
  roomsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem'
  },
  roomCard: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    border: '1px solid #f3f4f6',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  imageWrapper: {
    height: '12rem',
    width: '100%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500'
  },
  roomImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  },
  cardContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  roomBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '0.25rem 0.625rem',
    borderRadius: '0.375rem',
    fontSize: '0.75rem',
    fontWeight: '600'
},
roomName: {
fontSize: '1.25rem',
fontWeight: '700',
color: '#111827',
margin: '0.75rem 0 0.25rem 0'
},
roomMeta: {
fontSize: '0.875rem',
color: '#6b7280',
margin: '0 0 0.75rem 0'
},
roomDesc: {
fontSize: '0.875rem',
color: '#4b5563',
margin: '0 0 1.5rem 0',
lineHeight: '1.4',
display: '-webkit-box',
WebkitLineClamp: 2,
WebkitBoxOrient: 'vertical',
overflow: 'hidden'
},
cardFooter: {
marginTop: 'auto',
borderTop: '1px solid #f9fafb',
paddingTop: '1rem',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center'
},
priceNumber: {
fontSize: '1.25rem',
fontWeight: '900',
color: '#2563eb'
},
priceLabel: {
fontSize: '0.75rem',
color: '#6b7280'
},
bookBtn: {
backgroundColor: '#111827',
color: '#ffffff',
border: 'none',
borderRadius: '0.75rem',
padding: '0.625rem 1rem',
fontSize: '0.875rem',
fontWeight: '600',
cursor: 'pointer',
transition: 'background-color 0.2s'
}
};