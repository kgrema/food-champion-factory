import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Button,
  Avatar,
  Badge,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
  LocalShipping,
  Factory,
  Warning,
  CheckCircle,
  AttachMoney,
  Inventory,
  Store,
  RestaurantMenu,
  Icecream,
  Fastfood,
  LocalDining,
  Assessment,
  Refresh,
  Download,
  FilterList,
  CalendarToday,
  MoreVert,
  Notifications,
  Dashboard as DashboardIcon,
  ArrowUpward,
  ArrowDownward,
  Schedule,
  BusinessCenter,
  LocationOn,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));
  const [notifications, setNotifications] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced KPI Cards with real-time data
  const kpiCards = [
    {
      title: 'Total Revenue',
      value: 'MZN 578,900',
      icon: <AttachMoney sx={{ fontSize: 30 }} />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      change: '+15.2%',
      trend: 'up',
      details: 'This month',
      link: '/sales'
    },
    {
      title: 'Active Clients',
      value: '89',
      icon: <People sx={{ fontSize: 30 }} />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      change: '+8.7%',
      trend: 'up',
      details: '12 new this month',
      link: '/clients'
    },
    {
      title: 'Today Production',
      value: '48 batches',
      icon: <Factory sx={{ fontSize: 30 }} />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      change: '+12.5%',
      trend: 'up',
      details: 'On schedule',
      link: '/production'
    },
    {
      title: 'Pending Orders',
      value: '23',
      icon: <ShoppingCart sx={{ fontSize: 30 }} />,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      change: '-5.3%',
      trend: 'down',
      details: '3 urgent',
      link: '/orders'
    },
    {
      title: 'Deliveries Today',
      value: '18',
      icon: <LocalShipping sx={{ fontSize: 30 }} />,
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      change: '+22.4%',
      trend: 'up',
      details: '1 delayed',
      link: '/deliveries'
    },
    {
      title: 'Low Stock Alert',
      value: '7 items',
      icon: <Warning sx={{ fontSize: 30 }} />,
      color: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      change: '+2',
      trend: 'up',
      details: 'Need restocking',
      link: '/inventory'
    },
  ];

  // Sales data with projections
  const salesData = [
    { month: 'Jan', sales: 85000, orders: 124, target: 90000, profit: 32000 },
    { month: 'Feb', sales: 92000, orders: 138, target: 95000, profit: 35600 },
    { month: 'Mar', sales: 108000, orders: 156, target: 105000, profit: 41200 },
    { month: 'Apr', sales: 125000, orders: 178, target: 120000, profit: 47800 },
    { month: 'May', sales: 142000, orders: 201, target: 135000, profit: 54300 },
    { month: 'Jun', sales: 158000, orders: 224, target: 150000, profit: 60500 },
    { month: 'Jul', sales: 175000, orders: 245, target: 170000, profit: 66800 },
    { month: 'Aug', sales: 192000, orders: 267, target: 185000, profit: 73400 },
  ];

  // Enhanced product distribution
  const productDistribution = [
    { name: 'Samossas', value: 35, color: '#0088FE', revenue: 189000, growth: 12.5 },
    { name: 'Spring Rolls', value: 25, color: '#00C49F', revenue: 135000, growth: 8.2 },
    { name: 'Sorvetes 300ml', value: 20, color: '#FFBB28', revenue: 108000, growth: 15.3 },
    { name: 'Sorvetes 5L', value: 15, color: '#FF8042', revenue: 81000, growth: 5.7 },
    { name: 'Recheios', value: 5, color: '#8884D8', revenue: 27000, growth: -2.1 },
  ];

  // Top performing products
  const topProducts = [
    { id: 1, name: 'Sorvete Chocolate 5L', sales: 32000, orders: 40, rating: 4.9, category: 'Sorvetes 5L' },
    { id: 2, name: 'Samossa Carne Picante', sales: 28000, orders: 35, rating: 4.8, category: 'Samossas' },
    { id: 3, name: 'Spring Roll Vegetariano', sales: 24000, orders: 30, rating: 4.7, category: 'Spring Rolls' },
    { id: 4, name: 'Recheio Frango Especial', sales: 18000, orders: 25, rating: 4.6, category: 'Recheios' },
    { id: 5, name: 'Sorvete Baunilha 300ml', sales: 15000, orders: 50, rating: 4.8, category: 'Sorvetes 300ml' },
  ];

  // Recent activities with priorities
  const recentActivities = [
    { 
      id: 1, 
      action: 'New bulk order from Hotel Embaixador', 
      time: '2 hours ago', 
      status: 'pending',
      priority: 'high',
      amount: 'MZN 12,500'
    },
    { 
      id: 2, 
      action: 'Production batch S5LVN-2024 completed', 
      time: '4 hours ago', 
      status: 'completed',
      priority: 'medium',
      details: '48 units ready'
    },
    { 
      id: 3, 
      action: 'Delivery to Chimoio delayed - weather conditions', 
      time: '5 hours ago', 
      status: 'delayed',
      priority: 'high',
      details: 'ETA: +3 hours'
    },
    { 
      id: 4, 
      action: 'Low stock alert: 1KG TRIGO flour', 
      time: '1 day ago', 
      status: 'warning',
      priority: 'high',
      details: 'Only 12 units left'
    },
    { 
      id: 5, 
      action: 'New client registered: VIP Spar Beira', 
      time: '2 days ago', 
      status: 'success',
      priority: 'medium',
      details: 'Monthly contract signed'
    },
    { 
      id: 6, 
      action: 'Quality inspection passed - Batch SPR-024', 
      time: '3 days ago', 
      status: 'completed',
      priority: 'low',
      details: 'All parameters met'
    },
  ];

  // Production progress with batches
  const productionBatches = [
    { id: 'S5LVN-2024', product: 'Sorvete 5L Vanilla', progress: 85, units: 48, dueDate: '2024-01-20', status: 'in-progress' },
    { id: 'S5LCH-2024', product: 'Sorvete 5L Chocolate', progress: 60, units: 48, dueDate: '2024-01-21', status: 'in-progress' },
    { id: 'S5LMA-2024', product: 'Sorvete 5L Mango', progress: 30, units: 36, dueDate: '2024-01-22', status: 'in-progress' },
    { id: 'S5LBL-2024', product: 'Sorvete 5L Blueberry', progress: 95, units: 48, dueDate: '2024-01-19', status: 'almost-done' },
  ];

  // Sales by location
  const salesByLocation = [
    { location: 'Beira', sales: 189000, clients: 45, growth: 15.2, deliveries: 120 },
    { location: 'Chimoio', sales: 125000, clients: 28, growth: 8.7, deliveries: 85 },
    { location: 'Tete', sales: 98000, clients: 22, growth: 12.3, deliveries: 65 },
    { location: 'Manga', sales: 45000, clients: 12, growth: 5.4, deliveries: 40 },
    { location: 'Songo', sales: 32000, clients: 8, growth: 20.1, deliveries: 25 },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Typography variant="subtitle2" fontWeight="bold">{label}</Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('MZN') ? `MZN ${entry.value.toLocaleString()}` : entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    // Export logic
    console.log('Exporting dashboard data...');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'success':
        return <CheckCircle fontSize="small" color="success" />;
      case 'warning':
        return <Warning fontSize="small" color="warning" />;
      case 'delayed':
        return <Schedule fontSize="small" color="error" />;
      default:
        return <Schedule fontSize="small" color="action" />;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Food Champion Factory Dashboard
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Real-time overview of production, sales, and operations
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Badge badgeContent={notifications} color="error">
              <IconButton>
                <Notifications />
              </IconButton>
            </Badge>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleExport}
            >
              Export
            </Button>
          </Box>
        </Box>

        {/* Filters Section */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  label="Time Range"
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="From"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="To"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                size="large"
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* KPI Cards */}
        <Grid container spacing={3} mb={3}>
          {kpiCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                }
              }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Avatar sx={{ 
                      bgcolor: 'transparent',
                      background: card.color,
                      width: 48,
                      height: 48
                    }}>
                      {card.icon}
                    </Avatar>
                    <Chip
                      label={card.change}
                      size="small"
                      color={card.trend === 'up' ? 'success' : 'error'}
                      icon={card.trend === 'up' ? <ArrowUpward /> : <ArrowDownward />}
                    />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {card.details}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Charts Section */}
        <Grid container spacing={3} mb={3}>
          {/* Sales Trend Chart */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Sales Performance Overview
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Monthly revenue, orders, and profit trends
                  </Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Chip label="Revenue" size="small" sx={{ bgcolor: '#8884d820' }} />
                  <Chip label="Orders" size="small" sx={{ bgcolor: '#82ca9d20' }} />
                  <Chip label="Profit" size="small" sx={{ bgcolor: '#ff804220' }} />
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="target" fill="#8884d8" stroke="#8884d8" fillOpacity={0.1} name="Target (MZN)" />
                  <Bar yAxisId="left" dataKey="sales" fill="#0088FE" name="Sales (MZN)" />
                  <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#FF8042" strokeWidth={2} name="Profit (MZN)" />
                  <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#00C49F" strokeWidth={2} name="Orders" />
                </ComposedChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Product Distribution & Top Products */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Product Distribution
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                {productDistribution.map((product, index) => (
                  <Tooltip key={index} title={`${product.name}: ${product.value}%`}>
                    <Box
                      sx={{
                        width: `${product.value}%`,
                        height: 8,
                        bgcolor: product.color,
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.8 }
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={productDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {productDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value, name, props) => [
                    `${value}%`,
                    props.payload.name,
                  ]} />
                </PieChart>
              </ResponsiveContainer>
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Top Products
                </Typography>
                <List dense>
                  {topProducts.map((product) => (
                    <ListItem key={product.id} divider>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: `${productDistribution.find(p => p.name === product.category)?.color}20` }}>
                          {product.category.includes('Sorvete') ? <Icecream /> : 
                           product.category.includes('Samossa') ? <Fastfood /> : 
                           product.category.includes('Spring') ? <LocalDining /> : 
                           <RestaurantMenu />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.name}
                        secondary={`${product.orders} orders • ⭐ ${product.rating}`}
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="body2" fontWeight="bold">
                          MZN {product.sales.toLocaleString()}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Grid container spacing={3}>
          {/* Recent Activities */}
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Activities
                </Typography>
                <Button size="small" endIcon={<MoreVert />}>
                  View All
                </Button>
              </Box>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem 
                    key={activity.id} 
                    alignItems="flex-start"
                    sx={{
                      borderLeft: 3,
                      borderColor: getPriorityColor(activity.priority),
                      mb: 1,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemAvatar>
                      {getStatusIcon(activity.status)}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="medium">
                          {activity.action}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="caption" color="textSecondary" display="block">
                            {activity.time}
                          </Typography>
                          {activity.details && (
                            <Typography variant="caption" color="textSecondary">
                              {activity.details}
                            </Typography>
                          )}
                          {activity.amount && (
                            <Typography variant="caption" color="primary" fontWeight="bold">
                              {activity.amount}
                            </Typography>
                          )}
                        </>
                      }
                    />
                    <Chip
                      label={activity.status}
                      size="small"
                      color={
                        activity.status === 'completed' || activity.status === 'success'
                          ? 'success'
                          : activity.status === 'warning'
                          ? 'warning'
                          : activity.status === 'delayed'
                          ? 'error'
                          : 'default'
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Production Progress & Location Sales */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              {/* Production Progress */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Production Progress
                    </Typography>
                    <Chip label="4 Active Batches" size="small" color="primary" />
                  </Box>
                  {productionBatches.map((batch) => (
                    <Box key={batch.id} mb={3}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {batch.id}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {batch.product} • {batch.units} units
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="bold" color="primary">
                          {batch.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={batch.progress} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: batch.progress > 90 ? '#4caf50' : 
                                    batch.progress > 70 ? '#2196f3' : 
                                    batch.progress > 40 ? '#ff9800' : '#f44336'
                          }
                        }} 
                      />
                      <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="caption" color="textSecondary">
                          Due: {batch.dueDate}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Status: {batch.status}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Grid>

              {/* Sales by Location */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Sales by Location
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={salesByLocation}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="location" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => [`MZN ${value.toLocaleString()}`, 'Sales']} />
                      <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <Grid container spacing={1} mt={2}>
                    {salesByLocation.map((location, index) => (
                      <Grid item xs={6} key={index}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center" gap={1}>
                            <LocationOn fontSize="small" color="action" />
                            <Typography variant="body2">{location.location}</Typography>
                          </Box>
                          <Chip
                            label={`${location.growth}%`}
                            size="small"
                            color={location.growth > 0 ? 'success' : 'error'}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Quick Stats Footer */}
        <Paper sx={{ p: 2, mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h6" color="primary" fontWeight="bold">
                  94.2%
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Order Accuracy
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h6" color="primary" fontWeight="bold">
                  2.4h
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Avg Delivery Time
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h6" color="primary" fontWeight="bold">
                  4.7/5
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Client Satisfaction
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h6" color="primary" fontWeight="bold">
                  98.5%
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Production Efficiency
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard;