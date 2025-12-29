import React, { useState } from 'react';
import KalmanView from './KalmanView';
import '../Styles/Kalman.css';

const KalmanPage = ({ gpsData, onBack }) => {
  const [filteredCoord, setFilteredCoord] = useState({ lat: null, lon: null });
  const [errors, setErrors] = useState({ rawError: null, filteredError: null, neoKalman: null });
  const [errorHistory, setErrorHistory] = useState([]);

  // manual inputs on the page (prefilled from dashboard gpsData)
  const [neoLat, setNeoLat] = useState(gpsData.latitude);
  const [neoLon, setNeoLon] = useState(gpsData.longitude);
  const [refLat, setRefLat] = useState('');
  const [refLon, setRefLon] = useState('');
  const [manualTrigger, setManualTrigger] = useState(0);

  const handleFilteredUpdate = (payload) => {
    if (!payload) return;
    const { lat, lon, rawError, filteredError } = payload;
    if (isFinite(lat) && isFinite(lon)) setFilteredCoord({ lat, lon });
    // update errors if provided
    // only update stored error values when provided
    if (typeof rawError === 'number' || typeof filteredError === 'number' || typeof payload.neoKalman === 'number') {
      const newRaw = rawError != null ? rawError : errors.rawError;
      const newFilt = filteredError != null ? filteredError : errors.filteredError;
      const newNeoKal = payload.neoKalman != null ? payload.neoKalman : errors.neoKalman;
      setErrors({ rawError: newRaw, filteredError: newFilt, neoKalman: newNeoKal });

      // record to history when update came from manual compute
      if (payload.source === 'manual' && isFinite(newRaw) && isFinite(newFilt)) {
        const timestamp = new Date().toISOString();
        setErrorHistory(prev => [...prev, { timestamp, neoLat, neoLon, refLat, refLon, rawError: newRaw, filteredError: newFilt, neoKalman: newNeoKal }]);
      }
    }
  };

  const handleCompute = () => {
    // bump trigger to tell KalmanView to compute using provided neo/ref
    setManualTrigger(t => t + 1);
  };

  const handleDownload = () => {
    if (errorHistory.length === 0) {
      alert('No results to download. Compute distance errors first.');
      return;
    }
    const csvData = [
      ['Timestamp', 'Neo-6M Lat', 'Neo-6M Lon', 'Ref Lat', 'Ref Lon', 'Neo→Ref (m)', 'Kalman→Ref (m)', 'Neo↔Kalman (m)'],
      ...errorHistory.map(r => [
        r.timestamp,
        r.neoLat,
        r.neoLon,
        r.refLat,
        r.refLon,
        r.rawError.toFixed(2),
        r.filteredError.toFixed(2),
        r.neoKalman.toFixed(2)
      ])
    ];
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kalman-error-results-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="kalman-page">
      <div className="kalman-page-header">
        <div className="kalman-page-left">
          <button className="back-button" onClick={onBack}>← Back</button>
          <h1>Kalman Full Page View</h1>
          <p className="subtitle">Live Kalman-filtered location, error analysis and interactive map.</p>
        </div>

        <div className="kalman-page-right">
          <div className="metric">
            <div className="label">Kalman Latitude</div>
            <div className="value">{filteredCoord.lat !== null ? filteredCoord.lat.toFixed(6) : '—'}</div>
          </div>
          <div className="metric">
            <div className="label">Kalman Longitude</div>
            <div className="value">{filteredCoord.lon !== null ? filteredCoord.lon.toFixed(6) : '—'}</div>
          </div>
          {/* <div className="metric">
            <div className="label">Neo-6M → Ref (m)</div>
            <div className="value">{errors.rawError != null ? errors.rawError.toFixed(2) : '—'}</div>
          </div>
          <div className="metric">
            <div className="label">Kalman → Ref (m)</div>
            <div className="value">{errors.filteredError != null ? errors.filteredError.toFixed(2) : '—'}</div>
          </div> */}
        </div>
      </div>

      <div className="kalman-page-grid">
        <div className="controls-pane">
          <h3> Neo-6M </h3>
          <label> Latitude
            <input value={neoLat} onChange={e=>setNeoLat(e.target.value)} />
          </label>
          <label> Longitude
            <input value={neoLon} onChange={e=>setNeoLon(e.target.value)} />
          </label>

          <h3>Google Reference</h3>
          <label>Latitude
            <input value={refLat} onChange={e=>setRefLat(e.target.value)} />
          </label>
          <label>Longitude
            <input value={refLon} onChange={e=>setRefLon(e.target.value)} />
          </label>

          <div className="button-group">
            <button className="compute-button" onClick={handleCompute}>Compute Distance Error</button>
            <button className="download-button" onClick={handleDownload} title="Download error results as CSV">⬇️ Download</button>
          </div>
        </div>

        <div className="view-pane">
          <KalmanView gpsData={gpsData} onFilteredUpdate={handleFilteredUpdate} refLat={refLat} refLon={refLon} neoLat={neoLat} neoLon={neoLon} manualComputeTrigger={manualTrigger} errorHistory={errorHistory} />
        </div>
      </div>
    </div>
  );
};

export default KalmanPage;
