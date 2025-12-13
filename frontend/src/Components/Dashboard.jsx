// src/components/Dashboard.jsx
import React from 'react';
import GpsCard from './GpsCard';
import SatelliteVisualizer from './SatelliteVisualizer';
import MapView from './MapView';
import ConnectionStatus from './ConnectionStatus';

const Dashboard = ({ gpsData }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📡 Neo-6M GPS Dashboard</h1>
        <ConnectionStatus fix={gpsData.fix} />
      </header>

      <div className="dashboard-grid">
        {/* Main Position Section */}
        <div className="main-position">
          <div className="position-card">
            <h2>📍 Current Position</h2>
            <div className="position-values">
              <div className="coord">
                <span className="label">Latitude</span>
                <span className="value highlight">{gpsData.latitude}°</span>
              </div>
              <div className="coord">
                <span className="label">Longitude</span>
                <span className="value highlight">{gpsData.longitude}°</span>
              </div>
            </div>
            <div className="position-meta">
              <span className="altitude">Altitude: {gpsData.altitude} m</span>
              {gpsData.local_time && (
                <span className="arduino-time">⏰ {gpsData.local_time} ({gpsData.timezone})</span>
              )}
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="map-section">
          <MapView latitude={gpsData.latitude} longitude={gpsData.longitude} />
        </div>

        {/* Satellite Info */}
        <div className="satellite-section">
          <SatelliteVisualizer 
            satellites={gpsData.satellites} 
            hdop={gpsData.hdop}
          />
        </div>

        {/* Parameter Cards */}
        <div className="parameters-grid">
          <GpsCard 
            title="Speed"
            value={gpsData.speed}
            unit="km/h"
            icon="🚀"
            color="#4CAF50"
          />
          
          <GpsCard 
            title="Course"
            value={gpsData.course}
            unit="°"
            icon="🧭"
            color="#2196F3"
          />
          
          <GpsCard 
            title="HDOP"
            value={gpsData.hdop}
            unit=""
            icon="🎯"
            color={gpsData.hdop < 1.0 ? '#4CAF50' : gpsData.hdop < 2.0 ? '#FF9800' : '#F44336'}
          />
          
          <GpsCard 
            title="Satellites"
            value={gpsData.satellites}
            unit=" in view"
            icon="🛰️"
            color="#9C27B0"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;