import React, { useState, useEffect } from 'react';
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
  Autocomplete,
  Alert,
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
  ShoppingCart,
} from '@mui/icons-material';

const Delivery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [filter, setFilter] = useState('all');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newOrderForm, setNewOrderForm] = useState({
    client: '',
    products: [],
    deliveryDate: '',
    notes: '',
    contactPerson: '',
    phone: '',
    address: '',
  });

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

  // Load clients from shared data (in real app, this would come from Sales.js)
  useEffect(() => {
    // Sample clients from sales data
    const sampleClients = [
      { id: 1, name: 'China Mall', category: 'Supermercado', phone: '+258 84 XXX XXXX', address: 'Beira Center, Beira' },
      { id: 2, name: 'VIP Spar Beira', category: 'Supermercado', phone: '+258 84 XXX XXXX', address: 'VIP Spar Building, Beira' },
      { id: 3, name: 'Supermercado Mil Tete', category: 'Supermercado', phone: '+258 84 XXX XXXX', address: 'Tete City Center, Tete' },
      { id: 4, name: 'Feliz Shopping', category: 'Supermercado', phone: '+258 84 XXX XXXX', address: 'Industrial Area, Beira' },
      { id: 5, name: 'Vip Spar Supermercado Tete', category: 'Supermercado', phone: '+258 84 XXX XXXX', address: 'Tete' },
      { id: 6, name: 'Supermercado HSK', category: 'Supermercado', phone: '+258 84 XXX XXXX', address: 'Beira' },
      { id: 7, name: 'Supermercado Altaj', category: 'Supermercado', phone: '+258 84 XXX XXXX', address: 'Beira' },
    ];
    setClients(sampleClients);
  }, []);

  // Products data
  const products = [
    { id: 'SM12B', name: 'SAMOSSA12-BEEF', price: 155.00, category: 'SAMOSSA 12Uni' },
    { id: 'SM12F', name: 'SAMOSSA12-FRANGO', price: 155.00, category: 'SAMOSSA 12Uni' },
    { id: 'SM24B', name: 'SAMOSSA24-BEEF', price: 225.00, category: 'SAMOSSA 24Uni' },
    { id: 'S300VN', name: 'SORVET300ML-VANILLA', price: 75.00, category: 'SORVET 300ML' },
    { id: 'S5LVN', name: 'SORVET5L-VANILLA', price: 800.00, category: 'SORVET 5L' },
    { id: 'SP24F', name: 'SPRINGROLL24-FRANGO', price: 225.00, category: 'SPRING ROLL 24 Uni' },
    { id: 'RS24C', name: 'RESSOIS24-CAMARAO', price: 225.00, category: 'RESSOIS 24 Uni' },
    { id: 'S300CH', name: 'SORVET300ML-CHOCOLATE', price: 75.00, category: 'SORVET 300ML' },
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

  const handleCreateOrder = () => {
    // In real app, this would create an order in the Orders component
    const newOrder = {
      client: selectedClient.name,
      products: newOrderForm.products,
      deliveryDate: newOrderForm.deliveryDate,
      notes: newOrderForm.notes,
      contactPerson: selectedClient.contactPerson || newOrderForm.contactPerson,
      phone: selectedClient.phone || newOrderForm.phone,
      address: selectedClient.address || newOrderForm.address,
      status: 'pending',
      needsProduction: false, // This will be set by production team
    };
    
    console.log('Creating new order:', newOrder);
    
    // Show success message
    alert(`Order created successfully for ${selectedClient.name}. Production team has been notified to check inventory.`);
    
    // Reset form
    setSelectedClient(null);
    setNewOrderForm({
      client: '',
      products: [],
      deliveryDate: '',
      notes: '',
      contactPerson: '',
      phone: '',
      address: '',
    });
    setOpenDialog(false);
  };

  const handleClientSelect = (event, newValue) => {
    setSelectedClient(newValue);
    if (newValue) {
      setNewOrderForm(prev => ({
        ...prev,
        contactPerson: newValue.contactPerson || '',
        phone: newValue.phone || '',
        address: newValue.address || '',
      }));
    }
  };

  const handleAddProduct = () => {
    setNewOrderForm(prev => ({
      ...prev,
      products: [...prev.products, { id: '', quantity: 1 }]
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...newOrderForm.products];
    updatedProducts[index][field] = value;
    setNewOrderForm(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = newOrderForm.products.filter((_, i) => i !== index);
    setNewOrderForm(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Delivery Management</Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<ShoppingCart />} 
            onClick={() => setOpenDialog(true)}
            sx={{ mr: 2 }}
          >
            Create Order
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Schedule Delivery
          </Button>
        </Box>
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

        {/* Create Order Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              This order will trigger production planning if inventory is insufficient
            </Alert>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Autocomplete
                  options={clients}
                  getOptionLabel={(option) => option.name}
                  value={selectedClient}
                  onChange={handleClientSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Client"
                      placeholder="Search existing clients..."
                      required
                    />
                  )}
                />
              </Grid>

              {selectedClient && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact Person"
                      value={newOrderForm.contactPerson}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={newOrderForm.phone}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      value={newOrderForm.address}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, address: e.target.value }))}
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Delivery Date"
                      value={newOrderForm.deliveryDate}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, deliveryDate: e.target.value }))}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Products
                    </Typography>
                    {newOrderForm.products.map((product, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                        <FormControl sx={{ minWidth: 200 }} size="small">
                          <InputLabel>Product</InputLabel>
                          <Select
                            value={product.id}
                            label="Product"
                            onChange={(e) => handleProductChange(index, 'id', e.target.value)}
                          >
                            <MenuItem value="">Select Product</MenuItem>
                            {products.map((prod) => (
                              <MenuItem key={prod.id} value={prod.id}>
                                {prod.name} (MZN {prod.price})
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          type="number"
                          label="Quantity"
                          size="small"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
                          sx={{ width: 100 }}
                          inputProps={{ min: 1 }}
                        />
                        <Button
                          color="error"
                          size="small"
                          onClick={() => handleRemoveProduct(index)}
                          disabled={newOrderForm.products.length === 1}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button
                      startIcon={<Add />}
                      onClick={handleAddProduct}
                      variant="outlined"
                      size="small"
                    >
                      Add Product
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Notes"
                      value={newOrderForm.notes}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                      multiline
                      rows={3}
                      placeholder="Special instructions or requirements..."
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleCreateOrder}
              disabled={!selectedClient || !newOrderForm.deliveryDate || newOrderForm.products.length === 0}
            >
              Create Order
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
};

export default Delivery;