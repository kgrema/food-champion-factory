// src/context/GoogleSheetsContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import googleSheetsService from '../services/googleSheets';

const GoogleSheetsContext = createContext();

export const useGoogleSheets = () => {
  const context = useContext(GoogleSheetsContext);
  if (!context) {
    throw new Error('useGoogleSheets must be used within GoogleSheetsProvider');
  }
  return context;
};

export const GoogleSheetsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Test connection
  const testConnection = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await googleSheetsService.testConnection();
    
    if (result.success) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('disconnected');
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  }, []);

  // Load data from sheet
  const loadData = useCallback(async (range = 'Sheet1!A1:C100') => {
    setLoading(true);
    setError(null);
    
    const result = await googleSheetsService.readData(range);
    
    if (result.success) {
      setData(result.data);
      setConnectionStatus('connected');
    } else {
      setError(result.error);
      setConnectionStatus('error');
    }
    
    setLoading(false);
    return result;
  }, []);

  // Add new row
  const addRow = useCallback(async (sheetName, rowData) => {
    setLoading(true);
    setError(null);
    
    const result = await googleSheetsService.addRow(sheetName, rowData);
    
    if (result.success) {
      // Refresh data after adding
      await loadData();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  }, [loadData]);

  // Get sheet info
  const getSheetInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await googleSheetsService.getSheetInfo();
    
    setLoading(false);
    return result;
  }, []);

  const value = {
    data,
    loading,
    error,
    connectionStatus,
    testConnection,
    loadData,
    addRow,
    getSheetInfo,
    formatData: googleSheetsService.formatDataForTable,
    searchData: googleSheetsService.searchData
  };

  return (
    <GoogleSheetsContext.Provider value={value}>
      {children}
    </GoogleSheetsContext.Provider>
  );
};