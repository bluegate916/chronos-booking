// import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookingSummaryScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { roomId = "1", hours = 2, totalCost = 90.00 } = location.state || {};

  return (
    <div className="summary-card">
      <div className="summary-header">
        <span className="badge-step">Step 3: Verification</span>
        <h1 className="main-title" style={{ marginTop: '12px' }}>Booking Summary</h1>
        <p className="subtitle">Please review your workspace reservation terms below.</p>
      </div>

      <div className="form-group">
        {/* Core Parameters Metrics */}
        <div className="metrics-box">
          <div>
            <span className="metric-label">Selected Space</span>
            <span className="metric-value">Premium Space Cluster #{roomId}</span>
          </div>
          <div>
            <span className="metric-label">Access Period</span>
            <span className="metric-value">{hours} Total Hours</span>
          </div>
        </div>

        <div className="billing-list">
          <h3 className="section-title">Billing Breakdowns</h3>
          <div className="cost-row">
            <span>Corporate Space Allocation Tariff</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
          <div className="cost-row">
            <span>Local Network Infrastructure Maintenance Fees</span>
            <span className="text-free">FREE</span>
          </div>
          <div className="cost-total-row">
            <span>Total Account Charge</span>
            <span className="total-accent">${totalCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={() => navigate('/')}
            className="btn-cancel"
          >
            Cancel & Go Back
          </button>
          <button 
            onClick={() => alert('Booking committed to PostgreSQL database architecture successfully!')}
            className="btn-confirm"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}