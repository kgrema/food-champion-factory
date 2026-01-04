// src/components/googleSheets/SheetsDataTable.jsx
import React from 'react';
import './SheetsDataTable.css';

const SheetsDataTable = ({ data, loading, error, title = 'Google Sheets Data' }) => {
  if (loading) {
    return (
      <div className="sheets-loading">
        <div className="spinner"></div>
        <p>Loading data from Google Sheets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sheets-error">
        <h3>⚠️ Error Loading Data</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="sheets-empty">
        <p>No data found in the sheet.</p>
        <p>Try adding some data!</p>
      </div>
    );
  }

  const headers = data[0] || [];
  const rows = data.slice(1);

  return (
    <div className="sheets-data-table">
      <div className="table-header">
        <h3>{title}</h3>
        <span className="row-count">{rows.length} records</span>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header || `Column ${index + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell || '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SheetsDataTable;