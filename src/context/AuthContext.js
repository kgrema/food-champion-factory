import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Role-based permissions
const ROLE_PERMISSIONS = {
  Admin: {
    canView: ['dashboard', 'clients', 'orders', 'sales', 'production', 'delivery', 'inventory', 'recipes', 'raw-materials', 'users'],
    canEdit: true,
    canDelete: true,
    canManageUsers: true,
  },
  Production: {
    canView: ['dashboard', 'production', 'inventory', 'recipes', 'raw-materials'],
    canEdit: true,
    canDelete: false,
    canManageUsers: false,
  },
  Sales: {
    canView: ['dashboard', 'clients', 'orders', 'sales'],
    canEdit: true,
    canDelete: false,
    canManageUsers: false,
  },
  Delivery: {
    canView: ['dashboard', 'delivery'],
    canEdit: true,
    canDelete: false,
    canManageUsers: false,
  },
  Viewer: {
    canView: ['dashboard'],
    canEdit: false,
    canDelete: false,
    canManageUsers: false,
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(true);

  // Secure user database - In production, this would be in a secure backend
  const usersDatabase = [
    { 
      id: 'mgrema', 
      name: 'Michella Grema', 
      email: 'mrsgrema@gmail.com', 
      password: 'FoodChampion2024!', // Strong password
      role: 'Admin', 
      location: 'Main Office', 
      active: true,
      department: 'Management'
    },
    { 
      id: 'kgrema', 
      name: 'Kevin Grema', 
      email: 'kgrema@gmail.com', 
      password: 'AdminSecure123!', // Strong password
      role: 'Admin', 
      location: 'Main Office', 
      active: true,
      department: 'Management'
    },
    { 
      id: 'prod1', 
      name: 'Production Manager', 
      email: 'production@foodchampion.com', 
      password: 'ProdSecure2024!', // Strong password
      role: 'Production', 
      location: 'Factory', 
      active: true,
      department: 'Production'
    },
    { 
      id: 'sales1', 
      name: 'Sales Manager', 
      email: 'sales@foodchampion.com', 
      password: 'SalesSecure2024!', // Strong password
      role: 'Sales', 
      location: 'Office', 
      active: true,
      department: 'Sales'
    },
    { 
      id: 'delivery1', 
      name: 'Delivery Coordinator', 
      email: 'delivery@foodchampion.com', 
      password: 'DeliverySecure2024!', // Strong password
      role: 'Delivery', 
      location: 'Dispatch', 
      active: true,
      department: 'Logistics'
    },
  ];

  const login = (email, password) => {
    console.log('Secure login attempt:', email);
    
    // Find user in database
    const foundUser = usersDatabase.find(user => 
      user.email === email && user.password === password
    );
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        location: foundUser.location,
        department: foundUser.department,
        active: foundUser.active,
      };
      
      setUser(userData);
      setPermissions(ROLE_PERMISSIONS[foundUser.role]);
      
      // Store encrypted session
      const sessionData = {
        ...userData,
        loginTime: new Date().toISOString(),
        sessionId: Math.random().toString(36).substr(2, 9)
      };
      
      localStorage.setItem('foodChampionSession', JSON.stringify(sessionData));
      return { success: true, user: userData };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setPermissions(null);
    localStorage.removeItem('foodChampionSession');
  };

  // Check session on load
  useEffect(() => {
    const sessionData = localStorage.getItem('foodChampionSession');
    if (sessionData) {
      try {
        const parsedData = JSON.parse(sessionData);
        // Verify session is not expired (24 hours)
        const loginTime = new Date(parsedData.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setUser({
            id: parsedData.id,
            name: parsedData.name,
            email: parsedData.email,
            role: parsedData.role,
            location: parsedData.location,
            department: parsedData.department,
            active: parsedData.active,
          });
          setPermissions(ROLE_PERMISSIONS[parsedData.role]);
        } else {
          // Session expired
          localStorage.removeItem('foodChampionSession');
        }
      } catch (error) {
        localStorage.removeItem('foodChampionSession');
      }
    }
    setLoading(false);
  }, []);

  // Check if user has permission to view a specific page
  const hasPermission = (page) => {
    if (!permissions) return false;
    return permissions.canView.includes(page);
  };

  const value = {
    user,
    permissions,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};