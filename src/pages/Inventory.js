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
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Search,
  Add,
  Warning,
  CheckCircle,
  Inventory as InventoryIcon,
  ShoppingBag,
  LocalShipping,
  TrendingDown,
  TrendingUp,
  Edit,
} from '@mui/icons-material';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  // Real inventory data from your CSV
  const inventoryItems = [
    {
      id: 'SMPLATES',
      name: '12 Uni SAMOSSA PLATE',
      category: 'Packaging',
      supplier: 'TAO',
      unitCost: 'MZN 3.50',
      stock: 6000,
      reorder: 1000,
      expiry: 'No',
      status: 'sufficient',
      lastOrdered: '2024-01-10',
      usageRate: 'High',
    },
    {
      id: '1KGTRIGO',
      name: '1KG TRIGO',
      category: 'Raw Material',
      supplier: 'PEMBE',
      unitCost: 'MZN 75.00',
      stock: 67,
      reorder: 20,
      expiry: 'Yes',
      expiryDate: '2024-06-30',
      status: 'low',
      lastOrdered: '2024-01-12',
      usageRate: 'Very High',
    },
    {
      id: 'WHEYPD',
      name: 'WHEY POWDER',
      category: 'Raw Material',
      supplier: 'NOVA SOL',
      unitCost: 'MZN 81.63',
      stock: 100000,
      reorder: 25000,
      expiry: 'Yes',
      expiryDate: '2024-12-31',
      status: 'sufficient',
      lastOrdered: '2024-01-05',
      usageRate: 'High',
    },
    {
      id: 'PLMFAT',
      name: '1KG PALM FAT',
      category: 'Raw Material',
      supplier: 'NOVA SOL',
      unitCost: 'MZN 68.18',
      stock: 215,
      reorder: 25,
      expiry: 'Yes',
      expiryDate: '2024-09-30',
      status: 'sufficient',
      lastOrdered: '2024-01-08',
      usageRate: 'High',
    },
    {
      id: 'LEITCOND',
      name: '500ML LEITE CONDENSADO',
      category: 'Dairy',
      supplier: 'MELHOR',
      unitCost: 'MZN 75.00',
      stock: 5,
      reorder: 6,
      expiry: 'Yes',
      expiryDate: '2024-03-15',
      status: 'critical',
      lastOrdered: '2024-01-15',
      usageRate: 'Very High',
    },
    {
      id: 'CAMAPESCA',
      name: '1KG CAMARAO',
      category: 'Seafood',
      supplier: 'PESCAMAR',
      unitCost: 'MZN 600.00',
      stock: 0,
      reorder: 10,
      expiry: 'Yes',
      expiryDate: '2024-02-28',
      status: 'out-of-stock',
      lastOrdered: '2024-01-14',
      usageRate: 'Medium',
    },
    {
      id: 'PETFRANCO',
      name: '1KG PEITO DE FRANGO',
      category: 'Meat',
      supplier: 'ABILIO ANTUNES',
      unitCost: 'MZN 275.00',
      stock: 6,
      reorder: 2,
      expiry: 'Yes',
      expiryDate: '2024-01-25',
      status: 'critical',
      lastOrdered: '2024-01-13',
      usageRate: 'High',
    },
    {
      id: 'VA300MLICSTKER',
      name: 'VANILLA 300ML ICE-CREAM STICKER',
      category: 'Packaging',
      supplier: 'TAO',
      unitCost: 'MZN 1.53',
      stock: 4000,
      reorder: 500,
      expiry: 'No',
      status: 'sufficient',
      lastOrdered: '2024-01-09',
      usageRate: 'Medium',
    },
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'critical') return matchesSearch && item.status === 'critical';
    if (filter === 'low') return matchesSearch && item.status === 'low';
    if (filter === 'out') return matchesSearch && item.status === 'out-of-stock';
    if (filter === 'expiring') return matchesSearch && item.expiry === 'Yes' && 
      new Date(item.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return matchesSearch;
  });

  const getStockPercentage = (stock, reorder) => {
    const maxStock = reorder * 5; // Assuming max stock is 5x reorder point
    return Math.min(100, (stock / maxStock) * 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sufficient': return 'success';
      case 'low': return 'warning';
      case 'critical': return 'error';
      case 'out-of-stock': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sufficient': return <CheckCircle />;
      default: return <Warning />;
    }
  };

  const getUsageColor = (rate) => {
    switch (rate) {
      case 'Very High': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const stats = {
    total: inventoryItems.length,
    critical: inventoryItems.filter(m => m.status === 'critical').length,
    low: inventoryItems.filter(m => m.status === 'low').length,
    out: inventoryItems.filter(m => m.status === 'out-of-stock').length,
    expiring: inventoryItems.filter(m => 
      m.expiry === 'Yes' && new Date(m.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  const handleReorder = (item) => {
    setSelectedItem(item);
    // In real app, this would create a purchase order
    alert(`Reorder request created for ${item.name}. Contact supplier: ${item.supplier}`);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Inventory Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
          Add New Item
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
                  placeholder="Search inventory by name, ID, or category..."
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
                    <MenuItem value="all">All Items</MenuItem>
                    <MenuItem value="critical">Critical Stock</MenuItem>
                    <MenuItem value="low">Low Stock</MenuItem>
                    <MenuItem value="out">Out of Stock</MenuItem>
                    <MenuItem value="expiring">Expiring Soon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Critical Alerts */}
        {(stats.critical > 0 || stats.out > 0) && (
          <Grid item xs={12}>
            <Alert severity="error" icon={<Warning />}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">
                  {stats.critical} items at critical level, {stats.out} items out of stock
                </Typography>
                <Button color="inherit" size="small" variant="outlined">
                  View All Alerts
                </Button>
              </Box>
            </Alert>
          </Grid>
        )}

        {/* Statistics */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <InventoryIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5">{stats.total}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Total Items
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Warning sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                  <Typography variant="h5" color="error.main">{stats.critical}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Critical
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Warning sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h5" color="warning.main">{stats.low}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Low Stock
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <ShoppingBag sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                  <Typography variant="h5" color="info.main">{stats.expiring}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Expiring Soon
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Inventory Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inventory Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Material ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Current Stock</TableCell>
                    <TableCell>Reorder Point</TableCell>
                    <TableCell>Stock Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {item.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{item.name}</Typography>
                          {item.expiry === 'Yes' && item.expiryDate && (
                            <Typography variant="caption" color="textSecondary">
                              Expires: {item.expiryDate}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={item.category} size="small" />
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.stock.toLocaleString()}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          Usage: <Chip label={item.usageRate} size="small" color={getUsageColor(item.usageRate)} />
                        </Typography>
                      </TableCell>
                      <TableCell>{item.reorder.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={getStockPercentage(item.stock, item.reorder)}
                              color={getStatusColor(item.status)}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                          <Typography variant="body2">
                            {getStockPercentage(item.stock, item.reorder).toFixed(0)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status.replace('-', ' ').toUpperCase()}
                          size="small"
                          color={getStatusColor(item.status)}
                          icon={getStatusIcon(item.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<LocalShipping />}
                          onClick={() => handleReorder(item)}
                          color={item.status === 'critical' || item.status === 'out-of-stock' ? 'error' : 'primary'}
                        >
                          Reorder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Critical Stock Section */}
        {stats.critical > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, border: '2px solid', borderColor: 'error.main' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Warning sx={{ mr: 1, color: 'error.main' }} />
                <Typography variant="h6" color="error.main">
                  Critical Stock Items - Immediate Action Required
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {inventoryItems
                  .filter(m => m.status === 'critical' || m.status === 'out-of-stock')
                  .map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card variant="outlined" sx={{ borderColor: 'error.main' }}>
                        <CardContent>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" display="block">
                            ID: {item.id}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Current: {item.stock} | Required: {item.reorder}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Supplier: {item.supplier}
                          </Typography>
                          {item.expiryDate && (
                            <Typography variant="caption" color="error" display="block">
                              ⚠️ Expires: {item.expiryDate}
                            </Typography>
                          )}
                          <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            color="error"
                            sx={{ mt: 1 }}
                            startIcon={<LocalShipping />}
                            onClick={() => handleReorder(item)}
                          >
                            Order Urgently
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Paper>
          </Grid>
        )}

        {/* Supplier Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Supplier Contacts
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Items Supplied</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { supplier: 'TAO', contact: 'tao@supplier.com | +258 84 111 1111', items: 12, rating: 4.8 },
                    { supplier: 'NOVA SOL', contact: 'novasol@supplier.com | +258 84 222 2222', items: 8, rating: 4.7 },
                    { supplier: 'PEMBE', contact: 'pembe@supplier.com | +258 84 333 3333', items: 4, rating: 4.3 },
                    { supplier: 'PESCAMAR', contact: 'pescamar@supplier.com | +258 84 444 4444', items: 3, rating: 4.6 },
                  ].map((supplier, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {supplier.supplier}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{supplier.contact}</Typography>
                      </TableCell>
                      <TableCell>{supplier.items}</TableCell>
                      <TableCell>
                        <Chip label={`${supplier.rating}/5`} size="small" color="primary" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Inventory Value */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inventory Value by Category
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { category: 'Packaging', value: 45000, items: 15, trend: 'up' },
                { category: 'Raw Ingredients', value: 120000, items: 25, trend: 'stable' },
                { category: 'Dairy Products', value: 65000, items: 12, trend: 'down' },
                { category: 'Meat & Seafood', value: 95000, items: 8, trend: 'stable' },
                { category: 'Spices & Flavors', value: 85000, items: 18, trend: 'up' },
              ].map((item) => (
                <Box key={item.category} sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{item.category}</Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" fontWeight="bold">
                        MZN {item.value.toLocaleString()}
                      </Typography>
                      {item.trend === 'up' ? (
                        <TrendingUp sx={{ fontSize: 16, color: 'success.main', ml: 1 }} />
                      ) : item.trend === 'down' ? (
                        <TrendingDown sx={{ fontSize: 16, color: 'error.main', ml: 1 }} />
                      ) : null}
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(item.value / 200000) * 100}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    {item.items} items
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Add New Item Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Inventory Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Material ID" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Material Name" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="packaging">Packaging</MenuItem>
                  <MenuItem value="raw-material">Raw Material</MenuItem>
                  <MenuItem value="dairy">Dairy</MenuItem>
                  <MenuItem value="meat">Meat</MenuItem>
                  <MenuItem value="seafood">Seafood</MenuItem>
                  <MenuItem value="spices">Spices & Flavors</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Supplier" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Unit Cost" type="number" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Initial Stock" type="number" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Reorder Point" type="number" required />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Track Expiry Date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory;