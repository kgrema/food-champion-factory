import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { googleSheetsService } from '../../services/googleSheetsService';

const OrderForm = ({ open, onClose, onSave }) => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    productId: '',
    quantity: 1,
    deliveryDate: '',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const clientsData = await googleSheetsService.getClients();
    const productsData = await googleSheetsService.getProducts();
    setClients(clientsData);
    setProducts(productsData);
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Order</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Client</InputLabel>
              <Select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                label="Client"
              >
                {clients.map((client) => (
                  <MenuItem key={client.client_id} value={client.client_id}>
                    {client.client_name} - {client.location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                label="Product"
              >
                {products.map((product) => (
                  <MenuItem key={product.product_id} value={product.product_id}>
                    {product.product_name} - {product.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Delivery Date"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </Grid>
          
          {formData.productId && (
            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Order Summary
                </Typography>
                <Typography variant="body2">
                  Product: {products.find(p => p.product_id === formData.productId)?.product_name}
                </Typography>
                <Typography variant="body2">
                  Quantity: {formData.quantity}
                </Typography>
                <Typography variant="body2">
                  Price per unit: {products.find(p => p.product_id === formData.productId)?.price}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total: MZN {(
                    parseFloat(products.find(p => p.product_id === formData.productId)?.price?.replace('MZN', '') || 0) *
                    parseInt(formData.quantity)
                  ).toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Create Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderForm;