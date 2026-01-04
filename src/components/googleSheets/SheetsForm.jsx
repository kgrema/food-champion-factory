// src/components/googleSheets/SheetsForm.jsx
import React, { useState } from 'react';
import './SheetsForm.css';

const SheetsForm = ({ onSubmit, loading, initialData = {} }) => {
  const [formData, setFormData] = useState({
    supplyDate: initialData.supplyDate || '',
    fcGuia: initialData.fcGuia || '',
    dmGuia: initialData.dmGuia || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert form data to array in correct order
    const rowData = [
      formData.supplyDate,
      formData.fcGuia,
      formData.dmGuia || ''
    ];
    
    onSubmit('Sheet1', rowData);
    
    // Reset form
    setFormData({
      supplyDate: '',
      fcGuia: '',
      dmGuia: ''
    });
  };

  return (
    <div className="sheets-form">
      <h3>Add New Supply Entry</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="supplyDate">SUPPLY DATE *</label>
          <input
            type="text"
            id="supplyDate"
            name="supplyDate"
            value={formData.supplyDate}
            onChange={handleChange}
            placeholder="e.g., 18-Nov-23"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="fcGuia">FC GUIA Nͦ *</label>
          <input
            type="text"
            id="fcGuia"
            name="fcGuia"
            value={formData.fcGuia}
            onChange={handleChange}
            placeholder="e.g., 5001"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dmGuia">DM GUIA Nͦ (Optional)</label>
          <input
            type="text"
            id="dmGuia"
            name="dmGuia"
            value={formData.dmGuia}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Sheet'}
        </button>
      </form>
    </div>
  );
};

export default SheetsForm;