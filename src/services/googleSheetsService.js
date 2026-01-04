// src/services/googleSheets.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

class GoogleSheetsService {
  constructor() {
    this.baseUrl = API_URL;
  }

  // Test connection to backend
  async testConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/api/test`);
      const data = await response.json();
      return {
        success: data.success,
        message: data.message,
        timestamp: data.timestamp
      };
    } catch (error) {
      return {
        success: false,
        error: `Cannot connect to backend: ${error.message}`,
        tip: 'Make sure backend server is running on port 5001'
      };
    }
  }

  // Read data from sheet
  async readData(range = 'Sheet1!A1:C100') {
    try {
      const response = await fetch(`${this.baseUrl}/api/sheets/${encodeURIComponent(range)}`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data,
          range: data.range,
          headers: data.data[0] || [],
          rows: data.data.slice(1)
        };
      } else {
        return {
          success: false,
          error: data.error,
          hint: data.hint || 'Check sheet sharing and range format'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error.message}`
      };
    }
  }

  // Add new row to sheet
  async addRow(sheetName = 'Sheet1', rowData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/sheets/append`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          range: sheetName,
          values: [rowData]
        })
      });

      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          message: data.message,
          updatedRange: data.updatedRange
        };
      } else {
        return {
          success: false,
          error: data.error
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to add row: ${error.message}`
      };
    }
  }

  // Update specific cell
  async updateCell(range, value) {
    try {
      const response = await fetch(`${this.baseUrl}/api/sheets/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          range: range,
          values: [[value]]
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: `Failed to update cell: ${error.message}`
      };
    }
  }

  // Get sheet metadata
  async getSheetInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/api/sheets-info`);
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: `Failed to get sheet info: ${error.message}`
      };
    }
  }

  // Search in sheet data
  searchData(data, searchTerm) {
    if (!searchTerm) return data;
    
    return data.filter(row => 
      row.some(cell => 
        cell && cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  // Format data for display
  formatDataForTable(sheetData) {
    if (!sheetData || sheetData.length === 0) {
      return { headers: [], rows: [] };
    }

    const headers = sheetData[0];
    const rows = sheetData.slice(1);
    
    return {
      headers: headers.map((header, index) => ({
        key: `col_${index}`,
        label: header || `Column ${index + 1}`
      })),
      rows: rows.map((row, rowIndex) => ({
        id: rowIndex,
        cells: row.map((cell, cellIndex) => ({
          value: cell,
          key: `cell_${rowIndex}_${cellIndex}`
        }))
      }))
    };
  }
}

// Create singleton instance
const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;