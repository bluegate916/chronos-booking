import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RoomDetailScreen.css';

export default function RoomDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hours, setHours] = useState(1);

  const pricePerHour = 45.00;
  const totalCost = hours * pricePerHour;

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
    </div>
  );
}