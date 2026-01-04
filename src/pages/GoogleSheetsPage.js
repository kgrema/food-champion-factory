// src/pages/GoogleSheetsPage.js
import React, { useState, useEffect } from 'react';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import SheetsDataTable from '../components/googleSheets/SheetsDataTable';
import SheetsForm from '../components/googleSheets/SheetsForm';
import './GoogleSheetsPage.css';

const GoogleSheetsPage = () => {
  const { 
    data, 
    loading, 
    error, 
    connectionStatus, 
    loadData, 
    addRow,
    testConnection 
  } = useGoogleSheets();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Test connection and load data on mount
    const initialize = async () => {
      await testConnection();
      await loadData();
    };
    initialize();
  }, [testConnection, loadData]);

  useEffect(() => {
    // Filter data based on search term
    if (data && data.length > 0) {
      if (!searchTerm.trim()) {
        setFilteredData(data);
      } else {
        const filtered = data.filter(row => 
          row.some(cell => 
            cell && cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setFilteredData(filtered);
      }
    }
  }, [data, searchTerm]);

  const handleAddRow = async (sheetName, rowData) => {
    const result = await addRow(sheetName, rowData);
    if (result.success) {
      alert('✅ Entry added successfully!');
    } else {
      alert(`❌ Error: ${result.error}`);
    }
  };

  return (
    <div className="google-sheets-page">
      <div className="page-header">
        <h1>📊 Google Sheets Database</h1>
        <div className={`status-badge ${connectionStatus}`}>
          {connectionStatus === 'connected' ? '✅ Connected' : '❌ Disconnected'}
        </div>
      </div>

      <div className="page-description">
        <p>
          This page connects to your Google Sheets to display and manage supply data. 
          All data is stored securely in your Google Sheet and can be accessed in real-time.
        </p>
      </div>

      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search in sheet data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-hint">
            {filteredData.length > 0 ? `Found ${filteredData.length - 1} records` : 'Search...'}
          </span>
        </div>
        
        <button 
          onClick={() => loadData()} 
          className="refresh-btn"
          disabled={loading}
        >
          {loading ? '🔄 Loading...' : '🔄 Refresh Data'}
        </button>
      </div>

      <SheetsForm 
        onSubmit={handleAddRow}
        loading={loading}
      />

      <SheetsDataTable 
        data={searchTerm ? filteredData : data}
        loading={loading}
        error={error}
        title={`Supply Records ${searchTerm ? '(Filtered)' : ''}`}
      />

      <div className="info-card">
        <h3>ℹ️ How This Works</h3>
        <ul>
          <li><strong>Backend:</strong> Node.js server running on Render/Heroku</li>
          <li><strong>Database:</strong> Google Sheets (your spreadsheet)</li>
          <li><strong>Frontend:</strong> React app on Vercel</li>
          <li><strong>Real-time:</strong> Changes sync immediately</li>
          <li><strong>Secure:</strong> Service account authentication</li>
        </ul>
        <div className="tech-stack">
          <span className="tech-badge">React</span>
          <span className="tech-badge">Node.js</span>
          <span className="tech-badge">Google Sheets API</span>
          <span className="tech-badge">Vercel</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsPage;