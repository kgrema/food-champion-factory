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
  const [newOrder, setNewOrder] = useState({
    client: '',
    deliveryDate: '',
    products: [{ id: '', quantity: 1, price: 0, total: 0 }],
    discount: 0
  });

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
    { id: 'SM12P', name: 'SAMOSSA12-PEIXE', price: 'MZN 155.00', category: 'SAMOSSA 12Uni' },
    { id: 'SM12I', name: 'SAMOSSA12-INTEGRAL', price: 'MZN 155.00', category: 'SAMOSSA 12Uni' },
    { id: 'SM24B', name: 'SAMOSSA24-BEEF', price: 'MZN 225.00', category: 'SAMOSSA 24Uni' },
    { id: 'SM24F', name: 'SAMOSSA24-FRANGO', price: 'MZN 225.00', category: 'SAMOSSA 24Uni' },
    { id: 'SM24P', name: 'SAMOSSA24-FRANGO', price: 'MZN 225.00', category: 'SAMOSSA 24Uni' },
    { id: 'SM24I', name: 'SAMOSSA24-CAMARAO', price: 'MZN 225.00', category: 'SAMOSSA 24Uni' },
    { id: 'SP12B', name: 'SPRINGROLL12-BEEF', price: 'MZN 180.00', category: 'SPRING ROLL 12 Uni' },
    { id: 'SP12F', name: 'SPRINGROLL12-FRANGO', price: 'MZN 180.00', category: 'SPRING ROLL 12 Uni' },
    { id: 'SP24B', name: 'SPRINGROLL24-BEEF', price: 'MZN 225.00', category: 'SPRING ROLL 24 Uni' },
    { id: 'SP24F', name: 'SPRINGROLL24-FRANGO', price: 'MZN 225.00', category: 'SPRING ROLL 24 Uni' },
    { id: 'RS12F', name: 'RESSOIS12-FRANGO', price: 'MZN 180.00', category: 'RESSOIS 12 Uni' },
    { id: 'RS12C', name: 'RESSOIS12-CAMARAO', price: 'MZN 195.00', category: 'RESSOIS 12 Uni' },
    { id: 'RS24F', name: 'RESSOIS24-FRANGO', price: 'MZN 225.00', category: 'RESSOIS 24 Uni' },
    { id: 'RS24C', name: 'RESSOIS24-CAMARAO', price: 'MZN 225.00', category: 'RESSOIS 24 Uni' },
    { id: 'S300VN', name: 'SORVET300ML-VANILLA', price: 'MZN 75.00', category: 'SORVET 300ML' },
    { id: 'S300CH', name: 'SORVET300ML-CHOCOLATE', price: 'MZN 75.00', category: 'SORVET 300ML' },
    { id: 'S300MO', name: 'SORVET300ML-MORANGO', price: 'MZN 75.00', category: 'SORVET 300ML' },
    { id: 'S300MA', name: 'SORVET300ML-MARACUJA', price: 'MZN 75.00', category: 'SORVET 300ML' },
    { id: 'S300BL', name: 'SORVET300ML-BLUEBERRY', price: 'MZN 75.00', category: 'SORVET 300ML' },
    { id: 'S300CA', name: 'SORVET300ML-CARAMELO', price: 'MZN 75.00', category: 'SORVET 300ML' },
    { id: 'S300CC', name: 'SORVET300ML-COOKIES&CREAM', price: 'MZN 75.00', category: 'SORVET 300ML' },
    { id: 'S5LVN', name: 'SORVET5L-VANILLA', price: 'MZN 800.00', category: 'SORVET 5L' },
    { id: 'S5LCH', name: 'SORVET5L-CHOCOLATE', price: 'MZN 800.00', category: 'SORVET 5L' },
    { id: 'S5LMO', name: 'SORVET5L-MORANGO', price: 'MZN 800.00', category: 'SORVET 5L' },
    { id: 'S5LMA', name: 'SORVET5L-MARACUJA', price: 'MZN 800.00', category: 'SORVET 5L' },
    { id: 'S5LBL', name: 'SORVET5L-BLUEBERRY', price: 'MZN 800.00', category: 'SORVET 5L' },
    { id: 'S5LCA', name: 'SORVET5L-CARAMELO', price: 'MZN 800.00', category: 'SORVET 5L' },
    { id: 'S5LCC', name: 'SORVET5L-COOKIES&CREAM', price: null, category: 'SORVET 5L' },
    { id: 'SMLVN', name: 'SORVETML-VANILLA', price: null, category: 'SORVET ML' },
    { id: 'SMLCH', name: 'SORVETML-CHOCOLATE', price: null, category: 'SORVET ML' },
    { id: 'SMLMO', name: 'SORVETML-MORANGO', price: null, category: 'SORVET ML' },
    { id: 'SMLMA', name: 'SORVETML-MARACUJA', price: null, category: 'SORVET ML' },
    { id: 'SMLBL', name: 'SORVETML-BLUEBERRY', price: null, category: 'SORVET ML' },
    { id: 'SMLCA', name: 'SORVETML-CARAMELO', price: null, category: 'SORVET ML' },
    { id: 'SMLCC', name: 'SORVETML-COOKIES&CREAM', price: null, category: 'SORVET ML' },
    { id: 'S15LVN', name: 'SORVET15L-VANILLA', price: null, category: 'SORVET ML' },
    { id: 'S15LCH', name: 'SORVET15L-CHOCOLATE', price: null, category: 'SORVET 15L' },
    { id: 'S15LMO', name: 'SORVET15L-MORANGO', price: null, category: 'SORVET 15L' },
    { id: 'S15LMA', name: 'SORVET15L-MARACUJA', price: null, category: 'SORVET 15L' },
    { id: 'S15LBL', name: 'SORVET15L-BLUEBERRY', price: null, category: 'SORVET 15L' },
    { id: 'S15LCA', name: 'SORVET15L-CARAMELO', price: null, category: 'SORVET 15L' },
    { id: 'S15LCC', name: 'SORVET15L-COOKIES&CREAM', price: null, category: 'SORVET 15L' },
    { id: 'RECHFRA', name: 'RECHEIO DE FRANCO', price: null, category: 'RECHEIO' },
    { id: 'RECHBIF', name: 'RECHEIO DE BEEF', price: null, category: 'RECHEIO' },
    { id: 'RECHPEX', name: 'RECHEIO DE PEIXE', price: null, category: 'RECHEIO' },
    { id: 'RECHCAM', name: 'RECHEIO DE CAMARAO', price: null, category: 'RECHEIO' },
    { id: 'CREMLEITCAM', name: 'CREME DE LEITE PARA RESSOIS CAMARAO', price: null, category: 'CREAM' },
    { id: 'CREMLEITCHK', name: 'CREME DE LEITE PARA RESSOIS DE FRANGO', price: null, category: 'CREAM' },
    { id: 'MASSARESS', name: 'MASSA DE RESSOIS', price: 'MZN 223.34', category: 'MASSA' },
    { id: 'MASSACHM', name: 'MASSA DE CHAMUSSA', price: 'MZN 318.98', category: 'MASSA' },
    { id: 'MASSASPRL', name: 'MASSA DE SPRING ROLL', price: 'MZN 316.78', category: 'MASSA' },
  ];
  
  // Inventory data (in real app, this would come from Inventory.js)
  const inventoryData = [
    { id: 'SMPLATES', name: '12 Uni SAMOSSA PLATE', stock: 6000, reorder: 1000 },
    { id: 'BSMSTICKER', name: 'BEEF SAMOSSA STICKER', stock: 3625, reorder: 600 },
    { id: 'FSMSTICKER', name: 'FRANCO SAMOSSA STICKER', stock: 3625, reorder: 600 },
    { id: 'PSMSTICKER', name: 'PEIXE SAMOSSA STICKER', stock: 3625, reorder: 600 },
    { id: 'ISMSTICKER', name: 'INTEGRAL SAMOSSA STICKER', stock: 3625, reorder: 600 },
    { id: 'BSPSTICKER', name: 'BEEF SPRING ROLLSTICKER', stock: 3625, reorder: 600 },
    { id: 'FSPSTICKER', name: 'FRANCO SPRING ROLL STICKER', stock: 3625, reorder: 600 },
    { id: 'FRSSTICKER', name: 'FRANCO RESSOLE STICKER', stock: 3625, reorder: 600 },
    { id: 'CRSSTICKER', name: 'CAMARAO RESSOLE STICKER', stock: 3625, reorder: 600 },
    { id: 'BSMBOX', name: 'BEEF SAMOSSA BOX', stock: 1500, reorder: 500 },
    { id: 'FSMBOX', name: 'FRANCO SAMOSSA BOX', stock: 1500, reorder: 500 },
    { id: 'PSMBOX', name: 'PEIXE SAMOSSA BOX', stock: 1500, reorder: 500 },
    { id: 'ISMBOX', name: 'INTEGRAL SAMOSSA BOX', stock: 1500, reorder: 500 },
    { id: 'BSPBOX', name: 'BEEF SPRING ROLL BOX', stock: 1500, reorder: 500 },
    { id: 'FSPBOX', name: 'FRANGO SPRING ROLL BOX', stock: 1500, reorder: 500 },
    { id: 'FRSBOX', name: 'FRANGO RESSOLE BOX', stock: 1500, reorder: 500 },
    { id: 'CRSBOX', name: 'CAMARAO RESSOLE BOX', stock: 1500, reorder: 500 },
    { id: 'VA300MLICSTKER', name: 'VANILLA 300ML ICE-CREAM STICKER', stock: 4000, reorder: 500 },
    { id: 'MO300MLICSTKER', name: 'MORANGO 300ML ICE-CREAM STICKER', stock: 4000, reorder: 500 },
    { id: 'CH300MLICSTKER', name: 'CHOCOLATE 300ML ICE-CREAM STICKER', stock: 4000, reorder: 500 },
    { id: 'MA300MLICSTKER', name: 'MARACUJA 300ML ICE-CREAM STICKER', stock: 4000, reorder: 500 },
    { id: 'CA300MLICSTKER', name: 'CARAMELO 300ML ICE-CREAM STICKERS', stock: 4000, reorder: 500 },
    { id: 'CC300MLICSTKER', name: 'COOKIES & CREAM 300ML ICE-CREAM STICKER', stock: 4000, reorder: 500 },
    { id: 'BB300MLCSTKER', name: 'BLUE BERRY 300ML ICE-CREAM STICKER', stock: 4000, reorder: 500 },
    { id: 'VA5LICSTICKER', name: 'VANILLA 5L ICE-CREAM STICKER', stock: 21, reorder: 5 },
    { id: 'MO5LICSTICKER', name: 'MORANGO 5L ICE-CREAM STICKER', stock: 12, reorder: 5 },
    { id: 'CH5LICSTICKER', name: 'CHOCOLATE 5L ICE-CREAM STICKER', stock: 36, reorder: 5 },
    { id: 'MA5LICSTICKER', name: 'MARACUJA 5L ICE-CREAM STICKER', stock: 21, reorder: 5 },
    { id: 'CA5LICSTICKER', name: 'CARAMELO 5L ICE-CREAM STICKERS', stock: 20, reorder: 5 },
    { id: 'CC5LICSTICKER', name: 'COOKIES & CREAM 5L ICE-CREAM STICKER', stock: 17, reorder: 5 },
    { id: 'BB5LICSTICKER', name: 'BLUE BERRY 5L ICE-CREAM STICKER', stock: 12, reorder: 5 },
    { id: 'FETALID', name: 'FETA TAB LID', stock: 12000, reorder: 1000 },
    { id: 'FETATAB', name: 'FETA TAB 300ML', stock: 12000, reorder: 1000 },
    { id: 'LID5L', name: '5L LID', stock: 4000, reorder: 500 },
    { id: '5LTAB', name: '5L TAB', stock: 4000, reorder: 500 },
    { id: '1KGTRIGO', name: '1KG TRIGO', stock: 67, reorder: 20 },
    { id: 'LEITCOND', name: '500ML LEITE CONDENSADO', stock: 0, reorder: 6 },
    { id: 'COOKINGOIL', name: '1LTR COOKING OIL', stock: 0, reorder: 0 },
    { id: 'PEIXESERA', name: '1KG PEIXE SERRA', stock: 0, reorder: 0 },
    { id: 'PEIXECHER', name: '1KG PEIXE CHERUA', stock: 0, reorder: 0 },
    { id: 'CAMAPESCA', name: '1KG CAMARAO', stock: 0, reorder: 0 },
    { id: 'CAMALUCA', name: '1KG CAMARAO', stock: 0, reorder: 0 },
    { id: 'CNMOIDA', name: '1KG CARNE MOIDO', stock: 0, reorder: 0 },
    { id: 'FISHSPICE', name: '1K FISH SPICE', stock: 1350, reorder: 150 },
    { id: 'BEEFSPICE', name: '1KG BIFE SPICE', stock: 20000, reorder: 1000 },
    { id: 'CHKNSPICE', name: 'IKG CHICKEN SPICE', stock: 2000, reorder: 200 },
    { id: 'GRNPEPPER', name: '1KG GROUND PEPPER', stock: 0, reorder: 0 },
    { id: 'PLMFAT', name: '1KG PALM FAT', stock: 215, reorder: 25 },
    { id: 'WHEYPD', name: 'WHEY POWDER', stock: 100000, reorder: 25000 },
    { id: 'EKOM', name: 'EKOMUL KREM 532 XTI', stock: 25450, reorder: 5000 },
    { id: 'CMC', name: 'CMC 100', stock: 20000, reorder: 1000 },
    { id: 'BUTTERMLK', name: 'BUTTER MILK POWDER', stock: 95000, reorder: 25000 },
    { id: 'SKMMLK', name: 'SKIMMED MILK POWDER', stock: 95000, reorder: 25000 },
    { id: 'VANFLVOR', name: '1KG VANILLA FLAVOUR POWDER', stock: 0, reorder: 0 },
    { id: 'STRWFLVOR', name: '1KG STRAWBERRY FLAVOUR POWDER WITH COLOUR', stock: 0, reorder: 0 },
    { id: 'MXBRYFLVOR', name: '1KG MIXED BERRY FLAVOUR POWDER WITH COLOUR', stock: 0, reorder: 0 },
    { id: 'C&CFLVOR', name: '1KG COOKIES & CREAM FLAVOUR POWDER WITH COLOUR', stock: 0, reorder: 0 },
    { id: 'CARFLVOR', name: '1KG CARAMELO FLAVOUR POWDER WITH COLOUR', stock: 0, reorder: 0 },
    { id: 'CHOCFLVOR', name: '25KG CHOCLATE FLAVOUR POWDER WITH COLOUR', stock: 0, reorder: 0 },
    { id: 'MARCFLVOR', name: '1KG MARACUJA FLAVOUR POWDER', stock: 0, reorder: 0 },
    { id: 'FINOWHP', name: '1KG FINOWHIP - WHIP CREAM POWDER', stock: 18, reorder: 5 },
    { id: 'CHEDCHFLV', name: '1KG CHEDDER CHEESE FLAVOR', stock: 0.5, reorder: 0.1 },
    { id: 'SPOONS', name: 'ICE-CREAM SPOONS', stock: 14000, reorder: 1000 },
    { id: 'CLINGRAP', name: 'CLING WRAP', stock: 2, reorder: 1 },
    { id: 'WHTSUGAR', name: 'IKG WHITE SUGAR', stock: 6, reorder: 6 },
    { id: 'AGUA', name: 'PURE WATER', stock: 10000000000000, reorder: 500 },
    { id: 'SALT', name: '1KG IODIZED FINE SALT', stock: 0.5, reorder: 0.25 },
    { id: 'ONION', name: '1KG RAW ONION', stock: 9, reorder: 4 },
    { id: 'ONIONPWD', name: '100G ONION POWDER', stock: 400, reorder: 100 },
    { id: 'ROSMRY', name: '200G ROSMARY SPICE', stock: 182, reorder: 20 },
    { id: 'LOURO', name: '90G FOLHA DE LOURO', stock: 86, reorder: 5 },
    { id: 'CKCALDO', name: '1PACKET - 17G CHICKEN CALDO BENNY', stock: 30, reorder: 10 },
    { id: 'GALIC', name: '1KG GARLIC HEADS', stock: 0.94, reorder: 2 },
    { id: 'GALICPWD', name: '100G GALIC POWDER', stock: 400, reorder: 100 },
    { id: 'CORNSTCH', name: '500G MAIZENA - CORN STARCH', stock: 500, reorder: 100 },
    { id: 'GINGERPWD', name: '100G GINGER POWDER', stock: 500, reorder: 100 },
    { id: 'CUMINPWD', name: '100G CUMING POWDER - JEERA', stock: 1000, reorder: 100 },
    { id: 'RAJAPWD', name: '50G RAJA POWDER', stock: 100, reorder: 50 },
    { id: 'PETFRANCO', name: '1KG PEITO DE FRANGO', stock: 6, reorder: 2 }
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

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...newOrder.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };

    // If product is selected, update price and calculate total
    if (field === 'id' && value) {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        updatedProducts[index].name = selectedProduct.name;
        // Extract numeric price from string like "MZN 155.00"
        const priceStr = selectedProduct.price || 'MZN 0';
        updatedProducts[index].price = parseFloat(priceStr.replace('MZN ', '').replace(',', '')) || 0;
        updatedProducts[index].total = updatedProducts[index].price * updatedProducts[index].quantity;
      }
    }

    // If quantity changes, update total
    if (field === 'quantity') {
      updatedProducts[index].quantity = parseInt(value) || 0;
      updatedProducts[index].total = updatedProducts[index].price * updatedProducts[index].quantity;
    }

    setNewOrder({ ...newOrder, products: updatedProducts });
  };

  const addProductRow = () => {
    setNewOrder({
      ...newOrder,
      products: [...newOrder.products, { id: '', quantity: 1, price: 0, total: 0 }]
    });
  };

  const removeProductRow = (index) => {
    if (newOrder.products.length > 1) {
      const updatedProducts = newOrder.products.filter((_, i) => i !== index);
      setNewOrder({ ...newOrder, products: updatedProducts });
    }
  };

  const calculateOrderTotal = () => {
    return newOrder.products.reduce((sum, p) => sum + p.total, 0) - newOrder.discount;
  };

  const handleCreateOrderSubmit = () => {
    // Validate form
    if (!newOrder.client || !newOrder.deliveryDate) {
      alert('Please fill in client and delivery date');
      return;
    }

    if (newOrder.products.some(p => !p.id || p.quantity <= 0)) {
      alert('Please select products and enter valid quantities');
      return;
    }

    // Create the new order object
    const newOrderObj = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      client: newOrder.client,
      date: new Date().toISOString().split('T')[0],
      products: newOrder.products.map(p => ({
        name: p.name,
        quantity: p.quantity,
        price: `MZN ${p.price.toFixed(2)}`,
        total: `MZN ${p.total.toFixed(2)}`
      })),
      total: `MZN ${calculateOrderTotal().toFixed(2)}`,
      status: 'pending',
      payment: 'Pending',
      deliveryId: `DEL-${String(orders.length + 1).padStart(3, '0')}`,
      needsProduction: true,
      productionStatus: 'pending'
    };

    // Add to orders
    setOrders([...orders, newOrderObj]);
    
    // Reset form
    setNewOrder({
      client: '',
      deliveryDate: '',
      products: [{ id: '', quantity: 1, price: 0, total: 0 }],
      discount: 0
    });
    
    setOpenDialog(false);
    alert(`Order ${newOrderObj.id} created successfully!`);
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
                <Select 
                  label="Client"
                  value={newOrder.client}
                  onChange={(e) => setNewOrder({...newOrder, client: e.target.value})}
                >
                  <MenuItem value="China Mall">China Mall</MenuItem>
                  <MenuItem value="VIP Spar Beira">VIP Spar Beira</MenuItem>
                  <MenuItem value="Feliz Shopping">Feliz Shopping</MenuItem>
                  <MenuItem value="Supermercado Mil Tete">Supermercado Mil Tete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Delivery Date"
                InputLabelProps={{ shrink: true }}
                value={newOrder.deliveryDate}
                onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2">
                  Products
                </Typography>
                <Button 
                  startIcon={<Add />} 
                  size="small" 
                  onClick={addProductRow}
                >
                  Add Product
                </Button>
              </Box>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newOrder.products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <FormControl fullWidth size="small">
                            <Select
                              value={product.id}
                              onChange={(e) => handleProductChange(index, 'id', e.target.value)}
                              displayEmpty
                            >
                              <MenuItem value="">Select Product</MenuItem>
                              {products.map((p) => (
                                <MenuItem key={p.id} value={p.id}>
                                  {p.name} - {p.category}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          {product.price > 0 ? `MZN ${product.price.toFixed(2)}` : '-'}
                        </TableCell>
                        <TableCell>
                          <TextField 
                            type="number" 
                            size="small"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                            inputProps={{ min: 1 }}
                            sx={{ width: '80px' }}
                          />
                        </TableCell>
                        <TableCell>
                          {product.total > 0 ? `MZN ${product.total.toFixed(2)}` : '-'}
                        </TableCell>
                        <TableCell>
                          {newOrder.products.length > 1 && (
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => removeProductRow(index)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Discount (MZN)"
                    type="number"
                    size="small"
                    value={newOrder.discount}
                    onChange={(e) => setNewOrder({...newOrder, discount: parseFloat(e.target.value) || 0})}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 1.5, bgcolor: 'grey.100', borderRadius: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Order Total
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      MZN {calculateOrderTotal().toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Alert severity="warning">
                Note: After creating this order, the production team will be notified to check inventory availability.
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenDialog(false);
            setNewOrder({
              client: '',
              deliveryDate: '',
              products: [{ id: '', quantity: 1, price: 0, total: 0 }],
              discount: 0
            });
          }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreateOrderSubmit}>
            Create Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;