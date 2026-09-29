import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const navigate = useNavigate();

  const filteredRooms = selectedCategory === 'ALL' 
    ? MOCK_ROOMS 
    : MOCK_ROOMS.filter(room => room.type === selectedCategory);

  return (
    <div>
      <div className="header-section">
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
    </div>
  );
}