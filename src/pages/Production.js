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
  LinearProgress,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Search,
  Add,
  PlayArrow,
  Pause,
  CheckCircle,
  Factory,
  Schedule,
  Warning,
  Inventory as InventoryIcon,
  LocalShipping,
  CalendarToday,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Production = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [productionDate, setProductionDate] = useState(new Date());
  const [activeStep, setActiveStep] = useState(0);

  const productionSteps = ['Scheduled', 'Raw Materials', 'Production', 'Quality Check', 'Packaging', 'Ready'];

  // Real production data from your CSV
  const productionBatches = [
    {
      id: 'BATCH-S5LVN-001',
      productId: 'S5LVN',
      productName: 'SORVET5L-VANILLA',
      recipe: 'S5LVN-RECIPE',
      quantity: 6,
      status: 'scheduled',
      productionDate: '2024-01-16',
      shelfLife: '6 months',
      producedBy: '',
      completionDate: '',
      materials: [
        { name: 'AGUA', required: '33.33 L', available: 'Sufficient' },
        { name: 'LID5L', required: '19 pcs', available: 'Sufficient' },
        { name: '5LTAB', required: '19 pcs', available: 'Sufficient' },
        { name: 'PLMFAT', required: '0.45 kg', available: 'Low' },
        { name: 'WHEYPD', required: '1.20 kg', available: 'Sufficient' },
      ],
    },
    {
      id: 'BATCH-S5LCH-001',
      productId: 'S5LCH',
      productName: 'SORVET5L-CHOCOLATE',
      recipe: 'S5LCH-RECIPE',
      quantity: 6,
      status: 'in-progress',
      productionDate: '2024-01-16',
      shelfLife: '6 months',
      producedBy: 'Production Team A',
      completionDate: '',
      materials: [
        { name: 'AGUA', required: '33.33 L', available: 'Sufficient' },
        { name: 'LID5L', required: '19 pcs', available: 'Sufficient' },
        { name: '5LTAB', required: '19 pcs', available: 'Sufficient' },
        { name: 'PLMFAT', required: '0.45 kg', available: 'Low' },
        { name: 'WHEYPD', required: '1.20 kg', available: 'Sufficient' },
        { name: 'CHOCFLVOR', required: '0.60 kg', available: 'Sufficient' },
      ],
    },
    {
      id: 'BATCH-S5LMA-001',
      productId: 'S5LMA',
      productName: 'SORVET5L-MARACUJA',
      recipe: 'S5LMA-RECIPE',
      quantity: 6,
      status: 'completed',
      productionDate: '2024-01-15',
      shelfLife: '6 months',
      producedBy: 'Production Team B',
      completionDate: '2024-01-15',
      materials: [
        { name: 'AGUA', required: '33.33 L', available: 'Sufficient' },
        { name: 'LID5L', required: '19 pcs', available: 'Sufficient' },
        { name: '5LTAB', required: '19 pcs', available: 'Sufficient' },
        { name: 'PLMFAT', required: '0.45 kg', available: 'Low' },
        { name: 'WHEYPD', required: '1.20 kg', available: 'Sufficient' },
        { name: 'MARCFLVOR', required: '0.05 kg', available: 'Sufficient' },
      ],
    },
    {
      id: 'BATCH-S5LBL-001',
      productId: 'S5LBL',
      productName: 'SORVET5L-BLUEBERRY',
      recipe: 'S5LBL-RECIPE',
      quantity: 1,
      status: 'scheduled',
      productionDate: '2024-01-17',
      shelfLife: '6 months',
      producedBy: '',
      completionDate: '',
      materials: [
        { name: 'AGUA', required: '33.33 L', available: 'Sufficient' },
        { name: 'LID5L', required: '19 pcs', available: 'Sufficient' },
        { name: '5LTAB', required: '19 pcs', available: 'Sufficient' },
        { name: 'PLMFAT', required: '0.45 kg', available: 'Low' },
        { name: 'WHEYPD', required: '1.20 kg', available: 'Sufficient' },
        { name: 'MXBRYFLVOR', required: '0.05 kg', available: 'Critical' },
      ],
    },
  ];

  // Products available for production
  const products = [
    { id: 'S5LVN', name: 'SORVET5L-VANILLA', category: 'Ice Cream 5L', recipe: 'S5LVN-RECIPE' },
    { id: 'S5LCH', name: 'SORVET5L-CHOCOLATE', category: 'Ice Cream 5L', recipe: 'S5LCH-RECIPE' },
    { id: 'S5LMA', name: 'SORVET5L-MARACUJA', category: 'Ice Cream 5L', recipe: 'S5LMA-RECIPE' },
    { id: 'S5LBL', name: 'SORVET5L-BLUEBERRY', category: 'Ice Cream 5L', recipe: 'S5LBL-RECIPE' },
    { id: 'SM24B', name: 'SAMOSSA24-BEEF', category: 'Samossa 24Uni', recipe: 'MASSACHM-RECIPE' },
    { id: 'SP24F', name: 'SPRINGROLL24-FRANGO', category: 'Spring Roll 24Uni', recipe: 'MASSASPRL-RECIPE' },
  ];

  const handleStartBatch = (batchId) => {
    console.log('Starting batch:', batchId);
  };

  const handleCompleteBatch = (batchId) => {
    console.log('Completing batch:', batchId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'scheduled': return 'info';
      case 'delayed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'in-progress': return <PlayArrow />;
      case 'scheduled': return <Schedule />;
      default: return <Warning />;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Production Management</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Schedule Batch
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Search and Date */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search batches by ID, product, or status..."
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
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Production Date"
                    value={productionDate}
                    onChange={setProductionDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Production Stats */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Factory sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h5">24</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Batches Today
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="h5">18</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Completed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <PlayArrow sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                    <Typography variant="h5">4</Typography>
                    <Typography variant="caption" color="textSecondary">
                      In Progress
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Schedule sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                    <Typography variant="h5">2</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Scheduled
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Production Batches Table */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Production Batches
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Batch ID</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Shelf Life</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productionBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {batch.id}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {batch.productionDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{batch.productName}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              Recipe: {batch.recipe}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {batch.quantity} units
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={batch.status}
                            size="small"
                            color={getStatusColor(batch.status)}
                            icon={getStatusIcon(batch.status)}
                          />
                          {batch.producedBy && (
                            <Typography variant="caption" display="block">
                              By: {batch.producedBy}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{batch.shelfLife}</TableCell>
                        <TableCell>
                          {batch.status === 'scheduled' && (
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<PlayArrow />}
                              onClick={() => handleStartBatch(batch.id)}
                            >
                              Start
                            </Button>
                          )}
                          {batch.status === 'in-progress' && (
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<CheckCircle />}
                              onClick={() => handleCompleteBatch(batch.id)}
                            >
                              Complete
                            </Button>
                          )}
                          {batch.status === 'completed' && (
                            <Button size="small" variant="outlined" startIcon={<LocalShipping />}>
                              To Delivery
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Production Process */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Production Process
              </Typography>
              <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 3 }}>
                {productionSteps.map((label, index) => (
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
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  disabled={activeStep === productionSteps.length - 1}
                >
                  {activeStep === productionSteps.length - 1 ? 'Process Complete' : 'Next Step'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Material Requirements */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Material Requirements for Next Batch
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Material</TableCell>
                      <TableCell>Required</TableCell>
                      <TableCell>Available</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productionBatches[0].materials.map((material, index) => (
                      <TableRow key={index}>
                        <TableCell>{material.name}</TableCell>
                        <TableCell>{material.required}</TableCell>
                        <TableCell>
                          <Chip
                            label={material.available}
                            size="small"
                            color={
                              material.available === 'Sufficient'
                                ? 'success'
                                : material.available === 'Low'
                                ? 'warning'
                                : 'error'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {material.available === 'Sufficient' ? (
                            <CheckCircle fontSize="small" color="success" />
                          ) : (
                            <Warning fontSize="small" color="warning" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<InventoryIcon />}
                sx={{ mt: 2 }}
              >
                Check All Materials
              </Button>
            </Paper>
          </Grid>

          {/* Production Lines Status */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Production Lines Status
              </Typography>
              <Grid container spacing={2}>
                {['Ice Cream Line', 'Samossa Line', 'Spring Roll Line', 'Packaging Line'].map((line) => (
                  <Grid item xs={12} sm={6} md={3} key={line}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          {line}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={75}
                          sx={{ height: 8, borderRadius: 4, mb: 1 }}
                        />
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="caption" color="textSecondary">
                            75% Capacity
                          </Typography>
                          <Chip label="Running" size="small" color="success" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Schedule Batch Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Schedule Production Batch</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Product</InputLabel>
                  <Select label="Select Product">
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name} ({product.category})
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
                  defaultValue="1"
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Production Date"
                  value={productionDate}
                  onChange={setProductionDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  placeholder="Any special instructions..."
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              Schedule Batch
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Production;