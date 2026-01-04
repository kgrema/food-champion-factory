import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Box,
  Chip,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  CardActions,
  TablePagination,
  FormGroup,
  Checkbox,
  FormControlLabel,
  alpha,
  LinearProgress,
  Fade,
  Zoom,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import WarningIcon from '@mui/icons-material/Warning';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import RefreshIcon from '@mui/icons-material/Refresh';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../context/AuthContext';
import { format, parseISO, addDays, differenceInDays, isBefore, subDays } from 'date-fns';
import { styled } from '@mui/material/styles';

// ==================== STYLED COMPONENTS ====================
const PremiumCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0,0,0,0.3)'
    : '0 8px 32px rgba(0,0,0,0.05)',
  border: theme.palette.mode === 'dark' 
    ? '1px solid rgba(255,255,255,0.05)' 
    : '1px solid rgba(0,0,0,0.02)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 48px rgba(0,0,0,0.4)'
      : '0 12px 48px rgba(0,0,0,0.08)',
  }
}));

const StatCard = styled(Card)(({ theme }) => ({
  borderRadius: '14px',
  padding: theme.spacing(2),
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)',
  }
}));
// Updated Sales.js - Adding order linking functionality

// Add this function to parse orders from Orders.js data
const parseOrdersData = () => {
  return [
    {
      id: 'ORD-001',
      client: 'China Mall',
      date: '2024-01-15',
      products: [
        { name: 'SAMOSSA24-BEEF', quantity: 5, price: 'MZN 225', total: 'MZN 1,125' },
        { name: 'SORVET5L-VANILLA', quantity: 2, price: 'MZN 800', total: 'MZN 1,600' },
      ],
      total: 'MZN 2,725',
      status: 'pending',
      payment: 'Pending',
      deliveryId: null,
      needsProduction: false,
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
      deliveryId: null,
      needsProduction: true,
    },
    // Add more orders...
  ];
};

// In the Sales component, add state for orders
const [orders, setOrders] = useState(parseOrdersData());
const [selectedOrder, setSelectedOrder] = useState(null);

// In the "Create New Invoice" dialog, add order selection field:
const handleClientSelectForInvoice = (clientName) => {
  const clientData = uniqueClients.find(c => c.name === clientName);
  if (clientData) {
    // Find pending orders for this client
    const clientOrders = orders.filter(order => 
      order.client === clientName && 
      order.status === 'pending' && 
      !order.saleId
    );
    
    setSaleForm(prev => ({
      ...prev,
      client: clientData.name,
      clientId: clientData.id,
      clientType: clientData.category || '',
      contactPerson: clientData.contactPerson || '',
      phone: clientData.phone || '',
      email: clientData.email || '',
      availableOrders: clientOrders
    }));
  }
};

// In the "Create New Invoice" dialog form, add this field after client selection:
<Grid item xs={12}>
  <FormControl fullWidth>
    <InputLabel>Link to Order (Optional)</InputLabel>
    <Select
      value={saleForm.linkedOrderId || ''}
      onChange={(e) => {
        const orderId = e.target.value;
        setSelectedOrder(orders.find(o => o.id === orderId));
        setSaleForm(prev => ({ ...prev, linkedOrderId: orderId }));
      }}
      label="Link to Order (Optional)"
    >
      <MenuItem value="">No Order Link</MenuItem>
      {saleForm.availableOrders?.map((order) => (
        <MenuItem key={order.id} value={order.id}>
          {order.id} - {order.client} (MZN {order.total})
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  {selectedOrder && (
    <Alert severity="info" sx={{ mt: 1 }}>
      Order {selectedOrder.id} selected. Total: {selectedOrder.total}
    </Alert>
  )}
</Grid>

// Update handleAddSale function to link sale to order
const handleAddSale = () => {
  if (!saleForm.clientId || saleForm.products.some(p => !p.id || p.quantity <= 0)) {
    setSnackbar({
      open: true,
      message: 'Please fill in all required fields and add at least one product',
      severity: 'error'
    });
    return;
  }

  setLoading(true);
  setTimeout(() => {
    // ... existing sale creation code ...

    // If linked to an order, update order status
    if (saleForm.linkedOrderId) {
      const updatedOrders = orders.map(order => {
        if (order.id === saleForm.linkedOrderId) {
          return {
            ...order,
            status: 'processing',
            saleId: newSale.id,
            payment: saleForm.paymentAmount >= totalAmount ? 'Paid' : 'Pending'
          };
        }
        return order;
      });
      setOrders(updatedOrders);
      
      setSnackbar({
        open: true,
        message: `Invoice created and linked to order ${saleForm.linkedOrderId}. Production team notified.`,
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        message: `Invoice created successfully! Guide #${guideNumber}`,
        severity: 'success'
      });
    }

    // ... rest of the function ...
  }, 1000);
};

const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 2.5),
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  border: theme.palette.mode === 'dark' 
    ? '1px solid rgba(255,255,255,0.08)' 
    : '1px solid rgba(0,0,0,0.04)',
  '& .MuiTableHead-root': {
    '& .MuiTableCell-root': {
      fontWeight: 600,
      fontSize: '0.75rem',
      letterSpacing: '0.5px',
      borderBottom: theme.palette.mode === 'dark' 
        ? '1px solid rgba(255,255,255,0.08)' 
        : '1px solid rgba(0,0,0,0.08)',
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.02)' 
        : 'rgba(0,0,0,0.02)',
      padding: theme.spacing(1.5, 2),
    }
  },
  '& .MuiTableBody-root': {
    '& .MuiTableCell-root': {
      fontSize: '0.8125rem',
      padding: theme.spacing(1.5, 2),
      borderBottom: theme.palette.mode === 'dark' 
        ? '1px solid rgba(255,255,255,0.04)' 
        : '1px solid rgba(0,0,0,0.04)',
    },
    '& .MuiTableRow-root': {
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(255,255,255,0.02)' 
          : 'rgba(0,0,0,0.02)',
      }
    }
  }
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontSize: '0.875rem',
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.1)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.2)' 
        : 'rgba(0,0,0,0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
    }
  }
}));

// ==================== PRODUCT CATALOG ====================
const productCatalog = [
  { id: 1, name: 'IOGURTE NATURAL 500ML', price: 69.35, unit: 'unit', code: 'IOG500', category: 'Dairy' },
  { id: 2, name: 'LEITE FRESCO 500ML', price: 75, unit: 'unit', code: 'LEI500', category: 'Dairy' },
  { id: 3, name: 'CHAMUSSA DE BEEF 12 UN', price: 155, unit: 'pack', code: 'CHB12', category: 'Pastry' },
  { id: 4, name: 'CHAMUSSA DE PEIXE 12 UN', price: 155, unit: 'pack', code: 'CHP12', category: 'Pastry' },
  { id: 5, name: 'CHAMUSSA DE FRANGO 12 UN', price: 155, unit: 'pack', code: 'CHF12', category: 'Pastry' },
  { id: 6, name: 'CHAMUSSA INTEGRAL 12 UN', price: 155, unit: 'pack', code: 'CHI12', category: 'Pastry' },
  { id: 7, name: 'RESSOIS DE FRANGO 12 UN', price: 180, unit: 'pack', code: 'REF12', category: 'Pastry' },
  { id: 8, name: 'RESSOIS DE CAMARAO 12 UN', price: 195, unit: 'pack', code: 'REC12', category: 'Pastry' },
  { id: 9, name: 'SPRINGROLL DE BIFE 12 UN', price: 180, unit: 'pack', code: 'SPB12', category: 'Pastry' },
  { id: 10, name: 'SPRINGROLL DE FRANGO 12 UN', price: 180, unit: 'pack', code: 'SPF12', category: 'Pastry' },
  { id: 11, name: 'SPRINGROLL DE VEGITAIS 12 UN', price: 180, unit: 'pack', code: 'SPV12', category: 'Pastry' },
  { id: 12, name: 'CHAMUSSA DE CARNE 24 UN', price: 225, unit: 'pack', code: 'CHC24', category: 'Pastry' },
  { id: 13, name: 'CHAMUSSA DE PEIXE 24 UN', price: 225, unit: 'pack', code: 'CHP24', category: 'Pastry' },
  { id: 14, name: 'CHAMUSSA DE FRANGO 24 UN', price: 225, unit: 'pack', code: 'CHF24', category: 'Pastry' },
  { id: 15, name: 'CHAMUSSA INTEGRAL 24 UN', price: 225, unit: 'pack', code: 'CHI24', category: 'Pastry' },
  { id: 16, name: 'RESSOIS DE FRANGO 24 UN', price: 225, unit: 'pack', code: 'REF24', category: 'Pastry' },
  { id: 17, name: 'RESSOIS DE CAMARAO 24 UN', price: 225, unit: 'pack', code: 'REC24', category: 'Pastry' },
  { id: 18, name: 'SPRINGROLL DE CARNE 24 UN', price: 225, unit: 'pack', code: 'SPC24', category: 'Pastry' },
  { id: 19, name: 'SPRINGROLL DE FRANGO 24 UN', price: 225, unit: 'pack', code: 'SPF24', category: 'Pastry' },
  { id: 20, name: 'SPRINGROLL DE VEGITAIS 24 UN', price: 225, unit: 'pack', code: 'SPV24', category: 'Pastry' },
  { id: 21, name: 'SORVETE DE VANILLA 300ML', price: 75, unit: 'unit', code: 'SV300', category: 'Ice Cream' },
  { id: 22, name: 'SORVETE DE MORANGO 300ML', price: 75, unit: 'unit', code: 'SM300', category: 'Ice Cream' },
  { id: 23, name: 'SORVETE DE C & CREAM 300ML', price: 75, unit: 'unit', code: 'SC300', category: 'Ice Cream' },
  { id: 24, name: 'SORVETE DE MARACUJA 300ML', price: 75, unit: 'unit', code: 'SMA300', category: 'Ice Cream' },
  { id: 25, name: 'SORVETE DE CHOCOLATE 300ML', price: 75, unit: 'unit', code: 'SCH300', category: 'Ice Cream' },
  { id: 26, name: 'SORVETE DE CARAMELO 300ML', price: 75, unit: 'unit', code: 'SCA300', category: 'Ice Cream' },
  { id: 27, name: 'SORVETE DE BLUEBERRY 300ML', price: 75, unit: 'unit', code: 'SB300', category: 'Ice Cream' },
  { id: 28, name: 'SORVETE DE VANILLA 5L', price: 800, unit: 'unit', code: 'SV5L', category: 'Ice Cream' },
  { id: 29, name: 'SORVETE DE MORANGO 5L', price: 800, unit: 'unit', code: 'SM5L', category: 'Ice Cream' },
  { id: 30, name: 'SORVETE DE CARAMELO 5L', price: 800, unit: 'unit', code: 'SCA5L', category: 'Ice Cream' },
  { id: 31, name: 'SORVETE DE MARACUJA 5L', price: 800, unit: 'unit', code: 'SMA5L', category: 'Ice Cream' },
  { id: 32, name: 'SORVETE DE CHOCOLATE 5L', price: 800, unit: 'unit', code: 'SCH5L', category: 'Ice Cream' },
  { id: 33, name: 'SORVETE DE BLUEBERRY 5L', price: 800, unit: 'unit', code: 'SB5L', category: 'Ice Cream' },
  { id: 34, name: 'COOKIES & CREAM 5L', price: 800, unit: 'unit', code: 'CC5L', category: 'Ice Cream' },
];

