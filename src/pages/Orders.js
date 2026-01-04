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
  Stepper,
  Step,
  StepLabel,
  Alert,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Print,
  Email,
  LocalShipping,
  CheckCircle,
  Pending,
  ShoppingCart,
  Factory,
  Inventory as InventoryIcon,
  Warning,
} from '@mui/icons-material';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [productionCheckDialog, setProductionCheckDialog] = useState(false);
  const [inventoryStatus, setInventoryStatus] = useState(null);

  const orderSteps = ['Pending', 'Production Check', 'Processing', 'Ready', 'Delivered'];

  // Real order data from your business
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      client: 'China Mall',
      date: '2024-01-15',
      products: [
        { name: 'SAMOSSA24-BEEF', quantity: 5, price: 'MZN 225', total: 'MZN 1,125' },
        { name: 'SORVET5L-VANILLA', quantity: 2, price: 'MZN 800', total: 'MZN 1,600' },
      ],
      total: 'MZN 2,725',
      status: 'delivered',
      payment: 'Paid',
      deliveryId: 'DEL-001',
      needsProduction: false,
      productionStatus: 'not_required',
    },
    {
      id: 'ORD-002',
      client: 'VIP Spar Beira',
      date: '2024-01-15',
      products: [
        { name: 'SPRINGROLL24-FRANGO', quantity: 3, price: 'MZN 225', total: 'MZN 675' },
        { name: 'RESSOIS24-CAMARAO', quantity: 2, price: 'MZN 225', total: 'MZN 450' },
      ],
      total: 'MZN 1,125',
      status: 'processing',
      payment: 'Pending',
      deliveryId: 'DEL-002',
      needsProduction: true,
      productionStatus: 'pending',
    },
    {
      id: 'ORD-003',
      client: 'Supermercado Mil Tete',
      date: '2024-01-14',
      products: [
        { name: 'SORVET300ML-VANILLA', quantity: 20, price: 'MZN 75', total: 'MZN 1,500' },
        { name: 'SORVET300ML-CHOCOLATE', quantity: 15, price: 'MZN 75', total: 'MZN 1,125' },
      ],
      total: 'MZN 2,625',
      status: 'pending',
      payment: 'Pending',
      deliveryId: 'DEL-003',
      needsProduction: true,
      productionStatus: 'in_progress',
    },
    {
      id: 'ORD-004',
      client: 'Feliz Shopping',
      date: '2024-01-14',
      products: [
        { name: 'SAMOSSA12-BEEF', quantity: 10, price: 'MZN 155', total: 'MZN 1,550' },
        { name: 'SAMOSSA12-FRANGO', quantity: 10, price: 'MZN 155', total: 'MZN 1,550' },
      ],
      total: 'MZN 3,100',
      status: 'delivered',
      payment: 'Paid',
      deliveryId: 'DEL-004',
      needsProduction: false,
      productionStatus: 'completed',
    },
  ]);

  // Your products from CSV
  const products = [
    { id: 'SM12B', name: 'SAMOSSA12-BEEF', price: 'MZN 155.00', category: 'SAMOSSA 12Uni' },
    { id: 'SM12F', name: 'SAMOSSA12-FRANGO', price: 'MZN 155.00', category: 'SAMOSSA 12Uni' },
    { id: 'SM24B', name: 'SAMOSSA24-BEEF', price: 'MZN 225.00', category: 'SAMOSSA 24Uni' },
    { id: 'S300VN', name: 'SORVET300ML-VANILLA', price: 'MZN 75.00', category: 'SORVET 300ML' },
    { id: 'S5LVN', name: 'SORVET5L-VANILLA', price: 'MZN 800.00', category: 'SORVET 5L' },
    { id: 'SP24F', name: 'SPRINGROLL24-FRANGO', price: 'MZN 225.00', category: 'SPRING ROLL 24 Uni' },
    { id: 'RS24C', name: 'RESSOIS24-CAMARAO', price: 'MZN 225.00', category: 'RESSOIS 24 Uni' },
  ];

  // Inventory data (in real app, this would come from Inventory.js)
  const inventoryData = [
    { id: 'SMPLATES', name: '12 Uni SAMOSSA PLATE', stock: 6000, reorder: 1000 },
    { id: '1KGTRIGO', name: '1KG TRIGO', stock: 67, reorder: 20 },
    { id: 'WHEYPD', name: 'WHEY POWDER', stock: 100000, reorder: 25000 },
    { id: 'PLMFAT', name: '1KG PALM FAT', stock: 215, reorder: 25 },
    { id: 'LEITCOND', name: '500ML LEITE CONDENSADO', stock: 5, reorder: 6 },
    { id: 'CAMAPESCA', name: '1KG CAMARAO', stock: 0, reorder: 10 },
  ];

  const handleCreateOrder = () => {
    setOpenDialog(true);
  };

  const handleCheckProduction = (order) => {
    setSelectedOrder(order);
    // Simulate inventory check
    const status = {
      canProduce: false,
      missingItems: [],
      availableItems: [],
      needsProduction: true,
    };
    
    order.products.forEach(product => {
      // Find inventory item (simplified check)
      const inventoryItem = inventoryData.find(item => 
        item.name.includes(product.name.split('-')[0]) || 
        item.name.includes(product.name.toLowerCase())
      );
      
      if (inventoryItem && inventoryItem.stock >= product.quantity) {
        status.availableItems.push({
          product: product.name,
          required: product.quantity,
          available: inventoryItem.stock,
          status: 'available'
        });
      } else {
        status.missingItems.push({
          product: product.name,
          required: product.quantity,
          available: inventoryItem?.stock || 0,
          status: 'insufficient'
        });
        status.needsProduction = true;
      }
    });
    
    status.canProduce = status.missingItems.length === 0;
    setInventoryStatus(status);
    setProductionCheckDialog(true);
  };

  const handleStartProduction = () => {
    if (selectedOrder) {
      // Update order status
      const updatedOrders = orders.map(order => {
        if (order.id === selectedOrder.id) {
          return {
            ...order,
            needsProduction: true,
            productionStatus: 'in_progress',
            status: 'processing'
          };
        }
        return order;
      });
      setOrders(updatedOrders);
      
      // In real app, this would trigger Production.js
      alert(`Production has been scheduled for order ${selectedOrder.id}. Check Production module.`);
      setProductionCheckDialog(false);
    }
  };

  const getProductionStatusColor = (status) => {
    switch (status) {
      case 'not_required': return 'success';
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getProductionStatusText = (status) => {
    switch (status) {
      case 'not_required': return 'Not Required';
      case 'pending': return 'Pending';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Order Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleCreateOrder}>
          New Order
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search orders by ID, client, or status..."
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

        {/* Order Statistics */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5">{orders.length}</Typography>
                <Typography variant="caption" color="textSecondary">Total Orders</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
                <Typography variant="h5">{orders.filter(o => o.needsProduction).length}</Typography>
                <Typography variant="caption" color="textSecondary">Needs Production</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light' }}>
                <Typography variant="h5">{orders.filter(o => o.status === 'processing').length}</Typography>
                <Typography variant="caption" color="textSecondary">Processing</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                <Typography variant="h5">{orders.filter(o => o.status === 'delivered').length}</Typography>
                <Typography variant="caption" color="textSecondary">Delivered</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Orders Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Products</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Production</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{order.client}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Box>
                          {order.products.map((product, idx) => (
                            <Typography key={idx} variant="caption" display="block">
                              {product.quantity}x {product.name}
                            </Typography>
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">{order.total}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          color={
                            order.status === 'delivered'
                              ? 'success'
                              : order.status === 'processing'
                              ? 'info'
                              : 'warning'
                          }
                          icon={
                            order.status === 'delivered' ? (
                              <CheckCircle />
                            ) : order.status === 'processing' ? (
                              <LocalShipping />
                            ) : (
                              <Pending />
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {order.needsProduction ? (
                          <Tooltip title={getProductionStatusText(order.productionStatus)}>
                            <Badge
                              color={getProductionStatusColor(order.productionStatus)}
                              variant="dot"
                              sx={{ mr: 1 }}
                            >
                              <Chip
                                label={order.productionStatus === 'pending' ? 'Check Inventory' : getProductionStatusText(order.productionStatus)}
                                size="small"
                                color={getProductionStatusColor(order.productionStatus)}
                                icon={order.productionStatus === 'pending' ? <InventoryIcon /> : <Factory />}
                                onClick={order.productionStatus === 'pending' ? () => handleCheckProduction(order) : undefined}
                                clickable={order.productionStatus === 'pending'}
                              />
                            </Badge>
                          </Tooltip>
                        ) : (
                          <Chip label="Not Required" size="small" color="success" />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small">
                          <Print />
                        </IconButton>
                        {order.needsProduction && order.productionStatus === 'pending' && (
                          <IconButton 
                            size="small" 
                            color="warning"
                            onClick={() => handleCheckProduction(order)}
                            title="Check Inventory & Production"
                          >
                            <Factory />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Order Process Tracking */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Process Tracking
            </Typography>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {orderSteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box display="flex" justifyContent="space-between">
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => prev - 1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => setActiveStep((prev) => prev + 1)}
                disabled={activeStep === orderSteps.length - 1}
              >
                {activeStep === orderSteps.length - 1 ? 'Completed' : 'Next Step'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Production Check Dialog */}
      <Dialog open={productionCheckDialog} onClose={() => setProductionCheckDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Production Check for Order {selectedOrder?.id}
          <Typography variant="subtitle2" color="textSecondary">
            Client: {selectedOrder?.client}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {inventoryStatus && (
            <Box>
              <Alert 
                severity={inventoryStatus.canProduce ? "success" : "warning"} 
                sx={{ mb: 2 }}
                icon={inventoryStatus.canProduce ? <CheckCircle /> : <Warning />}
              >
                {inventoryStatus.canProduce 
                  ? "All products available in inventory. Ready to process order." 
                  : "Inventory check required for production planning."}
              </Alert>

              <Typography variant="subtitle1" gutterBottom>
                Inventory Status
              </Typography>
              
              <Grid container spacing={2}>
                {inventoryStatus.availableItems.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                      <Typography variant="subtitle2" color="success.dark" gutterBottom>
                        ✅ Available Items
                      </Typography>
                      {inventoryStatus.availableItems.map((item, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Typography variant="body2">{item.product}</Typography>
                          <Typography variant="caption">
                            Required: {item.required} | Available: {item.available}
                          </Typography>
                        </Box>
                      ))}
                    </Paper>
                  </Grid>
                )}

                {inventoryStatus.missingItems.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, bgcolor: 'warning.light' }}>
                      <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                        ⚠️ Items Requiring Production
                      </Typography>
                      {inventoryStatus.missingItems.map((item, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Typography variant="body2">{item.product}</Typography>
                          <Typography variant="caption">
                            Required: {item.required} | Available: {item.available} | Short: {item.required - item.available}
                          </Typography>
                        </Box>
                      ))}
                    </Paper>
                  </Grid>
                )}
              </Grid>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Production Recommendation
                </Typography>
                <Typography variant="body2">
                  {inventoryStatus.canProduce 
                    ? "No production needed. Order can be processed immediately."
                    : "Production planning required. Click 'Start Production Planning' to schedule manufacturing."}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductionCheckDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={inventoryStatus?.canProduce ? "success" : "warning"}
            startIcon={<Factory />}
            onClick={handleStartProduction}
          >
            {inventoryStatus?.canProduce ? 'Process Order' : 'Start Production Planning'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Order Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Order</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            This order will automatically trigger production check if inventory is insufficient
          </Alert>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select label="Client">
                  <MenuItem value="china-mall">China Mall</MenuItem>
                  <MenuItem value="vip-spar">VIP Spar Beira</MenuItem>
                  <MenuItem value="feliz-shopping">Feliz Shopping</MenuItem>
                  <MenuItem value="supermercado-mil">Supermercado Mil Tete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Delivery Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Select Products
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.slice(0, 3).map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <TextField type="number" size="small" defaultValue="0" />
                        </TableCell>
                        <TableCell>MZN 0</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="warning">
                Note: After creating this order, the production team will be notified to check inventory availability.
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;