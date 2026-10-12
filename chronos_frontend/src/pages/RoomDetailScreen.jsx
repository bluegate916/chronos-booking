import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RoomDetailScreen.css';
import api from '../api';

// Returns an object of key/value-pairs of the dynamic params 
// from the current URL that were matched by the routes. 
// Child routes inherit all params from their parent routes.

// Assuming a route pattern like /posts/:postId is matched 
// by /posts/123 then params.postId will be "123".

// Pure Vanilla CSS Objects Dictionary
const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    boxSizing: 'border-box'
  },
  // Custom media-query equivalent layout behavior for 2/3 ratio layout split
  mainContentColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    gridColumn: 'span 2'
  },
  backBtn: {
    alignSelf: 'flex-start',
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    padding: 0
  },
  imageContainer: {
    height: '24rem',
    width: '100%',
    borderRadius: '1.5rem',
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
    boxSizing: 'border-box'
  },
  roomImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  },
  imagePlaceholder: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af'
  },
  roomName: {
    fontSize: '1.875rem',
    fontWeight: '900',
    color: '#111827',
    margin: '0 0 0.5rem 0'
  },
  roomMeta: {
    fontSize: '1rem',
    color: '#6b7280',
    margin: 0
  },
  descriptionSection: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '1.5rem'
  },
  sectionHeading: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 0.75rem 0'
  },
  descriptionText: {
    fontSize: '1xl',
    lineHeight: '1.625',
    color: '#4b5563',
    margin: 0
  },
  sidebarCard: {
    height: 'fit-content',
    borderRadius: '1.5rem',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  },
  sidebarTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 0.25rem 0'
  },
  sidebarSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  boldPrice: {
    fontWeight: '700',
    color: '#2563eb'
  },
  slotsWrapper: {
    marginTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  emptySlotsText: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    padding: '1rem 0',
    textAlign: 'center',
    margin: 0
  },
  scrollableList: {
    maxHeight: '15rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingRight: '0.25rem'
  },
  slotBtn: {
    width: '100%',
    textAlign: 'left',
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'all 0.15s ease'
  },
  slotBtnActive: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
    boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)'
  },
  slotBtnInactive: {
    backgroundColor: '#ffffff'
  },
  timelineLabel: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#9ca3af',
    letterSpacing: '0.05em'
  },
  timeString: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#111827',
    marginTop: '0.125rem'
  },
  durationString: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.125rem'
  },
  slotCost: {
    fontWeight: '700',
    color: '#2563eb',
    fontSize: '0.875rem'
  },
  costSummaryCard: {
    borderRadius: '1rem',
    backgroundColor: '#f9fafb',
    padding: '1rem',
    border: '1px solid #f3f4f6',
    boxSizing: 'border-box'
  },
  costSummaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '700',
    color: '#111827',
    fontSize: '1rem'
  },
  finalCostColor: {
    color: '#2563eb'
  },
  submitBtn: {
    width: '100%',
    borderRadius: '0.75rem',
    backgroundColor: '#2563eb',
    padding: '1rem',
    fontWeight: '700',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
    transition: 'background-color 0.2s'
  },
  submitBtnDisabled: {
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    cursor: 'not-allowed',
    boxShadow: 'none'
  }
};

export default function RoomDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState(1);

  const pricePerHour = 45.00;
  const totalCost = hours * pricePerHour;

  useEffect(() => {
    async function loadRoomAndSlots() {
      try {
        // 1. Fetch Room Meta Info
        const roomRes = await api.get(`/api/rooms/${id}/`);
        setRoom(roomRes.data);

        // 2. Fetch Available Slots for this room from your backend
        const slotsRes = await api.get(`/api/rooms/${id}/slots/`);
        setSlots(slotsRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error connecting to data endpoints:", err);
        setLoading(false);
      }
    }
    loadRoomAndSlots();
  }, [id]);

  const handleProceedToSummary = () => {
    if (!selectedSlot) {
      alert("Please pick an active time slot timeline first.");
      return;
    }
    // Route state forward to summary view
    navigate('/summary', { 
      state: { 
        slotId: selectedSlot.id,
        roomName: room.name,
        price: selectedSlot.total_cost,
        hours: selectedSlot.total_hours,
        start: selectedSlot.start_time,
        end: selectedSlot.end_time
      } 
    });
  };

  return (
    <div className="detail-grid">
      {/* Description & Overview Column */}
      <div className="detail-content">
        <button onClick={() => navigate(-1)} className="btn-back">← Back to gallery</button>
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" 
          alt="Room Layout" 
          className="detail-image" 
        />
        <div>
          <h1 className="main-title">Premium Executive Suite {id}</h1>
          <p className="subtitle">Located at Floor 3, Corporate Tower Wing B</p>
        </div>

        <div className="section-divider">
          <h3 className="section-title">About this Space</h3>
          <p className="section-body">
            This professionally designed workspace is built to boost focus and seamless collaboration. Featuring soundproof parameters, panoramic windows, automated temperature systems, high-definition display projections, and dedicated fiber-optic internet feeds. Perfect for remote squads, executive operations, or formal client presentations.
          </p>
        </div>
      </div>

      {/* Interactive Booking Calculation Card */}
      <div className="reservation-card">
        <h3 className="card-title">Reservation Setup</h3>
        <p className="card-subtitle">Select hours needed to configure billing summary.</p>
        
        <div className="form-group">
          <div>
            <label className="input-label">Duration (Hours)</label>
            <input 
              type="number" 
              min="1" 
              max="12"
              value={hours} 
              onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
              className="number-input"
            />
          </div>

          <div className="cost-box">
            <div className="cost-row">
              <span>Base Hourly Rate</span>
              <span>${pricePerHour.toFixed(2)}</span>
            </div>
            <div className="cost-row">
              <span>Duration Count</span>
              <span>{hours} hrs</span>
            </div>
            <div className="cost-total-row">
              <span>Estimated Cost</span>
              <span className="total-accent">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/summary', { state: { roomId: id, hours, totalCost } })}
            className="btn-proceed"
          >
            Proceed to Booking Summary
          </button>
        </div>
      </div>

    return (
  <div style={styles.gridContainer}>
    {/* Description Info column */}
    <div style={styles.mainContentColumn}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back to gallery
      </button>
      
      <div style={styles.imageContainer}>
        {room.image ? (
          <img src={room.image} alt={room.name} style={styles.roomImage} />
        ) : (
          <div style={styles.imagePlaceholder}>📷 No Image Uploaded</div>
        )}
      </div>

      <div>
        <h1 style={styles.roomName}>{room.name}</h1>
        <p style={styles.roomMeta}>No. {room.room_number} • {room.location}</p>
      </div>

      <div style={styles.descriptionSection}>
        <h3 style={styles.sectionHeading}>About this Space</h3>
        <p style={styles.descriptionText}>
          {room.description || "No description provided for this slot layout configuration."}
        </p>
      </div>
    </div>

    {/* Database TimeSlots Selection Engine column */}
    <div style={styles.sidebarCard}>
      <h3 style={styles.sidebarTitle}>Available Time Slots</h3>
      <p style={styles.sidebarSubtitle}>
        Hourly rates: <span style={styles.boldPrice}>\${room.price_per_hour}/hr</span>
      </p>
      
      <div style={styles.slotsWrapper}>
        {slots.length === 0 ? (
          <p style={styles.emptySlotsText}>
            No available free booking blocks found for this space right now.
          </p>
        ) : (
          <div style={styles.scrollableList}>
            {slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    ...styles.slotBtn,
                    ...(isSelected ? styles.slotBtnActive : styles.slotBtnInactive),
                  }}
                >
                  <div>
                    <span style={styles.timelineLabel}>TIMELINE</span>
                    <span style={styles.timeString}>
                      {new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                      {new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span style={styles.durationString}>{slot.total_hours} Hours total</span>
                  </div>
                  <span style={styles.slotCost}>\${slot.total_cost}</span>
                </button>
              );
            })}
          </div>
        )}

        {selectedSlot && (
          <div style={styles.costSummaryCard}>
            <div style={styles.costSummaryRow}>
              <span>Calculated Cost</span>
              <span style={styles.finalCostColor}>\${selectedSlot.total_cost}</span>
            </div>
          </div>
        )}

        <button 
          onClick={handleProceedToSummary}
          disabled={!selectedSlot}
          style={{
            ...styles.submitBtn,
            ...(!selectedSlot ? styles.submitBtnDisabled : {})
          }}
        >
          Review Booking Summary
        </button>
      </div>
    </div>
  </div>
);


    </div>
  );
}