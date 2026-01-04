import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  LocationOn,
  People,
  Store,
  Person,
  AttachMoney,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

// Sample client data
const clientsData = [
  { id: 1, clientId: 'A Palhota', name: 'A Palhota', type: 'Restaurante', location: 'Chimoio', status: 'ACTIVE', totalOrders: 24, totalSpent: 'MZN 45,230' },
  { id: 2, clientId: 'China Mall', name: 'China Mall', type: 'Supermercado', location: 'Beira', status: 'ACTIVE', totalOrders: 156, totalSpent: 'MZN 289,450' },
  { id: 3, clientId: 'VIP Spar', name: 'VIP Spar Supermercado Beira', type: 'Supermercado', location: 'Beira', status: 'ACTIVE', totalOrders: 89, totalSpent: 'MZN 178,900' },
  { id: 4, clientId: 'Beira Grain', name: 'Beira Grain Terminal', type: 'Corporate', location: 'Beira', status: 'ACTIVE', totalOrders: 12, totalSpent: 'MZN 67,800' },
];

const columns = [
  { field: 'clientId', headerName: 'Client ID', width: 150 },
  { field: 'name', headerName: 'Client Name', width: 200 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'location', headerName: 'Location', width: 120 },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 120,
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        color={params.value === 'ACTIVE' ? 'success' : 'error'} 
        size="small" 
      />
    )
  },
  { field: 'totalOrders', headerName: 'Total Orders', width: 130 },
  { field: 'totalSpent', headerName: 'Total Spent', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: () => (
      <Box>
        <IconButton size="small">
          <Edit />
        </IconButton>
        <IconButton size="small">
          <Delete />
        </IconButton>
      </Box>
    ),
  },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Client Management</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add New Client
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <People sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h6">67</Typography>
                      <Typography variant="caption" color="textSecondary">Total Clients</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Store sx={{ mr: 1, color: 'success.main' }} />
                    <Box>
                      <Typography variant="h6">45</Typography>
                      <Typography variant="caption" color="textSecondary">Supermercados</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Person sx={{ mr: 1, color: 'warning.main' }} />
                    <Box>
                      <Typography variant="h6">12</Typography>
                      <Typography variant="caption" color="textSecondary">Individuals</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <AttachMoney sx={{ mr: 1, color: 'info.main' }} />
                    <Box>
                      <Typography variant="h6">MZN 1.2M</Typography>
                      <Typography variant="caption" color="textSecondary">Total Revenue</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ height: 500 }}>
            <DataGrid
              rows={filteredClients}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              onRowClick={(params) => setSelectedClient(params.row)}
              sx={{ border: 0 }}
            />
          </Paper>
        </Grid>

        {selectedClient && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Client Details: {selectedClient.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="textSecondary">Client ID</Typography>
                  <Typography variant="body1">{selectedClient.clientId}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="textSecondary">Type</Typography>
                  <Chip label={selectedClient.type} size="small" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="textSecondary">
                    <LocationOn sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                    Location
                  </Typography>
                  <Typography variant="body1">{selectedClient.location}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="textSecondary">Status</Typography>
                  <Chip label={selectedClient.status} color="success" size="small" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="textSecondary">Total Orders</Typography>
                  <Typography variant="h6">{selectedClient.totalOrders}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="textSecondary">Total Spent</Typography>
                  <Typography variant="h6" color="primary">{selectedClient.totalSpent}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Clients;