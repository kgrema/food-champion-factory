import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  LocalShipping,
  CheckCircle,
  Pending,
  Schedule,
  Warning,
  Map,
  Phone,
  Person,
  DirectionsCar,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';

const Delivery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [filter, setFilter] = useState('all');

  const deliverySteps = ['Scheduled', 'Loading', 'In Transit', 'Delivered'];

  // Real delivery data
  const deliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      client: 'China Mall',
      address: 'Beira Center, Beira',
      driver: 'John Doe',
      driverPhone: '+258 84 123 4567',
      vehicle: 'Truck BZ-123',
      route: 'Factory → Beira Center',
      status: 'delivered',
      departure: '08:00 AM',
      deliveryTime: '10:30 AM',
      notes: 'Delivered successfully. Client satisfied.',
      items: [
        { product: 'SAMOSSA24-BEEF', quantity: 5 },
        { product: 'SORVET5L-VANILLA', quantity: 2 },
      ],
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      client: 'VIP Spar Beira',
      address: 'VIP Spar Building, Beira',
      driver: 'Maria Silva',
      driverPhone: '+258 84 234 5678',
      vehicle: 'Van BZ-456',
      route: 'Factory → Beira Suburbs',
      status: 'in-transit',
      departure: '09:00 AM',
      deliveryTime: 'Expected 12:00 PM',
      notes: 'On the way. Traffic normal.',
      items: [
        { product: 'SPRINGROLL24-FRANGO', quantity: 3 },
        { product: 'RESSOIS24-CAMARAO', quantity: 2 },
      ],
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      client: 'Supermercado Mil Tete',
      address: 'Tete City Center, Tete',
      driver: 'Antonio',
      driverPhone: '+258 84 345 6789',
      vehicle: 'Truck T-789',
      route: 'Factory → Tete City',
      status: 'scheduled',
      departure: '06:00 AM (Tomorrow)',
      deliveryTime: 'Tomorrow',
      notes: 'Scheduled for tomorrow morning',
      items: [
        { product: 'SORVET300ML-VANILLA', quantity: 20 },
        { product: 'SORVET300ML-CHOCOLATE', quantity: 15 },
      ],
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-004',
      client: 'Feliz Shopping',
      address: 'Industrial Area, Beira',
      driver: 'Carlos',
      driverPhone: '+258 84 456 7890',
      vehicle: 'Van BZ-101',
      route: 'Factory → Beira Industrial',
      status: 'delayed',
      departure: '10:00 AM',
      deliveryTime: 'Delayed',
      notes: 'Vehicle maintenance issue. New vehicle dispatched.',
      items: [
        { product: 'SAMOSSA12-BEEF', quantity: 10 },
        { product: 'SAMOSSA12-FRANGO', quantity: 10 },
      ],
    },
  ];

  // Drivers data
  const drivers = [
    { id: 1, name: 'John Doe', phone: '+258 84 123 4567', vehicle: 'Truck BZ-123', rating: 4.8, deliveries: 45 },
    { id: 2, name: 'Maria Silva', phone: '+258 84 234 5678', vehicle: 'Van BZ-456', rating: 4.6, deliveries: 38 },
    { id: 3, name: 'Antonio', phone: '+258 84 345 6789', vehicle: 'Truck T-789', rating: 4.7, deliveries: 32 },
    { id: 4, name: 'Carlos', phone: '+258 84 456 7890', vehicle: 'Van BZ-101', rating: 4.5, deliveries: 28 },
  ];

  // Vehicles data
  const vehicles = [
    { id: 1, plate: 'BZ-123', type: 'Truck', capacity: '5000 kg', status: 'Active', lastService: '2024-01-10' },
    { id: 2, plate: 'BZ-456', type: 'Van', capacity: '1500 kg', status: 'Active', lastService: '2024-01-12' },
    { id: 3, plate: 'T-789', type: 'Truck', capacity: '5000 kg', status: 'Active', lastService: '2024-01-08' },
    { id: 4, plate: 'BZ-101', type: 'Van', capacity: '1500 kg', status: 'Maintenance', lastService: '2024-01-15' },
  ];

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && (delivery.status === 'in-transit' || delivery.status === 'scheduled');
    if (filter === 'completed') return matchesSearch && delivery.status === 'delivered';
    if (filter === 'delayed') return matchesSearch && delivery.status === 'delayed';
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'in-transit': return 'warning';
      case 'scheduled': return 'info';
      case 'delayed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle />;
      case 'in-transit': return <LocalShipping />;
      case 'scheduled': return <Schedule />;
      case 'delayed': return <Warning />;
      default: return <Pending />;
    }
  };

  const stats = {
    total: deliveries.length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    inTransit: deliveries.filter(d => d.status === 'in-transit').length,
    delayed: deliveries.filter(d => d.status === 'delayed').length,
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Delivery Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
          Schedule Delivery
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Search and Filter */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Search deliveries by ID, client, or driver..."
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
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Filter by Status</InputLabel>
                  <Select
                    value={filter}
                    label="Filter by Status"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Deliveries</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="delayed">Delayed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Delivery Stats */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <LocalShipping sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5">{stats.total}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Total Deliveries
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h5">{stats.delivered}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Delivered
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <LocalShipping sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h5">{stats.inTransit}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    In Transit
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Warning sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                  <Typography variant="h5" color="error.main">{stats.delayed}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Delayed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Delivery Tracking */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Active Deliveries</Typography>
              <Button size="small" startIcon={<Map />} variant="outlined">
                View Route Map
              </Button>
            </Box>
            
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {deliverySteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Delivery ID</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {delivery.id}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Order: {delivery.orderId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{delivery.client}</Typography>
                          <Typography variant="caption" color="textSecondary" display="flex" alignItems="center">
                            <LocationOn sx={{ fontSize: 12, mr: 0.5 }} />
                            {delivery.address}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                            <Person sx={{ fontSize: 14 }} />
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{delivery.driver}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {delivery.driverPhone}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <DirectionsCar sx={{ fontSize: 16, mr: 0.5 }} />
                          <Box>
                            <Typography variant="body2">{delivery.vehicle}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {delivery.route}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={delivery.status}
                          size="small"
                          color={getStatusColor(delivery.status)}
                          icon={getStatusIcon(delivery.status)}
                        />
                        <Typography variant="caption" display="block">
                          <AccessTime sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                          {delivery.departure}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small">
                          <Phone />
                        </IconButton>
                        <IconButton size="small">
                          <Map />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Driver Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Driver Performance
            </Typography>
            <Grid container spacing={2}>
              {drivers.map((driver) => (
                <Grid item xs={12} key={driver.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.main' }}>
                            {driver.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{driver.name}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {driver.vehicle} • {driver.deliveries} deliveries
                            </Typography>
                          </Box>
                        </Box>
                        <Box textAlign="right">
                          <Chip label={`${driver.rating}/5`} size="small" color="primary" />
                          <Typography variant="caption" display="block" color="textSecondary">
                            Rating
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(driver.deliveries / 50) * 100}
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Vehicle Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Status
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Plate</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Service</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {vehicle.plate}
                        </Typography>
                      </TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell>{vehicle.capacity}</TableCell>
                      <TableCell>
                        <Chip
                          label={vehicle.status}
                          size="small"
                          color={vehicle.status === 'Active' ? 'success' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>{vehicle.lastService}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              View Maintenance Schedule
            </Button>
          </Paper>
        </Grid>

        {/* Delivery Analytics */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Performance
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="success.main">92%</Typography>
                    <Typography variant="caption" color="textSecondary">
                      On-Time Delivery
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5">2.3</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Avg. Delivery Days
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="error.main">8%</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Delayed Deliveries
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="success.main">98%</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Customer Satisfaction
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Schedule Delivery Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule New Delivery</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Order</InputLabel>
                <Select label="Select Order">
                  <MenuItem value="ORD-001">ORD-001 - China Mall</MenuItem>
                  <MenuItem value="ORD-002">ORD-002 - VIP Spar Beira</MenuItem>
                  <MenuItem value="ORD-003">ORD-003 - Supermercado Mil Tete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Driver</InputLabel>
                <Select label="Select Driver">
                  {drivers.map((driver) => (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name} ({driver.vehicle})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Delivery Time"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Delivery Instructions"
                placeholder="Special instructions for driver..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Schedule Delivery
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Delivery;