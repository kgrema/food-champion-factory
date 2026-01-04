import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,  Link } from 'react-router-dom';
import { GoogleSheetsProvider } from './context/GoogleSheetsContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GoogleSheetsPage from './pages/GoogleSheetsPage';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Orders from './pages/Orders';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import './App.css';
import Inventory from './pages/Inventory';
import Production from './pages/Production';
import Delivery from './pages/Delivery';
import Sales from './pages/Sales';
import Recipes from './pages/Recipes';
import RawMaterials from './pages/RawMaterials';
import Users from './pages/Users';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Separate component to use auth context
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Navigate to="/dashboard" />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/clients" element={
        <ProtectedRoute>
          <Layout>
            <Clients />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/orders" element={
        <ProtectedRoute>
          <Layout>
            <Orders />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/sales" element={
        <ProtectedRoute>
          <Layout>
            <Sales />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/production" element={
        <ProtectedRoute roles={['Admin', 'Production']}>
          <Layout>
            <Production />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/delivery" element={
        <ProtectedRoute roles={['Admin', 'Delivery', 'Sales']}>
          <Layout>
            <Delivery />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/inventory" element={
        <ProtectedRoute roles={['Admin', 'Production']}>
          <Layout>
            <Inventory />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/recipes" element={
        <ProtectedRoute roles={['Admin', 'Production']}>
          <Layout>
            <Recipes />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/raw-materials" element={
        <ProtectedRoute roles={['Admin', 'Production']}>
          <Layout>
            <RawMaterials />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/users" element={
        <ProtectedRoute roles={['Admin']}>
          <Layout>
            <Users />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
  
};function App() {
  return (
    <GoogleSheetsProvider>
      <Router>
        <div className="App">
          <nav className="main-nav">
            <div className="nav-brand">
              <h1>Food Champion Factory</h1>
            </div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/sheets">Google Sheets DB</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
		  <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sheets" element={<GoogleSheetsPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Add your existing routes */}
            </Routes>
          </main>

          <footer className="main-footer">
            <p>© {new Date().getFullYear()} Food Champion Factory. Using Google Sheets as Database.</p>
          </footer>
        </div>
      </Router>
    </GoogleSheetsProvider>
  );
}



export default App;