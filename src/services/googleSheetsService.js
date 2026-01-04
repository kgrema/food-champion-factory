import axios from 'axios';

// Google Sheets API configuration
const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY';
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

const ranges = {
  clients: 'CLIENTS!A:K',
  products: 'PRODUCTS!A:L',
  orders: 'ORDERS!A:N',
  production: 'PRODUCTION!A:J',
  delivery: 'DELIVERY!A:I',
  inventory: 'INVENTORY!A:G',
  sales: 'SALES!A:H',
};

export const googleSheetsService = {
  async getClients() {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${ranges.clients}`,
        {
          params: { key: API_KEY },
        }
      );
      return this.parseSheetData(response.data.values);
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  },

  async getProducts() {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${ranges.products}`,
        {
          params: { key: API_KEY },
        }
      );
      return this.parseSheetData(response.data.values);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getOrders() {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${ranges.orders}`,
        {
          params: { key: API_KEY },
        }
      );
      return this.parseSheetData(response.data.values);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  parseSheetData(values) {
    if (!values || values.length < 2) return [];
    
    const headers = values[0];
    const rows = values.slice(1);
    
    return rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.toLowerCase().replace(/\s+/g, '_')] = row[index] || '';
      });
      return obj;
    });
  },

  async updateSheet(range, values) {
    try {
      const response = await axios.put(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`,
        {
          values: [values],
        },
        {
          params: { key: API_KEY, valueInputOption: 'RAW' },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating sheet:', error);
      throw error;
    }
  },
};