// ==================== CONSTANTS ====================
const clientCategories = [
  'All',
  'Supermercado',
  'Corporate',
  'Wholesale',
  'Restaurante',
  'Cantina',
  'Mercearia',
  'Individo',
];

const statusOptions = [
  { value: 'all', label: 'All Status', color: 'default' },
  { value: 'paid', label: 'Paid', color: 'success' },
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'partial', label: 'Partial', color: 'info' },
  { value: 'overpaid', label: 'Credit', color: 'error' },
];

const paymentMethods = [
  { value: 'cash', label: 'Cash', icon: '💵' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
  { value: 'check', label: 'Check', icon: '📄' },
  { value: 'mobile_money', label: 'Mobile Money', icon: '📱' },
];

const invoiceStatus = [
  { value: 'all', label: 'All Invoices' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'paid', label: 'Paid' },
  { value: 'partial', label: 'Partial' },
];

// ==================== EXCEL DATA PARSING ====================
const parseExcelData = () => {
  // Parse debtors data from Excel
  const debtorsData = [
    {
      client: 'Vip Spar Supermercado Tete',
      totalAmount: 68175,
      amountReceived: 32300,
      debt: 35875,
      category: 'Supermercado'
    },
    {
      client: 'VIP Spar Supermercado Chimoio',
      totalAmount: 296135,
      amountReceived: 279050,
      debt: 17085,
      category: 'Supermercado'
    },
    {
      client: 'Supermercado HSK',
      totalAmount: 122550,
      amountReceived: 107470,
      debt: 15080,
      category: 'Supermercado'
    },
    {
      client: 'Supermercado Altaj',
      totalAmount: 64445,
      amountReceived: 49525,
      debt: 14920,
      category: 'Supermercado'
    },
    {
      client: 'VIP Spar Supermercado Beira',
      totalAmount: 114235,
      amountReceived: 101785,
      debt: 12450,
      category: 'Supermercado'
    },
    {
      client: 'Supermercado Jasmin Garden',
      totalAmount: 116230,
      amountReceived: 105390,
      debt: 10840,
      category: 'Supermercado'
    },
    {
      client: 'Royal hypermercado Tete',
      totalAmount: 15120,
      amountReceived: 6030,
      debt: 9090,
      category: 'Supermercado'
    },
    {
      client: 'Motichande Alto da Manga',
      totalAmount: 99095,
      amountReceived: 91325,
      debt: 7770,
      category: 'Wholesale'
    },
    {
      client: 'Motichande Maquinino',
      totalAmount: 93950,
      amountReceived: 87140,
      debt: 6810,
      category: 'Wholesale'
    },
    {
      client: 'Recheio cash & Carry Beira',
      totalAmount: 51150,
      amountReceived: 45300,
      debt: 5850,
      category: 'Wholesale'
    },
    {
      client: 'Recheio Cash & Carry Chimoio',
      totalAmount: 22580,
      amountReceived: 17180,
      debt: 5400,
      category: 'Wholesale'
    },
    {
      client: 'Imran Recheio',
      totalAmount: 5395,
      amountReceived: 0,
      debt: 5395,
      category: 'Individo'
    },
    {
      client: 'Juba Shopping House',
      totalAmount: 66190,
      amountReceived: 61100,
      debt: 5090,
      category: 'Mercearia'
    },
    {
      client: 'Supermercado Mil Tete',
      totalAmount: 179375,
      amountReceived: 174725,
      debt: 4650,
      category: 'Supermercado'
    },
    {
      client: 'Nizami Rice & Grills',
      totalAmount: 83200,
      amountReceived: 80000,
      debt: 3200,
      category: 'Restaurante'
    },
    {
      client: 'Bons Sonhos - Sandra',
      totalAmount: 26175,
      amountReceived: 23700,
      debt: 2475,
      category: 'Cantina'
    },
    {
      client: 'Ausentina',
      totalAmount: 2310,
      amountReceived: 540,
      debt: 1770,
      category: 'Individo'
    },
    {
      client: 'Samora - Dona Bela',
      totalAmount: 2812.5,
      amountReceived: 1312.5,
      debt: 1500,
      category: 'Individo'
    },
    {
      client: 'Mamady cissoco Esturro',
      totalAmount: 8850,
      amountReceived: 7500,
      debt: 1350,
      category: 'Mercearia'
    },
    {
      client: 'Centro Social HCB',
      totalAmount: 8250,
      amountReceived: 6975,
      debt: 1275,
      category: 'Cantina'
    },
    {
      client: 'Supermercado Centro',
      totalAmount: 138685,
      amountReceived: 137460,
      debt: 1225,
      category: 'Supermercado'
    },
    {
      client: 'Pensao Atlantida',
      totalAmount: 885,
      amountReceived: 0,
      debt: 885,
      category: 'Corporate'
    },
    {
      client: 'Sundra Mutemba',
      totalAmount: 750,
      amountReceived: 0,
      debt: 750,
      category: 'Individo'
    },
    {
      client: 'Gorjao - Dona Odete',
      totalAmount: 1500,
      amountReceived: 750,
      debt: 750,
      category: 'Individo'
    },
    {
      client: 'Mercearia Awa',
      totalAmount: 3375,
      amountReceived: 2700,
      debt: 675,
      category: 'Mercearia'
    },
    {
      client: 'Supermercado Fresh Mini Marte',
      totalAmount: 230695,
      amountReceived: 230020,
      debt: 675,
      category: 'Supermercado'
    },
    {
      client: 'Rei dos precos',
      totalAmount: 375,
      amountReceived: 0,
      debt: 375,
      category: 'Supermercado'
    },
    {
      client: 'Dilla Waya',
      totalAmount: 2625,
      amountReceived: 2600,
      debt: 25,
      category: 'Mercearia'
    },
    {
      client: 'Flexivel Plasticos',
      totalAmount: 13600,
      amountReceived: 13600,
      debt: 0,
      category: 'Corporate'
    },
    {
      client: 'Supermercado Viva Shopping',
      totalAmount: 5250,
      amountReceived: 5250,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Supermercado 7 Semanas - Dondo',
      totalAmount: 67125,
      amountReceived: 67125,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Sultan',
      totalAmount: 980,
      amountReceived: 980,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Feliz Shopping Tete',
      totalAmount: 78975,
      amountReceived: 78975,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Mamady Cissoco Macurungo',
      totalAmount: 750,
      amountReceived: 750,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Mercearia Marques',
      totalAmount: 5250,
      amountReceived: 5250,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Supermercado Mil Beira',
      totalAmount: 400725,
      amountReceived: 400725,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Jone Armindo',
      totalAmount: 10550,
      amountReceived: 10550,
      debt: 0,
      category: 'Cantina'
    },
    {
      client: 'Mercearia Bay',
      totalAmount: 3750,
      amountReceived: 3750,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Mamady cissoco Matacune',
      totalAmount: 10125,
      amountReceived: 10125,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Adamo comitte',
      totalAmount: 1125,
      amountReceived: 1125,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'mercearia Outro nivel',
      totalAmount: 4125,
      amountReceived: 4125,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Mercearia Joel',
      totalAmount: 7875,
      amountReceived: 7875,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'ATB Comercial Pioneiros',
      totalAmount: 41835,
      amountReceived: 41835,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Mercearia yasmin',
      totalAmount: 3460,
      amountReceived: 3460,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Supermercado Aazoo',
      totalAmount: 7875,
      amountReceived: 7875,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Supermercado Pontagea',
      totalAmount: 114105,
      amountReceived: 114105,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Supermercado Palmeiras',
      totalAmount: 57975,
      amountReceived: 57975,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Supermercado Number 1',
      totalAmount: 223885,
      amountReceived: 223885,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'SBL Maquinino',
      totalAmount: 83100,
      amountReceived: 83100,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Sample',
      totalAmount: 0,
      amountReceived: 0,
      debt: 0,
      category: 'Sample'
    },
    {
      client: 'Oficina Ravate',
      totalAmount: 217759,
      amountReceived: 217759,
      debt: 0,
      category: 'Corporate'
    },
    {
      client: 'Oceano Mozambique',
      totalAmount: 91275,
      amountReceived: 91275,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Mercearia Maquinino',
      totalAmount: 29990,
      amountReceived: 29990,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Mercearia Atib',
      totalAmount: 31185,
      amountReceived: 31185,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'Lelat Supermercado',
      totalAmount: 50450,
      amountReceived: 50450,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Jims Supermercado',
      totalAmount: 2170,
      amountReceived: 2170,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Ivato Supermercado',
      totalAmount: 6340,
      amountReceived: 6340,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Feliz Shopping',
      totalAmount: 248400,
      amountReceived: 248400,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Fanisa',
      totalAmount: 750,
      amountReceived: 750,
      debt: 0,
      category: 'Individo'
    },
    {
      client: 'Ema',
      totalAmount: 3060,
      amountReceived: 3060,
      debt: 0,
      category: 'Individo'
    },
    {
      client: 'Ding Sheng International Investiments',
      totalAmount: 6725,
      amountReceived: 6725,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Cremildo Comercial',
      totalAmount: 2325,
      amountReceived: 2325,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'China Mall',
      totalAmount: 4650,
      amountReceived: 4650,
      debt: 0,
      category: 'Supermercado'
    },
    {
      client: 'Centro Educacional Njerenje',
      totalAmount: 3400,
      amountReceived: 3400,
      debt: 0,
      category: 'Escola'
    },
    {
      client: 'Carfimpex',
      totalAmount: 336395,
      amountReceived: 336395,
      debt: 0,
      category: 'Wholesale'
    },
    {
      client: 'Benny',
      totalAmount: 590,
      amountReceived: 590,
      debt: 0,
      category: 'Mercearia'
    },
    {
      client: 'A Palhota',
      totalAmount: 2720,
      amountReceived: 2720,
      debt: 0,
      category: 'Restaurante'
    },
    {
      client: 'Cantina Chiremera',
      totalAmount: 14899.9966666667,
      amountReceived: 14900,
      debt: -0.00333333333583141,
      category: 'Cantina'
    },
    {
      client: 'SBL Baixa',
      totalAmount: 49180,
      amountReceived: 49230,
      debt: -50,
      category: 'Supermercado'
    },
    {
      client: 'Mamady Cissoco Pioneiros',
      totalAmount: 12000,
      amountReceived: 12750,
      debt: -750,
      category: 'Mercearia'
    },
    {
      client: 'Peixaria Mar Azul',
      totalAmount: 3675,
      amountReceived: 4650,
      debt: -975,
      category: 'Mercearia'
    },
    {
      client: 'Feripinta',
      totalAmount: 1350019.71,
      amountReceived: 1596806.91,
      debt: -246787.2,
      category: 'Corporate'
    },
    {
      client: 'Beira Grain Terminal',
      totalAmount: 1879176.95,
      amountReceived: 2293888.45,
      debt: -414711.5,
      category: 'Corporate'
    },
  ];

  // Parse client types from Clients Name sheet
  const clientTypes = {
    'A Palhota': 'Restaurante',
    'Adamo comitte': 'Mercearia',
    'ATB Comercial Pioneiros': 'Mercearia',
    'Ausentina': 'Individo',
    'Beira Grain Terminal': 'Corporate',
    'Benny': 'Mercearia',
    'Bons Sonhos - Sandra': 'Cantina',
    'Cantina Chiremera': 'Cantina',
    'Carfimpex': 'Wholesale',
    'Centro Educacional Njerenje': 'Escola',
    'Centro Social HCB': 'Cantina',
    'China Mall': 'Supermercado',
    'Cremildo Comercial': 'Mercearia',
    'Dilla Waya': 'Mercearia',
    'Ding Sheng International Investiments': 'Supermercado',
    'Ema': 'Individo',
    'Fanisa': 'Individo',
    'Feliz Shopping': 'Supermercado',
    'Feliz Shopping Tete': 'Supermercado',
    'Feripinta': 'Corporate',
    'Flexivel Plasticos': 'Corporate',
    'Gorjao - Dona Odete': 'Individo',
    'Imran Recheio': 'Individo',
    'Ivato Supermercado': 'Supermercado',
    'Jims Supermercado': 'Supermercado',
    'Jone Armindo': 'Cantina',
    'Juba Shopping House': 'Mercearia',
    'Lelat Supermercado': 'Supermercado',
    'lucia Antonio Vasco': 'Individo',
    'Mamady cissoco Esturro': 'Mercearia',
    'Mamady Cissoco Macurungo': 'Mercearia',
    'Mamady cissoco Matacune': 'Mercearia',
    'Mamady Cissoco Pioneiros': 'Mercearia',
    'Mercearia Atib': 'Mercearia',
    'Mercearia Awa': 'Mercearia',
    'Mercearia Bay': 'Mercearia',
    'Mercearia Benfica': 'Mercearia',
    'Mercearia Joel': 'Mercearia',
    'Mercearia Maquinino': 'Mercearia',
    'Mercearia Marques': 'Mercearia',
    'mercearia Outro nivel': 'Mercearia',
    'Mercearia yasmin': 'Mercearia',
    'Motichande Alto da Manga': 'Wholesale',
    'Motichande Maquinino': 'Wholesale',
    'Nizami Rice & Grills': 'Restaurante',
    'Oceano Mozambique': 'Supermercado',
    'Oficina Ravate': 'Corporate',
    'Peixaria Mar Azul': 'Mercearia',
    'Pensao Atlantida': 'Corporate',
    'Recheio cash & Carry Beira': 'Wholesale',
    'Recheio Cash & Carry Chimoio': 'Wholesale',
    'Rei dos precos': 'Supermercado',
    'Royal hypermercado Tete': 'Supermercado',
    'Samora - Dona Bela': 'Individo',
    'Sample': 'Sample',
    'SBL Baixa': 'Supermercado',
    'SBL Maquinino': 'Supermercado',
    'Sultan': 'Mercearia',
    'Sundra Mutemba': 'Individo',
    'Sunlight Food Court': 'Restaurante',
    'Supermercado 7 Semanas - Dondo': 'Supermercado',
    'Supermercado Aazoo': 'Supermercado',
    'Supermercado Altaj': 'Supermercado',
    'Supermercado Centro': 'Supermercado',
    'Supermercado Fresh Mini Marte': 'Supermercado',
    'Supermercado HSK': 'Supermercado',
    'Supermercado Jasmin Garden': 'Supermercado',
    'Supermercado Mil Beira': 'Supermercado',
    'Supermercado Mil Tete': 'Supermercado',
    'Supermercado Number 1': 'Supermercado',
    'Supermercado Palmeiras': 'Supermercado',
    'Supermercado Pontagea': 'Supermercado',
    'Supermercado Viva Shopping': 'Supermercado',
    'VIP Spar Supermercado Beira': 'Supermercado',
    'VIP Spar Supermercado Chimoio': 'Supermercado',
    'Vip Spar Supermercado Tete': 'Supermercado'
  };

  // Transform data to match the initialSalesData structure
  return debtorsData.map((item, index) => {
    const debt = item.debt;
    let status = 'paid';
    
    if (debt > 0) {
      status = debt === item.totalAmount ? 'pending' : 'partial';
    } else if (debt < 0) {
      status = 'overpaid';
    }
    
    // Get category from clientTypes or default
    const category = clientTypes[item.client] || item.category || 'Other';
    
    // Generate some sample products based on client type
    const getSampleProducts = () => {
      const products = [];
      const numProducts = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numProducts; i++) {
        const product = productCatalog[Math.floor(Math.random() * productCatalog.length)];
        const quantity = Math.floor(Math.random() * 10) + 1;
        products.push({
          ...product,
          quantity,
          total: product.price * quantity
        });
      }
      
      return products;
    };
    
    // Generate payment history
    const getPaymentHistory = () => {
      const history = [];
      if (item.amountReceived > 0) {
        // Add initial invoice
        history.push({
          date: format(subDays(new Date(), 60), 'yyyy-MM-dd'),
          amount: item.totalAmount,
          type: 'invoice',
          reference: `INV${(index + 1).toString().padStart(3, '0')}`,
          status: 'pending',
          guideNumber: `G${(index + 1).toString().padStart(3, '0')}`,
          supplyDate: format(subDays(new Date(), 60), 'yyyy-MM-dd')
        });
        
        // Add payments
        if (item.amountReceived > 0) {
          history.push({
            date: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
            amount: item.amountReceived,
            type: item.amountReceived >= item.totalAmount ? 'full' : 'partial',
            reference: `VD${(index + 1).toString().padStart(3, '0')}`,
            status: 'paid',
            guideNumber: `G${(index + 1).toString().padStart(3, '0')}`,
            vdNumber: `VD${(index + 1).toString().padStart(3, '0')}`,
            discount: 0
          });
        }
      }
      return history;
    };
    
    // Generate current invoices
    const getCurrentInvoices = () => {
      if (debt > 0) {
        return [{
          invoiceNumber: `INV${(index + 1).toString().padStart(3, '0')}`,
          date: format(subDays(new Date(), 60), 'yyyy-MM-dd'),
          amount: debt,
          dueDate: format(addDays(subDays(new Date(), 60), 30), 'yyyy-MM-dd'),
          status: differenceInDays(new Date(), addDays(subDays(new Date(), 60), 30)) > 0 ? 'overdue' : 'pending',
          guideNumber: `G${(index + 1).toString().padStart(3, '0')}`,
          supplyDate: format(subDays(new Date(), 60), 'yyyy-MM-dd')
        }];
      }
      return [];
    };
    
    return {
      id: index + 1,
      client: item.client,
      totalAmount: item.totalAmount,
      amountReceived: item.amountReceived,
      debt: item.debt,
      lastTransaction: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
      status,
      category,
      daysDue: debt > 0 ? Math.floor(Math.random() * 60) + 1 : 0,
      invoiceNumber: `INV${(index + 1).toString().padStart(3, '0')}`,
      guideNumber: `G${(index + 1).toString().padStart(3, '0')}`,
      supplyDate: format(subDays(new Date(), Math.floor(Math.random() * 60) + 1), 'yyyy-MM-dd'),
      paymentDate: debt === 0 ? format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd') : null,
      priority: debt > 5000 ? 'high' : debt > 1000 ? 'medium' : 'low',
      notes: `${item.client} - ${category} client`,
      contactPerson: 'Manager',
      phone: '+258 84 XXX XXXX',
      email: `${item.client.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      address: 'Beira, Mozambique',
      products: getSampleProducts(),
      paymentHistory: getPaymentHistory(),
      currentInvoices: getCurrentInvoices()
    };
  });
};

// ==================== INITIAL SALES DATA ====================
const initialSalesData = parseExcelData();

// ==================== COMPONENT ====================
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sales-tabpanel-${index}`}
      aria-labelledby={`sales-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

const Sales = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { user } = useAuth();

  const [salesData, setSalesData] = useState(initialSalesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [expandedRows, setExpandedRows] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: new Date()
  });
  const [favorites, setFavorites] = useState([1, 2]);
  
  // Dialog states
  const [addSaleDialogOpen, setAddSaleDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [viewInvoicesDialogOpen, setViewInvoicesDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [paymentStep, setPaymentStep] = useState(0);
  const [selectedInvoiceDetails, setSelectedInvoiceDetails] = useState(null);

  // Add sale form state
  const [saleForm, setSaleForm] = useState({
    client: '',
    clientId: '',
    clientType: '',
    date: new Date(),
    guideNumber: '',
    invoiceNumber: '',
    products: [{ id: '', quantity: 1, price: 0, code: '', name: '' }],
    discount: 0,
    paymentMethod: '',
    paymentAmount: 0,
    notes: '',
    dueDate: addDays(new Date(), 30),
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    supplyDate: new Date(),
  });

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    client: '',
    clientId: '',
    amount: 0,
    discount: 0,
    amountPaid: 0,
    date: new Date(),
    method: 'cash',
    reference: '',
    notes: '',
    appliedInvoices: [],
    paymentType: 'partial',
    guideNumber: '',
    supplyDate: new Date(),
    vdNumber: '',
    productsPaid: [],
    isPartial: true,
  });

  // Get unique clients for dropdown
  const uniqueClients = Array.from(new Set(salesData.map(item => item.client))).map(client => {
    const clientData = salesData.find(item => item.client === client);
    return {
      name: client,
      id: clientData?.id,
      category: clientData?.category,
      phone: clientData?.phone,
      email: clientData?.email
    };
  });

  // Calculate totals
  const totals = salesData.reduce(
    (acc, item) => {
      acc.totalAmount += item.totalAmount;
      acc.totalReceived += item.amountReceived;
      acc.totalDebt += item.debt;
      acc.pendingInvoices = acc.pendingInvoices + item.currentInvoices.length;
      return acc;
    },
    { totalAmount: 0, totalReceived: 0, totalDebt: 0, pendingInvoices: 0 }
  );

  // Filter data based on search and filters
  const filteredData = salesData.filter((item) => {
    const matchesSearch = searchTerm === '' || 
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.guideNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Handle refresh button
  const handleRefresh = () => {
    setLoading(true);
    setSnackbar({
      open: true,
      message: 'Refreshing sales data...',
      severity: 'info'
    });
    
    setTimeout(() => {
      setLoading(false);
      setSalesData(parseExcelData());
      setSnackbar({
        open: true,
        message: 'Sales data refreshed successfully',
        severity: 'success'
      });
    }, 1500);
  };

  // Handle record payment button
  const handleRecordPayment = () => {
    setPaymentForm({
      client: '',
      clientId: '',
      amount: 0,
      discount: 0,
      amountPaid: 0,
      date: new Date(),
      method: 'cash',
      reference: '',
      notes: '',
      appliedInvoices: [],
      paymentType: 'partial',
      guideNumber: '',
      supplyDate: new Date(),
      vdNumber: '',
      productsPaid: [],
      isPartial: true,
    });
    setSelectedInvoiceDetails(null);
    setSelectedInvoices([]);
    setPaymentStep(0);
    setPaymentDialogOpen(true);
  };

  // Handle new invoice button
  const handleNewInvoice = () => {
    setSaleForm({
      client: '',
      clientId: '',
      clientType: '',
      date: new Date(),
      guideNumber: '',
      invoiceNumber: '',
      products: [{ id: '', quantity: 1, price: 0, code: '', name: '' }],
      discount: 0,
      paymentMethod: '',
      paymentAmount: 0,
      notes: '',
      dueDate: addDays(new Date(), 30),
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      supplyDate: new Date(),
    });
    setAddSaleDialogOpen(true);
  };

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'partial': return 'info';
      case 'overpaid': return 'error';
      default: return 'default';
    }
  };

  // Get invoice status color
  const getInvoiceStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      case 'partial': return 'info';
      default: return 'default';
    }
  };

  // Calculate days due for invoice
  const calculateDaysDue = (dueDate) => {
    const today = new Date();
    const due = parseISO(dueDate);
    const diff = differenceInDays(today, due);
    return diff > 0 ? diff : 0;
  };

  // Toggle favorite
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
    });
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  // Handle page change for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle add sale
  const handleAddSale = () => {
    if (!saleForm.clientId || saleForm.products.some(p => !p.id || p.quantity <= 0)) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields and add at least one product',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const subtotal = saleForm.products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
      const totalAmount = subtotal - saleForm.discount;
      const paymentAmount = saleForm.paymentAmount || 0;
      const debt = totalAmount - paymentAmount;
      
      const guideNumber = saleForm.guideNumber || `G${Date.now().toString().slice(-6)}`;
      const invoiceNumber = saleForm.invoiceNumber || `INV${Date.now().toString().slice(-6)}`;
      
      // Find selected client data
      const selectedClientData = uniqueClients.find(c => c.id === saleForm.clientId);
      
      const newSale = {
        id: salesData.length + 1,
        client: saleForm.client,
        totalAmount,
        amountReceived: paymentAmount,
        debt,
        lastTransaction: format(saleForm.date, 'yyyy-MM-dd'),
        status: paymentAmount >= totalAmount ? 'paid' : 
                paymentAmount > 0 ? 'partial' : 'pending',
        category: saleForm.clientType || selectedClientData?.category || 'Other',
        daysDue: calculateDaysDue(format(saleForm.dueDate, 'yyyy-MM-dd')),
        invoiceNumber,
        guideNumber,
        supplyDate: format(saleForm.supplyDate, 'yyyy-MM-dd'),
        paymentDate: paymentAmount > 0 ? format(saleForm.date, 'yyyy-MM-dd') : null,
        products: saleForm.products.map(p => ({
          ...p,
          total: p.quantity * p.price
        })),
        contactPerson: saleForm.contactPerson || selectedClientData?.contactPerson || '',
        phone: saleForm.phone || selectedClientData?.phone || '',
        email: saleForm.email || selectedClientData?.email || '',
        address: saleForm.address || '',
        paymentHistory: [
          {
            date: format(saleForm.date, 'yyyy-MM-dd'),
            amount: totalAmount,
            type: 'invoice',
            reference: invoiceNumber,
            status: 'pending',
            guideNumber,
            supplyDate: format(saleForm.supplyDate, 'yyyy-MM-dd'),
            products: saleForm.products
          },
          ...(paymentAmount > 0 ? [{
            date: format(saleForm.date, 'yyyy-MM-dd'),
            amount: paymentAmount,
            type: saleForm.paymentMethod ? 'partial' : 'full',
            reference: saleForm.paymentMethod === 'bank_transfer' ? saleForm.reference || 'BANK' : 'CASH',
            status: 'paid',
            guideNumber,
            vdNumber: `VD${Date.now().toString().slice(-4)}`,
            discount: saleForm.discount || 0
          }] : [])
        ],
        currentInvoices: debt > 0 ? [{
          invoiceNumber,
          date: format(saleForm.date, 'yyyy-MM-dd'),
          amount: debt,
          dueDate: format(saleForm.dueDate, 'yyyy-MM-dd'),
          status: isBefore(new Date(), saleForm.dueDate) ? 'pending' : 'overdue',
          guideNumber,
          supplyDate: format(saleForm.supplyDate, 'yyyy-MM-dd'),
          products: saleForm.products
        }] : []
      };

      setSalesData(prev => [...prev, newSale]);
      setLoading(false);
      setAddSaleDialogOpen(false);
      setSnackbar({
        open: true,
        message: `Sale added successfully! Guide #${guideNumber} created`,
        severity: 'success'
      });
      
      setSaleForm({
        client: '',
        clientId: '',
        clientType: '',
        date: new Date(),
        guideNumber: '',
        invoiceNumber: '',
        products: [{ id: '', quantity: 1, price: 0, code: '', name: '' }],
        discount: 0,
        paymentMethod: '',
        paymentAmount: 0,
        notes: '',
        dueDate: addDays(new Date(), 30),
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        supplyDate: new Date(),
      });
    }, 1000);
  };

  // Handle add payment
  const handleAddPayment = () => {
    if (!paymentForm.clientId || paymentForm.amountPaid <= 0 || !paymentForm.vdNumber) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields including VD Number',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSalesData(prev => prev.map(item => {
        if (item.id === paymentForm.clientId) {
          const paymentAmount = paymentForm.amountPaid - paymentForm.discount;
          const newReceived = item.amountReceived + paymentAmount;
          const newDebt = item.totalAmount - newReceived;
          
          let updatedInvoices = [...item.currentInvoices];
          let remainingAmount = paymentAmount;
          
          // Pay selected invoices
          if (selectedInvoices.length > 0) {
            updatedInvoices = updatedInvoices.map(invoice => {
              if (selectedInvoices.some(selected => selected.invoiceNumber === invoice.invoiceNumber)) {
                if (remainingAmount >= invoice.amount) {
                  remainingAmount -= invoice.amount;
                  return { ...invoice, status: 'paid' };
                } else {
                  const paidAmount = remainingAmount;
                  remainingAmount = 0;
                  return { 
                    ...invoice, 
                    status: 'partial', 
                    amount: invoice.amount - paidAmount
                  };
                }
              }
              return invoice;
            }).filter(invoice => invoice.status !== 'paid');
          }

          const paymentRecord = {
            date: format(paymentForm.date, 'yyyy-MM-dd'),
            amount: paymentAmount,
            discount: paymentForm.discount,
            type: paymentForm.paymentType,
            reference: paymentForm.reference || 
                     (paymentForm.method === 'cash' ? 'CASH' : 
                      paymentForm.method === 'bank_transfer' ? 'BANK' : 
                      paymentForm.method),
            status: 'paid',
            guideNumber: paymentForm.guideNumber,
            supplyDate: format(paymentForm.supplyDate, 'yyyy-MM-dd'),
            vdNumber: paymentForm.vdNumber,
            productsPaid: paymentForm.productsPaid,
            isPartial: paymentForm.isPartial,
            invoiceDetails: selectedInvoiceDetails
          };

          return {
            ...item,
            amountReceived: newReceived,
            debt: newDebt,
            status: newDebt === 0 ? 'paid' : newDebt < 0 ? 'overpaid' : 'partial',
            lastTransaction: format(paymentForm.date, 'yyyy-MM-dd'),
            paymentHistory: [...item.paymentHistory, paymentRecord],
            currentInvoices: updatedInvoices,
            daysDue: updatedInvoices.length > 0 ? 
                    calculateDaysDue(updatedInvoices[0].dueDate) : 0
          };
        }
        return item;
      }));
      
      setLoading(false);
      setPaymentDialogOpen(false);
      setPaymentStep(0);
      setSnackbar({
        open: true,
        message: `Payment of ${formatCurrency(paymentForm.amountPaid)} recorded successfully! VD: ${paymentForm.vdNumber}`,
        severity: 'success'
      });
      
      setPaymentForm({
        client: '',
        clientId: '',
        amount: 0,
        discount: 0,
        amountPaid: 0,
        date: new Date(),
        method: 'cash',
        reference: '',
        notes: '',
        appliedInvoices: [],
        paymentType: 'partial',
        guideNumber: '',
        supplyDate: new Date(),
        vdNumber: '',
        productsPaid: [],
        isPartial: true,
      });
      setSelectedInvoices([]);
      setSelectedInvoiceDetails(null);
    }, 800);
  };

  // Handle product change in sale form
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...saleForm.products];
    updatedProducts[index][field] = value;
    
    if (field === 'id' && value) {
      const product = productCatalog.find(p => p.id === parseInt(value));
      if (product) {
        updatedProducts[index].price = product.price;
        updatedProducts[index].code = product.code;
        updatedProducts[index].name = product.name;
      }
    }
    
    setSaleForm({ ...saleForm, products: updatedProducts });
  };

  // Add product row
  const addProductRow = () => {
    setSaleForm({
      ...saleForm,
      products: [...saleForm.products, { id: '', quantity: 1, price: 0, code: '', name: '' }]
    });
  };

  // Remove product row
  const removeProductRow = (index) => {
    const updatedProducts = saleForm.products.filter((_, i) => i !== index);
    setSaleForm({ ...saleForm, products: updatedProducts });
  };

  // Calculate sale total
  const calculateSaleTotal = () => {
    const subtotal = saleForm.products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
    return subtotal - saleForm.discount;
  };

  // Handle print
  const handlePrint = () => {
    const printContent = document.getElementById('sales-table')?.outerHTML;
    if (!printContent) return;
    
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `
      <style>
        @media print {
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .no-print { display: none; }
        }
      </style>
      <h2>Food Champion - Sales Report</h2>
      <p>Generated on: ${format(new Date(), 'dd/MM/yyyy HH:mm')}</p>
      ${printContent}
    `;
    window.print();
    document.body.innerHTML = originalContent;
  };

  // Handle download CSV
  const handleDownload = () => {
    const headers = ['Client', 'Category', 'Total Amount', 'Amount Received', 'Balance', 'Status', 'Days Due', 'Last Transaction', 'Guide Number'];
    const csvData = salesData.map(row => [
      row.client,
      row.category,
      row.totalAmount,
      row.amountReceived,
      row.debt,
      row.status,
      row.daysDue,
      row.lastTransaction,
      row.guideNumber
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_data_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle payment step
  const handlePaymentStep = (step) => {
    if (step === 1 && !paymentForm.clientId) {
      setSnackbar({
        open: true,
        message: 'Please select a client first',
        severity: 'error'
      });
      return;
    }
    setPaymentStep(step);
  };

  // Handle client selection for payment
  const handleClientSelectForPayment = (clientId) => {
    const client = salesData.find(c => c.id === clientId);
    if (client) {
      setPaymentForm({
        ...paymentForm,
        clientId,
        client: client.client,
        guideNumber: client.guideNumber,
        supplyDate: parseISO(client.supplyDate),
        amount: client.debt > 0 ? client.debt : 0,
        amountPaid: client.debt > 0 ? client.debt : 0
      });
      
      // If client has current invoices, select the first one by default
      if (client.currentInvoices.length > 0) {
        const firstInvoice = client.currentInvoices[0];
        setSelectedInvoices([firstInvoice]);
        setSelectedInvoiceDetails(firstInvoice);
        setPaymentForm(prev => ({
          ...prev,
          appliedInvoices: [firstInvoice.invoiceNumber],
          productsPaid: firstInvoice.products || []
        }));
      }
    }
  };

  // Handle invoice selection for payment
  const handleInvoiceSelectForPayment = (invoice) => {
    setSelectedInvoices([invoice]);
    setSelectedInvoiceDetails(invoice);
    setPaymentForm(prev => ({
      ...prev,
      amount: invoice.amount,
      amountPaid: invoice.amount,
      appliedInvoices: [invoice.invoiceNumber],
      productsPaid: invoice.products || []
    }));
  };

  // Handle discount change
  const handleDiscountChange = (discount) => {
    const newDiscount = parseFloat(discount) || 0;
    const newAmountPaid = paymentForm.amount - newDiscount;
    setPaymentForm(prev => ({
      ...prev,
      discount: newDiscount,
      amountPaid: newAmountPaid > 0 ? newAmountPaid : 0
    }));
  };

  // Handle amount paid change
  const handleAmountPaidChange = (amountPaid) => {
    const newAmountPaid = parseFloat(amountPaid) || 0;
    setPaymentForm(prev => ({
      ...prev,
      amountPaid: newAmountPaid
    }));
  };

  // Handle client selection for new invoice
  const handleClientSelectForInvoice = (clientName) => {
    const clientData = uniqueClients.find(c => c.name === clientName);
    if (clientData) {
      setSaleForm(prev => ({
        ...prev,
        client: clientData.name,
        clientId: clientData.id,
        clientType: clientData.category || '',
        contactPerson: clientData.contactPerson || '',
        phone: clientData.phone || '',
        email: clientData.email || ''
      }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        p: isMobile ? 1.5 : 3,
        maxWidth: '1400px',
        mx: 'auto'
      }}>
        {/* Header */}
        <Fade in timeout={500}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2,
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 0.5
                  }}
                >
                  Sales Dashboard
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: '0.875rem' }}
                >
                  Manage invoices, payments, and client accounts
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <ModernButton
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  disabled={loading}
                  size={isMobile ? 'small' : 'medium'}
                >
                  {loading ? <CircularProgress size={20} /> : 'Refresh'}
                </ModernButton>
                
                <ModernButton
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                  size={isMobile ? 'small' : 'medium'}
                >
                  Export
                </ModernButton>
                
                <ModernButton
                  variant="contained"
                  color="secondary"
                  startIcon={<PaymentIcon />}
                  onClick={handleRecordPayment}
                  size={isMobile ? 'small' : 'medium'}
                >
                  Record Payment
                </ModernButton>
                
                <ModernButton
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleNewInvoice}
                  size={isMobile ? 'small' : 'medium'}
                >
                  New Invoice
                </ModernButton>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Stats Cards */}
        <Zoom in timeout={600}>
          <Grid container spacing={2.5} sx={{ mb: 4 }}>
            <Grid item xs={6} sm={3}>
              <StatCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      mr: 1.5,
                      width: 40,
                      height: 40
                    }}
                  >
                    <ReceiptLongIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Total Invoices
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                      {formatCurrency(totals.totalAmount)}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {salesData.length} clients • {totals.pendingInvoices} pending
                </Typography>
              </StatCard>
            </Grid>

            <Grid item xs={6} sm={3}>
              <StatCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'success.main', 
                      mr: 1.5,
                      width: 40,
                      height: 40
                    }}
                  >
                    <AccountBalanceWalletIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Collected
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.25rem', color: 'success.main' }}>
                      {formatCurrency(totals.totalReceived)}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {(totals.totalReceived / totals.totalAmount * 100).toFixed(1)}% collection rate
                </Typography>
              </StatCard>
            </Grid>

            <Grid item xs={6} sm={3}>
              <StatCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: totals.totalDebt >= 0 ? 'warning.main' : 'error.main', 
                      mr: 1.5,
                      width: 40,
                      height: 40
                    }}
                  >
                    {totals.totalDebt >= 0 ? <TrendingDownIcon /> : <TrendingUpIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Outstanding
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: '1.25rem',
                        color: totals.totalDebt >= 0 ? 'warning.main' : 'error.main'
                      }}
                    >
                      {formatCurrency(Math.abs(totals.totalDebt))}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {salesData.filter(c => c.debt > 0).length} clients with debt
                </Typography>
              </StatCard>
            </Grid>

            <Grid item xs={6} sm={3}>
              <StatCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'info.main', 
                      mr: 1.5,
                      width: 40,
                      height: 40
                    }}
                  >
                    <TimelineIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Avg. Days Due
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                      {salesData.length > 0 
                        ? Math.round(salesData.reduce((sum, item) => sum + item.daysDue, 0) / salesData.length)
                        : 0
                      } days
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Across all active accounts
                </Typography>
              </StatCard>
            </Grid>
          </Grid>
        </Zoom>

        {/* Search and Filters */}
        <PremiumCard sx={{ mb: 3, p: 2.5 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <SearchField
                fullWidth
                placeholder="Search clients, invoices, guide numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: { fontSize: '0.875rem' }
                }}
              />
            </Grid>
            
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '0.875rem' }}>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                  sx={{ fontSize: '0.875rem' }}
                >
                  {clientCategories.map((category) => (
                    <MenuItem key={category} value={category} sx={{ fontSize: '0.875rem' }}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '0.875rem' }}>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  label="Status"
                  sx={{ fontSize: '0.875rem' }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{ fontSize: '0.875rem' }}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <DatePicker
                  label="Start Date"
                  value={dateRange.start}
                  onChange={(newValue) => setDateRange({ ...dateRange, start: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                  )}
                />
                <DatePicker
                  label="End Date"
                  value={dateRange.end}
                  onChange={(newValue) => setDateRange({ ...dateRange, end: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedStatus('all');
                }}
                size="small"
                sx={{ fontSize: '0.875rem' }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </PremiumCard>

        {/* Main Content */}
        <PremiumCard>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{ minHeight: 48 }}
            >
              <Tab 
                label="Client Accounts" 
                sx={{ fontSize: '0.875rem', fontWeight: 500, minHeight: 48 }}
              />
              <Tab 
                label="Pending Invoices" 
                sx={{ fontSize: '0.875rem', fontWeight: 500, minHeight: 48 }}
              />
              <Tab 
                label="Payment History" 
                sx={{ fontSize: '0.875rem', fontWeight: 500, minHeight: 48 }}
              />
              <Tab 
                label="Products" 
                sx={{ fontSize: '0.875rem', fontWeight: 500, minHeight: 48 }}
              />
            </Tabs>
          </Box>

          {/* Client Accounts Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box>
              <StyledTableContainer>
                <Table size={isMobile ? 'small' : 'medium'} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '3%' }}></TableCell>
                      <TableCell sx={{ width: '25%' }}>Client</TableCell>
                      {!isMobile && <TableCell sx={{ width: '12%' }}>Guide No.</TableCell>}
                      {!isMobile && <TableCell sx={{ width: '10%' }}>Category</TableCell>}
                      <TableCell sx={{ width: '12%' }} align="right">Total</TableCell>
                      <TableCell sx={{ width: '12%' }} align="right">Received</TableCell>
                      <TableCell sx={{ width: '12%' }} align="right">Balance</TableCell>
                      <TableCell sx={{ width: '10%' }}>Status</TableCell>
                      <TableCell sx={{ width: '8%' }} align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((row) => (
                      <React.Fragment key={row.id}>
                        <TableRow 
                          hover
                          sx={{ 
                            backgroundColor: expandedRows[row.id] ? 
                              (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)') : 
                              'inherit'
                          }}
                          onClick={() => setExpandedRows(prev => ({ ...prev, [row.id]: !prev[row.id] }))}
                        >
                          <TableCell>
                            <IconButton 
                              size="small" 
                              onClick={(e) => toggleFavorite(row.id, e)}
                              sx={{ p: 0.5 }}
                            >
                              {favorites.includes(row.id) ? (
                                <StarIcon sx={{ color: '#FFD700', fontSize: 18 }} />
                              ) : (
                                <StarBorderIcon sx={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar 
                                sx={{ 
                                  width: 32, 
                                  height: 32,
                                  fontSize: '0.875rem',
                                  bgcolor: theme.palette.primary.main
                                }}
                              >
                                {row.client.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontWeight: 500,
                                    fontSize: '0.8125rem'
                                  }}
                                >
                                  {isMobile && row.client.length > 20 
                                    ? `${row.client.substring(0, 20)}...` 
                                    : row.client}
                                </Typography>
                                {isMobile && (
                                  <Typography variant="caption" color="text.secondary">
                                    Guide: {row.guideNumber} • {row.category}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          {!isMobile && (
                            <TableCell>
                              <Typography variant="body2" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                                {row.guideNumber}
                              </Typography>
                            </TableCell>
                          )}
                          {!isMobile && (
                            <TableCell>
                              <Chip 
                                label={row.category} 
                                size="small" 
                                variant="outlined"
                                sx={{ fontSize: '0.75rem' }}
                              />
                            </TableCell>
                          )}
                          <TableCell align="right">
                            <Typography sx={{ 
                              fontWeight: 500,
                              fontSize: '0.8125rem'
                            }}>
                              {formatCurrency(row.totalAmount)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography sx={{ 
                              color: 'success.main',
                              fontWeight: 500,
                              fontSize: '0.8125rem'
                            }}>
                              {formatCurrency(row.amountReceived)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography 
                              sx={{ 
                                fontWeight: 600,
                                fontSize: '0.8125rem',
                                color: row.debt >= 0 ? 'warning.main' : 'error.main'
                              }}
                            >
                              {formatCurrency(row.debt)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                              color={getStatusColor(row.status)}
                              size="small"
                              sx={{ 
                                fontSize: '0.75rem',
                                height: 22
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                              <Tooltip title="Record Payment">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClientSelectForPayment(row.id);
                                    setPaymentDialogOpen(true);
                                  }}
                                  sx={{ fontSize: '0.875rem' }}
                                >
                                  <PaymentIcon fontSize="inherit" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View Details">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedClient(row);
                                    setViewInvoicesDialogOpen(true);
                                  }}
                                  sx={{ fontSize: '0.875rem' }}
                                >
                                  <VisibilityIcon fontSize="inherit" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={isMobile ? 8 : 9} style={{ padding: 0 }}>
                            <Collapse in={expandedRows[row.id]} timeout="auto" unmountOnExit>
                              <Box sx={{ 
                                p: 2.5, 
                                bgcolor: theme.palette.mode === 'dark' 
                                  ? 'rgba(255,255,255,0.02)' 
                                  : 'rgba(0,0,0,0.02)',
                                borderBottom: `1px solid ${theme.palette.divider}`
                              }}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.875rem' }}>
                                      Products
                                    </Typography>
                                    <List dense disablePadding>
                                      {(row.products || []).slice(0, 3).map((product, idx) => (
                                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                                          <ListItemIcon sx={{ minWidth: 36 }}>
                                            <InventoryIcon sx={{ fontSize: 16 }} />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={
                                              <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                                                {product.name} ({product.code})
                                              </Typography>
                                            }
                                            secondary={
                                              <Typography variant="caption" color="text.secondary">
                                                {product.quantity} × {formatCurrency(product.price)} = {formatCurrency(product.total || product.quantity * product.price)}
                                              </Typography>
                                            }
                                          />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.875rem' }}>
                                      Current Invoices ({row.currentInvoices.length})
                                    </Typography>
                                    {row.currentInvoices.length > 0 ? (
                                      <List dense disablePadding>
                                        {row.currentInvoices.map((invoice, idx) => (
                                          <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                              <Chip
                                                label={invoice.status}
                                                color={getInvoiceStatusColor(invoice.status)}
                                                size="small"
                                                sx={{ fontSize: '0.75rem', height: 20 }}
                                              />
                                            </ListItemIcon>
                                            <ListItemText
                                              primary={
                                                <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                                                  Guide #{invoice.guideNumber} • Invoice #{invoice.invoiceNumber}
                                                </Typography>
                                              }
                                              secondary={
                                                <Typography variant="caption" color="text.secondary">
                                                  Due: {format(parseISO(invoice.dueDate), 'dd/MM/yyyy')} • {formatCurrency(invoice.amount)}
                                                </Typography>
                                              }
                                            />
                                          </ListItem>
                                        ))}
                                      </List>
                                    ) : (
                                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8125rem' }}>
                                        No pending invoices
                                      </Typography>
                                    )}
                                  </Grid>
                                </Grid>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>

              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ px: 2, py: 1.5 }}
              />

              {/* Summary */}
              <Box sx={{ 
                p: 2, 
                borderTop: 1, 
                borderColor: 'divider',
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.02)' 
                  : 'rgba(0,0,0,0.02)'
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Showing
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {paginatedData.length} of {filteredData.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Total Value
                    </Typography>
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                      {formatCurrency(filteredData.reduce((sum, item) => sum + item.totalAmount, 0))}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Pending Invoices
                    </Typography>
                    <Typography variant="body2" color="warning.main" sx={{ fontWeight: 500 }}>
                      {filteredData.reduce((sum, item) => sum + item.currentInvoices.length, 0)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Collection Rate
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                      {filteredData.length > 0
                        ? `${Math.round(
                            (filteredData.reduce((sum, item) => sum + item.amountReceived, 0) /
                              filteredData.reduce((sum, item) => sum + item.totalAmount, 0)) *
                              100
                          )}%`
                        : '0%'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </TabPanel>

          {/* Pending Invoices Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '0.875rem', mb: 2 }}>
                All Pending Invoices
              </Typography>
              <StyledTableContainer>
                <Table size={isMobile ? 'small' : 'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Client</TableCell>
                      <TableCell>Guide #</TableCell>
                      <TableCell>Invoice #</TableCell>
                      {!isMobile && <TableCell>Supply Date</TableCell>}
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesData.flatMap(client => 
                      client.currentInvoices.map((invoice, idx) => (
                        <TableRow key={`${client.id}-${idx}`}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                              {isMobile && client.client.length > 15 
                                ? `${client.client.substring(0, 15)}...` 
                                : client.client}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ 
                              fontFamily: 'monospace',
                              fontSize: '0.8125rem',
                              fontWeight: 500
                            }}>
                              {invoice.guideNumber}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ 
                              fontFamily: 'monospace',
                              fontSize: '0.8125rem'
                            }}>
                              {invoice.invoiceNumber}
                            </Typography>
                          </TableCell>
                          {!isMobile && (
                            <TableCell sx={{ fontSize: '0.8125rem' }}>
                              {format(parseISO(invoice.date), 'dd/MM/yyyy')}
                            </TableCell>
                          )}
                          <TableCell align="right">
                            <Typography sx={{ 
                              fontWeight: 500,
                              fontSize: '0.8125rem'
                            }}>
                              {formatCurrency(invoice.amount)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography 
                              sx={{ 
                                fontSize: '0.8125rem',
                                color: invoice.status === 'overdue' ? 'error.main' : 'inherit'
                              }}
                            >
                              {format(parseISO(invoice.dueDate), 'dd/MM/yyyy')}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={invoice.status}
                              color={getInvoiceStatusColor(invoice.status)}
                              size="small"
                              sx={{ 
                                fontSize: '0.75rem',
                                height: 22
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                handleClientSelectForPayment(client.id);
                                handleInvoiceSelectForPayment(invoice);
                                setPaymentDialogOpen(true);
                              }}
                              sx={{ fontSize: '0.75rem', py: 0.5 }}
                            >
                              Pay
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Box>
          </TabPanel>

          {/* Payment History Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '0.875rem', mb: 2 }}>
                Recent Payment History
              </Typography>
              <StyledTableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      {!isMobile && <TableCell>Client</TableCell>}
                      <TableCell>Guide No.</TableCell>
                      <TableCell>VD No.</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Method</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesData.flatMap(client => 
                      client.paymentHistory
                        .filter(t => t.type !== 'invoice')
                        .map((payment, idx) => (
                          <TableRow key={`${client.id}-${idx}`}>
                            <TableCell sx={{ fontSize: '0.8125rem' }}>
                              {format(parseISO(payment.date), 'dd/MM/yyyy')}
                            </TableCell>
                            {!isMobile && (
                              <TableCell sx={{ fontSize: '0.8125rem' }}>
                                {client.client}
                              </TableCell>
                            )}
                            <TableCell>
                              <Typography variant="body2" sx={{ 
                                fontFamily: 'monospace',
                                fontSize: '0.8125rem'
                              }}>
                                {payment.guideNumber}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ 
                                fontFamily: 'monospace',
                                fontSize: '0.8125rem'
                              }}>
                                {payment.vdNumber}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography sx={{ 
                                color: 'success.main', 
                                fontWeight: 500,
                                fontSize: '0.8125rem'
                              }}>
                                {formatCurrency(payment.amount)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography sx={{ 
                                color: payment.discount > 0 ? 'warning.main' : 'text.secondary',
                                fontSize: '0.8125rem'
                              }}>
                                {payment.discount > 0 ? `-${formatCurrency(payment.discount)}` : '-'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={payment.type}
                                color={payment.type === 'full' ? 'success' : 'info'}
                                size="small"
                                sx={{ 
                                  fontSize: '0.75rem',
                                  height: 22
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.8125rem' }}>
                              {payment.reference === 'CASH' ? '💵 Cash' : 
                               payment.reference === 'BANK' ? '🏦 Bank Transfer' : 
                               payment.reference}
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Box>
          </TabPanel>

          {/* Products Tab */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PremiumCard>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '0.875rem' }}>
                      Product Sales Summary
                    </Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Code</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Quantity Sold</TableCell>
                          <TableCell align="right">Total Revenue</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productCatalog.slice(0, 10).map((product) => {
                          const totalQuantity = salesData.reduce((sum, sale) => {
                            const saleProducts = sale.products || [];
                            const productInSale = saleProducts.find(p => p.id === product.id);
                            return sum + (productInSale?.quantity || 0);
                          }, 0);
                          
                          return (
                            <TableRow key={product.id}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.code}</TableCell>
                              <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                              <TableCell align="right">{totalQuantity}</TableCell>
                              <TableCell align="right">{formatCurrency(totalQuantity * product.price)}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </PremiumCard>
              </Grid>
            </Grid>
          </TabPanel>
        </PremiumCard>

        {/* Payment Dialog - UPDATED with discount and non-editable invoice details */}
        <Dialog
          open={paymentDialogOpen}
          onClose={() => {
            setPaymentDialogOpen(false);
            setPaymentStep(0);
            setPaymentForm({
              client: '',
              clientId: '',
              amount: 0,
              discount: 0,
              amountPaid: 0,
              date: new Date(),
              method: 'cash',
              reference: '',
              notes: '',
              appliedInvoices: [],
              paymentType: 'partial',
              guideNumber: '',
              supplyDate: new Date(),
              vdNumber: '',
              productsPaid: [],
              isPartial: true,
            });
            setSelectedInvoiceDetails(null);
            setSelectedInvoices([]);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Record Payment</DialogTitle>
          <DialogContent>
            <Stepper activeStep={paymentStep} sx={{ my: 3 }}>
              <Step><StepLabel>Select Client & Invoice</StepLabel></Step>
              <Step><StepLabel>Payment Details</StepLabel></Step>
              <Step><StepLabel>Confirmation</StepLabel></Step>
            </Stepper>

            {paymentStep === 0 && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                  <InputLabel>Select Client</InputLabel>
                  <Select
                    value={paymentForm.clientId}
                    onChange={(e) => handleClientSelectForPayment(e.target.value)}
                    label="Select Client"
                  >
                    <MenuItem value="">Select a client</MenuItem>
                    {salesData
                      .filter(client => client.debt > 0)
                      .map((client) => (
                        <MenuItem key={client.id} value={client.id}>
                          {client.client} (Balance: {formatCurrency(client.debt)})
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                {paymentForm.clientId && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
                      Select Invoice to Pay
                    </Typography>
                    {salesData.find(c => c.id === paymentForm.clientId)?.currentInvoices.length > 0 ? (
                      <Box>
                        <FormGroup>
                          {salesData
                            .find(c => c.id === paymentForm.clientId)
                            ?.currentInvoices.map((invoice, idx) => (
                              <FormControlLabel
                                key={idx}
                                control={
                                  <Checkbox
                                    checked={selectedInvoices.some(i => i.invoiceNumber === invoice.invoiceNumber)}
                                    onChange={(e) => handleInvoiceSelectForPayment(invoice)}
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body2">
                                      Guide #{invoice.guideNumber} • Invoice #{invoice.invoiceNumber}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      Due: {format(parseISO(invoice.dueDate), 'dd/MM/yyyy')} • Amount: {formatCurrency(invoice.amount)}
                                    </Typography>
                                  </Box>
                                }
                              />
                            ))}
                        </FormGroup>

                        {selectedInvoiceDetails && (
                          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Invoice Details (Read Only)
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Invoice Number
                                </Typography>
                                <Typography variant="body2">
                                  {selectedInvoiceDetails.invoiceNumber}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Date Supplied
                                </Typography>
                                <Typography variant="body2">
                                  {format(parseISO(selectedInvoiceDetails.date), 'dd/MM/yyyy')}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Amount of Invoice
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                  {formatCurrency(selectedInvoiceDetails.amount)}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Guide Number
                                </Typography>
                                <Typography variant="body2">
                                  {selectedInvoiceDetails.guideNumber}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="caption" color="text.secondary">
                                  Products Supplied
                                </Typography>
                                <List dense disablePadding>
                                  {(selectedInvoiceDetails.products || []).map((product, idx) => (
                                    <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                                      <ListItemText
                                        primary={
                                          <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                                            {product.name} ({product.code})
                                          </Typography>
                                        }
                                        secondary={
                                          <Typography variant="caption" color="text.secondary">
                                            {product.quantity} × {formatCurrency(product.price)} = {formatCurrency(product.quantity * product.price)}
                                          </Typography>
                                        }
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Alert severity="info">
                        This client has no pending invoices.
                      </Alert>
                    )}
                  </Box>
                )}
              </Box>
            )}

            {paymentStep === 1 && paymentForm.clientId && selectedInvoiceDetails && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Payment for: {paymentForm.client}
                </Typography>
                
                {/* Non-editable invoice summary */}
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Invoice Amount
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(paymentForm.amount)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Invoice Date
                      </Typography>
                      <Typography variant="body2">
                        {format(parseISO(selectedInvoiceDetails.date), 'dd/MM/yyyy')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Discount Amount (Optional)"
                      type="number"
                      value={paymentForm.discount}
                      onChange={(e) => handleDiscountChange(e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">MZN</InputAdornment>,
                      }}
                      helperText="Optional discount to apply"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Amount to Pay"
                      type="number"
                      value={paymentForm.amountPaid}
                      onChange={(e) => handleAmountPaidChange(e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">MZN</InputAdornment>,
                      }}
                      helperText="Editable payment amount"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Guide Number"
                      value={paymentForm.guideNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, guideNumber: e.target.value})}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date Supplied"
                      value={paymentForm.supplyDate}
                      onChange={(newValue) => setPaymentForm({...paymentForm, supplyDate: newValue})}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="VD Number"
                      value={paymentForm.vdNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, vdNumber: e.target.value})}
                      required
                      helperText="Payment reference number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Payment Date"
                      value={paymentForm.date}
                      onChange={(newValue) => setPaymentForm({...paymentForm, date: newValue})}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Payment Method</InputLabel>
                      <Select
                        value={paymentForm.method}
                        onChange={(e) => setPaymentForm({...paymentForm, method: e.target.value})}
                        label="Payment Method"
                      >
                        {paymentMethods.map((method) => (
                          <MenuItem key={method.value} value={method.value}>
                            {method.icon} {method.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={paymentForm.isPartial}
                          onChange={(e) => setPaymentForm({...paymentForm, isPartial: e.target.checked})}
                        />
                      }
                      label="Partial Payment"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Reference/Receipt Number"
                      value={paymentForm.reference}
                      onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Notes"
                      value={paymentForm.notes}
                      onChange={(e) => setPaymentForm({...paymentForm, notes: e.target.value})}
                      multiline
                      rows={2}
                    />
                  </Grid>
                </Grid>

                {/* Payment summary */}
                {paymentForm.discount > 0 && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2">Original Amount:</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="body2">{formatCurrency(paymentForm.amount)}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="warning.main">
                          Discount Applied:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="body2" color="warning.main">
                          -{formatCurrency(paymentForm.discount)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight="bold">
                          Amount to Pay:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="body2" fontWeight="bold" color="primary.main">
                          {formatCurrency(paymentForm.amountPaid)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            )}

            {paymentStep === 2 && selectedInvoiceDetails && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Please review payment details before confirming
                </Alert>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Client
                    </Typography>
                    <Typography variant="body2">{paymentForm.client}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Invoice Number
                    </Typography>
                    <Typography variant="body2">{selectedInvoiceDetails.invoiceNumber}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Date Supplied
                    </Typography>
                    <Typography variant="body2">
                      {format(parseISO(selectedInvoiceDetails.date), 'dd/MM/yyyy')}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Invoice Amount
                    </Typography>
                    <Typography variant="body2">{formatCurrency(selectedInvoiceDetails.amount)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Discount
                    </Typography>
                    <Typography variant="body2" color={paymentForm.discount > 0 ? 'warning.main' : 'text.secondary'}>
                      {paymentForm.discount > 0 ? `-${formatCurrency(paymentForm.discount)}` : 'None'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Amount to Pay
                    </Typography>
                    <Typography variant="body2" color="primary.main" fontWeight="bold">
                      {formatCurrency(paymentForm.amountPaid)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      VD Number
                    </Typography>
                    <Typography variant="body2">{paymentForm.vdNumber}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Payment Method
                    </Typography>
                    <Typography variant="body2">
                      {paymentMethods.find(m => m.value === paymentForm.method)?.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="caption" color="text.secondary">
                      Products in Invoice
                    </Typography>
                    <List dense disablePadding>
                      {(selectedInvoiceDetails.products || []).map((product, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                                {product.name} ({product.code})
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                {product.quantity} × {formatCurrency(product.price)} = {formatCurrency(product.quantity * product.price)}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              if (paymentStep === 0) {
                setPaymentDialogOpen(false);
              } else {
                setPaymentStep(paymentStep - 1);
              }
            }}>
              {paymentStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (paymentStep < 2) {
                  if (paymentStep === 0 && (!paymentForm.clientId || selectedInvoices.length === 0)) {
                    setSnackbar({
                      open: true,
                      message: 'Please select a client and at least one invoice',
                      severity: 'error'
                    });
                    return;
                  }
                  if (paymentStep === 1 && (!paymentForm.vdNumber || paymentForm.amountPaid <= 0)) {
                    setSnackbar({
                      open: true,
                      message: 'Please fill in all required fields',
                      severity: 'error'
                    });
                    return;
                  }
                  setPaymentStep(paymentStep + 1);
                } else {
                  handleAddPayment();
                }
              }}
              disabled={loading}
            >
              {paymentStep === 2 ? (loading ? 'Processing...' : 'Confirm Payment') : 'Next'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Sale Dialog - UPDATED with client dropdown */}
        <Dialog
          open={addSaleDialogOpen}
          onClose={() => setAddSaleDialogOpen(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Select Client *</InputLabel>
                    <Select
                      value={saleForm.client}
                      onChange={(e) => handleClientSelectForInvoice(e.target.value)}
                      label="Select Client *"
                      required
                    >
                      <MenuItem value="">Select a client</MenuItem>
                      {uniqueClients.map((client) => (
                        <MenuItem key={client.id} value={client.name}>
                          {client.name} {client.category ? `(${client.category})` : ''}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Client Type</InputLabel>
                    <Select
                      value={saleForm.clientType}
                      onChange={(e) => setSaleForm({...saleForm, clientType: e.target.value})}
                      label="Client Type"
                    >
                      {clientCategories.filter(cat => cat !== 'All').map(category => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Guide Number *"
                    value={saleForm.guideNumber}
                    onChange={(e) => setSaleForm({...saleForm, guideNumber: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Supply Date *"
                    value={saleForm.supplyDate}
                    onChange={(newValue) => setSaleForm({...saleForm, supplyDate: newValue})}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                    Products *
                  </Typography>
                  {saleForm.products.map((product, index) => (
                    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={5}>
                        <FormControl fullWidth>
                          <InputLabel>Product</InputLabel>
                          <Select
                            value={product.id}
                            onChange={(e) => handleProductChange(index, 'id', e.target.value)}
                            label="Product"
                            required
                          >
                            <MenuItem value="">Select Product</MenuItem>
                            {productCatalog.map(prod => (
                              <MenuItem key={prod.id} value={prod.id}>
                                {prod.name} ({formatCurrency(prod.price)})
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="Quantity"
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 1)}
                          required
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          fullWidth
                          label="Price"
                          type="number"
                          value={product.price}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">MZN</InputAdornment>,
                          }}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <IconButton 
                          onClick={() => removeProductRow(index)}
                          color="error"
                          disabled={saleForm.products.length === 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  
                  <Button
                    startIcon={<AddIcon />}
                    onClick={addProductRow}
                    variant="outlined"
                    size="small"
                  >
                    Add Product
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Discount"
                    type="number"
                    value={saleForm.discount}
                    onChange={(e) => setSaleForm({...saleForm, discount: parseFloat(e.target.value) || 0})}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">MZN</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Due Date"
                    value={saleForm.dueDate}
                    onChange={(newValue) => setSaleForm({...saleForm, dueDate: newValue})}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Subtotal:</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="subtitle2">
                          {formatCurrency(saleForm.products.reduce((sum, p) => sum + (p.quantity * p.price), 0))}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Discount:</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="subtitle2" color="warning.main">
                          -{formatCurrency(saleForm.discount)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h6">Total:</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="h6" color="primary.main">
                          {formatCurrency(calculateSaleTotal())}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddSaleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddSale}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Invoice'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Invoices Dialog */}
        <Dialog
          open={viewInvoicesDialogOpen}
          onClose={() => setViewInvoicesDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedClient ? `Invoices for ${selectedClient.client}` : 'Client Invoices'}
          </DialogTitle>
          <DialogContent>
            {selectedClient && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Current Invoices ({selectedClient.currentInvoices.length})
                </Typography>
                {selectedClient.currentInvoices.length > 0 ? (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Guide #</TableCell>
                        <TableCell>Invoice #</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedClient.currentInvoices.map((invoice, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{invoice.guideNumber}</TableCell>
                          <TableCell>{invoice.invoiceNumber}</TableCell>
                          <TableCell>{format(parseISO(invoice.date), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>{format(parseISO(invoice.dueDate), 'dd/MM/yyyy')}</TableCell>
                          <TableCell align="right">{formatCurrency(invoice.amount)}</TableCell>
                          <TableCell>
                            <Chip
                              label={invoice.status}
                              color={getInvoiceStatusColor(invoice.status)}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography>No pending invoices</Typography>
                )}
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Products in Last Invoice
                </Typography>
                {(selectedClient.products || []).length > 0 ? (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedClient.products.map((product, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.code}</TableCell>
                          <TableCell align="right">{product.quantity}</TableCell>
                          <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                          <TableCell align="right">{formatCurrency(product.total || product.quantity * product.price)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography>No product information available</Typography>
                )}
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Payment History
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Guide #</TableCell>
                      <TableCell>VD #</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Reference</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedClient.paymentHistory
                      .filter(p => p.type !== 'invoice')
                      .map((payment, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{format(parseISO(payment.date), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>{payment.guideNumber}</TableCell>
                          <TableCell>{payment.vdNumber}</TableCell>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>
                            {payment.discount > 0 ? `-${formatCurrency(payment.discount)}` : '-'}
                          </TableCell>
                          <TableCell>{payment.reference}</TableCell>
                          <TableCell align="right">
                            <Typography color="success.main">
                              {formatCurrency(payment.amount)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewInvoicesDialogOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%', borderRadius: 2 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default Sales;