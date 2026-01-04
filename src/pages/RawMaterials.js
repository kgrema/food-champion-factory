import React, { useState, useMemo } from 'react';
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
  List,
  ListItem,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Inventory,
  Warning,
  CheckCircle,
  ShoppingBag,
  LocalShipping,
  ContentCopy,
  Info,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

// Actual data from your RAW_MATERIALS.csv
const parseRawMaterialsData = () => {
  const csvData = `Material ID,Material Name,Supplier,Unit Cost,Stock Level,Reorder Point,Expiry Tracking,RECIPES,Quantity per Batch,Batch Size,Used In Product
SMPLATES,12 Uni SAMOSSA PLATE,TAO,MZN3.50,6000.00,1000.00,No,Unnamed record,,,
BSMSTICKER,BEEF SAMOSSA STICKER,TAO,MZN0.96,3625.00,600.00,No,,,,
FSMSTICKER,FRANCO SAMOSSA STICKER,TAO,MZN0.96,3625.00,600.00,No,,,,
PSMSTICKER,PEIXE SAMOSSA STICKER,TAO,MZN0.96,3625.00,600.00,No,,,,
ISMSTICKER,INTEGRAL SAMOSSA STICKER,TAO,MZN0.96,3625.00,600.00,No,,,,
BSPSTICKER,BEEF SPRING ROLLSTICKER,TAO,MZN0.96,3625.00,600.00,No,,,,
FSPSTICKER,FRANCO SPRING ROLL STICKER,TAO,MZN0.96,3625.00,600.00,No,,,,
FRSSTICKER,FRANCO RESSOLE STICKER,TAO,MZN0.96,3625.00,600.00,No,,,,
CRSSTICKER,CAMARAO RESSOLE STICKER,TAO,MZN0.96,3625.00,600.00,No,,,,
BSMBOX,BEEF SAMOSSA BOX,TAO,MZN10.71,1500.00,500.00,No,,,,
FSMBOX,FRANCO SAMOSSA BOX,TAO,MZN10.71,1500.00,500.00,No,,,,
PSMBOX,PEIXE SAMOSSA BOX,TAO,MZN10.71,1500.00,500.00,No,,,,
ISMBOX,INTEGRAL SAMOSSA BOX,TAO,MZN10.71,1500.00,500.00,No,,,,
BSPBOX,BEEF SPRING ROLL BOX,TAO,MZN10.71,1500.00,500.00,No,,,,
FSPBOX,FRANGO SPRING ROLL BOX,TAO,MZN10.71,1500.00,500.00,No,,,,
FRSBOX,FRANGO RESSOLE BOX,TAO,MZN10.71,1500.00,500.00,No,,,,
CRSBOX,CAMARAO RESSOLE BOX,TAO,MZN10.71,1500.00,500.00,No,,,,
VA300MLICSTKER,VANILLA 300ML ICE-CREAM STICKER,TAO,MZN1.53,4000.00,500.00,No,S300VN-RECIPE-015,,,
MO300MLICSTKER,MORANGO 300ML ICE-CREAM STICKER,TAO,MZN1.53,4000.00,500.00,No,S300MO-RECIPE-005,,,
CH300MLICSTKER,CHOCOLATE 300ML ICE-CREAM STICKER,TAO,MZN1.53,4000.00,500.00,No,S300CH-RECIPE-005,,,
MA300MLICSTKER,MARACUJA 300ML ICE-CREAM STICKER,TAO,MZN1.53,4000.00,500.00,No,,,,
CA300MLICSTKER,CARAMELO 300ML ICE-CREAM STICKERS,TAO,MZN1.53,4000.00,500.00,No,S300CA-RECIPE-005,,,
CC300MLICSTKER,COOKIES & CREAM 300ML ICE-CREAM STICKER,TAO,MZN1.53,4000.00,500.00,No,"S300CC-RECIPE-005,S5LCC-RECIPE-004",,,
BB300MLCSTKER,BLUE BERRY 300ML ICE-CREAM STICKER,TAO,MZN1.53,4000.00,500.00,No,S300BL-RECIPE-005,,,
VA5LICSTICKER,VANILLA 5L ICE-CREAM STICKER,TAO,MZN33.33,21.00,5.00,No,,,,
MO5LICSTICKER,MORANGO 5L ICE-CREAM STICKER,TAO,MZN33.33,12.00,5.00,No,S5LMO-RECIPE-004,,,
CH5LICSTICKER,CHOCOLATE 5L ICE-CREAM STICKER,TAO,MZN33.33,36.00,5.00,No,S5LCH-RECIPE-004,,,
MA5LICSTICKER,MARACUJA 5L ICE-CREAM STICKER,TAO,MZN33.33,21.00,5.00,No,"S300MA-RECIPE-005,S5LMA-RECIPE-004",,,
CA5LICSTICKER,CARAMELO 5L ICE-CREAM STICKERS,TAO,MZN33.33,20.00,5.00,No,,,,
CC5LICSTICKER,COOKIES & CREAM 5L  ICE-CREAM STICKER,TAO,MZN33.33,17.00,5.00,No,,,,
BB5LICSTICKER,BLUE BERRY 5L ICE-CREAM STICKER,TAO,MZN33.33,12.00,5.00,No,,,,
FETALID,FETA TAB LID,POLYOAK,MZN10.26,12000.00,1000.00,No,"S300VN-RECIPE-002,S300MO-RECIPE-002,S300CH-RECIPE-002,S300BL-RECIPE-002,S300MA-RECIPE-002,S300CA-RECIPE-002,S300CC-RECIPE-002",,,
FETATAB,FETA TAB 300ML,POLYOAK,MZN46.08,12000.00,1000.00,No,"S300VN-RECIPE-003,S300MO-RECIPE-003,S300CH-RECIPE-003,S300BL-RECIPE-003,S300MA-RECIPE-003,S300CA-RECIPE-003,S300CC-RECIPE-003",,,
LID5L,5L LID,POLYOAK,MZN18.65,4000.00,500.00,No,"S5LCC-RECIPE-002,S5LCA-RECIPE-002,S5LBL-RECIPE-002,S5LMA-RECIPE-002,S5LMO-RECIPE-002,S5LVN-RECIPE-002,S5LCH-RECIPE-002",,,
5LTAB,5L TAB,POLYOAK,MZN48.17,4000.00,500.00,No,"S5LCC-RECIPE-003,S5LCA-RECIPE-003,S5LBL-RECIPE-003,S5LMA-RECIPE-003,S5LMO-RECIPE-003,S5LVN-RECIPE-003,S5LCH-RECIPE-003",,,
1KGTRIGO,1KG TRIGO,PEMBE,MZN75.00,67.00,20.00,Yes,"MASSARESS-RECIPE-002,MASSACHM-RECIPE-002,MASSASPRL-RECIPE-001,CREMLEITCAM-RECIPE-011,CREMLEITCHK-RECIPE-011",,,
LEITCOND,500ML LEITE CONDENSADO,MELHOR,MZN75.00,,6.00,Yes,"S300VN-RECIPE-013,S300MO-RECIPE-014,S300CH-RECIPE-014,S300BL-RECIPE-014,S300MA-RECIPE-014,S300CA-RECIPE-014,S300CC-RECIPE-014,S5LCC-RECIPE-013,S5LCA-RECIPE-013,S5LBL-RECIPE-013,S5LMA-RECIPE-013,S5LMO-RECIPE-013,S5LVN-RECIPE-013,S5LCH-RECIPE-013",,,
COOKINGOIL,1LTR COOKING OIL,COGEF,MZN120.00,,,Yes,,,,
PEIXESERA,1KG PEIXE SERRA,TIO LUIS,MZN150.00,,,Yes,,,,
PEIXECHER,1KG PEIXE CHERUA,TIO LUIS,MZN150.00,,,Yes,RECHPEX-RECIPE-001,,,
CAMAPESCA,1KG CAMARAO,PESCAMAR,MZN600.00,,,Yes,CREMLEITCAM-RECIPE-001,,,
CAMALUCA,1KG CAMARAO,LUCAS,MZN250.00,,,Yes,,,,
CNMOIDA,1KG CARNE MOIDO,MOZBIFE,MZN450.00,,,Yes,RECHBIF-RECIPE-001,,,
FISHSPICE, 1K FISH SPICE,DYNAMICO,MZN235.84,1350.00,150.00,Yes,"RECHPEX-RECIPE-006,CREMLEITCAM-RECIPE-003,CREMLEITCHK-RECIPE-003",,,
BEEFSPICE,1KG BIFE SPICE,DYNAMICO,MZN307.97,20000.00,1000.00,Yes,RECHBIF-RECIPE-006,,,
CHKNSPICE,IKG CHICKEN SPICE,DYNAMICO,MZN248.94,2000.00,200.00,Yes,"MASSARESS-RECIPE-012,MASSARESS-RECIPE-005,RECHFRA-RECIPE-006",,,
GRNPEPPER,1KG GROUND PEPPER,FELIZ SHOPPING,MZN1400.00,,,Yes,"RECHFRA-RECIPE-005,RECHBIF-RECIPE-005,RECHPEX-RECIPE-005,CREMLEITCAM-RECIPE-004,CREMLEITCHK-RECIPE-004",,,
PLMFAT,1KG PALM FAT ,NOVA SOL,MZN68.18,215.00,25.00,Yes,"S300VN-RECIPE-005,S300MO-RECIPE-006,S300CH-RECIPE-006,S300BL-RECIPE-006,S300MA-RECIPE-006,S300CA-RECIPE-006,S300CC-RECIPE-006,S5LCC-RECIPE-005,S5LCA-RECIPE-005,S5LBL-RECIPE-005,S5LMA-RECIPE-005,S5LMO-RECIPE-005,S5LVN-RECIPE-005,S5LCH-RECIPE-005,MASSARESS-RECIPE-006,MASSACHM-RECIPE-005,MASSASPRL-RECIPE-004,CREMLEITCAM-RECIPE-002,CREMLEITCHK-RECIPE-002",,,
WHEYPD,WHEY POWDER,NOVA SOL,MZN81.63,100000.00,25000.00,Yes,"S300VN-RECIPE-006,S300MO-RECIPE-007,S300CH-RECIPE-007,S300BL-RECIPE-007,S300MA-RECIPE-007,S300CA-RECIPE-007,S300CC-RECIPE-007,S5LCC-RECIPE-006,S5LCA-RECIPE-006,S5LBL-RECIPE-006,S5LMA-RECIPE-006,S5LMO-RECIPE-006,S5LVN-RECIPE-006,S5LCH-RECIPE-006,MASSARESS-RECIPE-004,MASSACHM-RECIPE-004,MASSASPRL-RECIPE-003,CREMLEITCAM-RECIPE-010,CREMLEITCHK-RECIPE-010",,,
EKOM,EKOMUL KREM 532 XTI,NOVA SOL,MZN796.21,25450.00,5000.00,Yes,"S300VN-RECIPE-011,S300MO-RECIPE-012,S300CH-RECIPE-012,S300BL-RECIPE-012,S300MA-RECIPE-012,S300CA-RECIPE-012,S300CC-RECIPE-012,S5LCC-RECIPE-011,S5LCA-RECIPE-011,S5LBL-RECIPE-011,S5LMA-RECIPE-011,S5LMO-RECIPE-011,S5LVN-RECIPE-011,S5LCH-RECIPE-011",,,
CMC,CMC 100,DYNAMIKO,MZN346.64,20000.00,1000.00,Yes,"S300VN-RECIPE-010,S300MO-RECIPE-011,S300CH-RECIPE-011,S300BL-RECIPE-011,S300MA-RECIPE-011,S300CA-RECIPE-011,S300CC-RECIPE-011,S5LCC-RECIPE-010,S5LCA-RECIPE-010,S5LBL-RECIPE-010,S5LMA-RECIPE-010,S5LMO-RECIPE-010,S5LVN-RECIPE-010,S5LCH-RECIPE-010",,,
BUTTERMLK,BUTTER MILK POWDER,NOVA SOL,MZN163.18,95000.00,25000.00,Yes,"S300VN-RECIPE-007,S300MO-RECIPE-008,S300CH-RECIPE-008,S300BL-RECIPE-008,S300MA-RECIPE-008,S300CA-RECIPE-008,S300CC-RECIPE-008,S5LCC-RECIPE-007,S5LCA-RECIPE-007,S5LBL-RECIPE-007,S5LMA-RECIPE-007,S5LMO-RECIPE-007,S5LVN-RECIPE-007,S5LCH-RECIPE-007",,,
SKMMLK,SKIMMED MILK POWDER,NOVASOL,MZN147.97,95000.00,25000.00,Yes,"S300VN-RECIPE-008,S300MO-RECIPE-009,S300CH-RECIPE-009,S300BL-RECIPE-009,S300MA-RECIPE-009,S300CA-RECIPE-009,S300CC-RECIPE-009,S5LCC-RECIPE-008,S5LCA-RECIPE-008,S5LBL-RECIPE-008,S5LMA-RECIPE-008,S5LMO-RECIPE-008,S5LVN-RECIPE-008,S5LCH-RECIPE-008",,,
VANFLVOR,1KG VANILLA FLAVOUR POWDER,NOVASOL,MZN1088.54,,,Yes,"S300VN-RECIPE-009,S5LVN-RECIPE-009",,,
STRWFLVOR,1KG STRAWBERRY FLAVOUR POWDER WITH COLOUR ,DYNAMICO,MZN1225.40,,,Yes,"S300MO-RECIPE-010,S5LMO-RECIPE-009",,,
MXBRYFLVOR,1KG MIXED BERRY FLAVOUR POWDER WITH COLOUR,DYNAMICO,MZN893.43,,,Yes,"S300BL-RECIPE-010,S5LBL-RECIPE-009",,,
C&CFLVOR,1KG COOKIES & CREAM FLAVOUR POWDER WITH COLOUR,DYNAMICO,MZN1309.55,,,Yes,"S300CC-RECIPE-010,S5LCC-RECIPE-009",,,
CARFLVOR,1KG CARAMELO FLAVOUR POWDER WITH COLOUR,DYNAMICO,MZN977.93,,,Yes,"S300CA-RECIPE-010,S5LCA-RECIPE-009",,,
CHOCFLVOR,25KG CHOCLATE FLAVOUR POWDER WITH COLOUR,DYNAMICO,MZN538.26,,,Yes,"S300CH-RECIPE-010,S5LCH-RECIPE-009",,,
MARCFLVOR,1KG MARACUJA FLAVOUR POWDER ,DYNAMICO,MZN1143.80,,,Yes,"S300MA-RECIPE-010,S5LMA-RECIPE-009",,,
FINOWHP,1KG FINOWHIP - WHIP CREAM POWDER,NOVASOL,MZN232.11,18.00,5.00,Yes,"S300VN-RECIPE-014,S300MO-RECIPE-015,S300CH-RECIPE-015,S300BL-RECIPE-015,S300MA-RECIPE-015,S300CA-RECIPE-015,S300CC-RECIPE-015,S5LCC-RECIPE-014,S5LCA-RECIPE-014,S5LBL-RECIPE-014,S5LMA-RECIPE-014,S5LMO-RECIPE-014,S5LVN-RECIPE-014,S5LCH-RECIPE-014",,,
CHEDCHFLV,1KG CHEDDER CHEESE FLAVOR,NOVASOL,MZN1014.34,0.50,0.10,Yes,MASSARESS-RECIPE-008,,,
SPOONS,ICE-CREAM SPOONS,TAO,MZN0.65,14000.00,1000.00,No,"S300VN-RECIPE-004,S300MO-RECIPE-004,S300CH-RECIPE-004,S300BL-RECIPE-004,S300MA-RECIPE-004,S300CA-RECIPE-004,S300CC-RECIPE-004",,,
CLINGRAP,CLING WRAP,FELIX SHOPPING,MZN0.59,2.00,1.00,No,,,,
WHTSUGAR,IKG WHITE SUGAR,SPERMERCADO MIL,MZN95.00,6.00,6.00,Yes,"S300VN-RECIPE-012,S300MO-RECIPE-013,S300CH-RECIPE-013,S300BL-RECIPE-013,S300MA-RECIPE-013,S300CA-RECIPE-013,S300CC-RECIPE-013,S5LCC-RECIPE-012,S5LCA-RECIPE-012,S5LBL-RECIPE-012,S5LMA-RECIPE-012,S5LMO-RECIPE-012,S5LVN-RECIPE-012,S5LCH-RECIPE-012",,,
AGUA,PURE WATER,FILTERED TAP WATER,MZN0.00,10000000000000.00,500.00,No,"S300VN-RECIPE-001,S300MO-RECIPE-001,S300CH-RECIPE-001,S300BL-RECIPE-001,S300MA-RECIPE-001,S300CA-RECIPE-001,S300CC-RECIPE-001,S5LCC-RECIPE-001,S5LCA-RECIPE-001,S5LBL-RECIPE-001,S5LMA-RECIPE-001,S5LMO-RECIPE-001,S5LVN-RECIPE-001,S5LCH-RECIPE-001,MASSARESS-RECIPE-003,MASSACHM-RECIPE-003,MASSASPRL-RECIPE-002,CREMLEITCAM-RECIPE-008,CREMLEITCHK-RECIPE-008",,,
SALT,1KG IODIZED FINE SALT,COGEF,MZN45.00,0.50,0.25,Yes,"MASSACHM-RECIPE-006,MASSASPRL-RECIPE-005",,,
ONION,1KG RAW ONION,MAQUININO,MZN60.00,9.00,4.00,No,"MASSARESS-RECIPE-007,RECHFRA-RECIPE-007,RECHBIF-RECIPE-007,RECHPEX-RECIPE-007",,,
ONIONPWD,100G ONION POWDER,SBL,MZN75.00,400.00,100.00,No,,,,
ROSMRY,200G ROSMARY SPICE,SBL ,MZN220.00,182.00,20.00,Yes,,,,
LOURO,90G FOLHA DE LOURO,FELIX SHOPPING,MZN350.00,86.00,5.00,Yes,"MASSARESS-RECIPE-009,RECHFRA-RECIPE-002,RECHBIF-RECIPE-002,RECHPEX-RECIPE-002,CREMLEITCAM-RECIPE-007,CREMLEITCHK-RECIPE-007",,,
CKCALDO,1PACKET - 17G CHICKEN CALDO BENNY ,CASA CHACHA,MZN4.88,30.00,10.00,Yes,"RECHFRA-RECIPE-004,RECHBIF-RECIPE-004,RECHPEX-RECIPE-004,CREMLEITCAM-RECIPE-005,CREMLEITCHK-RECIPE-005",,,
GALIC,1KG GARLIC HEADS,FELIX SHOPPING,MZN225.00,0.94,2.00,No,"MASSARESS-RECIPE-010,RECHFRA-RECIPE-003,RECHBIF-RECIPE-003,RECHPEX-RECIPE-003,CREMLEITCAM-RECIPE-006,CREMLEITCHK-RECIPE-006",,,
GALICPWD,100G GALIC POWDER,SBL,MZN75.00,400.00,100.00,No,,,,
CORNSTCH,500G MAIZENA - CORN STARCH,SBL,MZN110.00,500.00,100.00,Yes,"MASSARESS-RECIPE-001,MASSACHM-RECIPE-001,CREMLEITCAM-RECIPE-009,CREMLEITCHK-RECIPE-009",,,
GINGERPWD,100G GINGER POWDER,SBL,MZN95.00,500.00,100.00,Yes,,,,
CUMINPWD,100G CUMING POWDER - JEERA,SBL,MZN75.00,1000.00,100.00,No,,,,
RAJAPWD,50G RAJA POWDER,SBL,MZN35.00,100.00,50.00,Yes,MASSARESS-RECIPE-011,,,
PETFRANCO,1KG PEITO DE FRANGO,ABILIO ANTUNES,MZN275.00,6.00,2.00,Yes,"RECHFRA-RECIPE-001,CREMLEITCHK-RECIPE-001",,,
`;

  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const material = {};
    headers.forEach((header, index) => {
      material[header] = values[index] || '';
    });
    
    // Parse numeric values
    material['Stock Level'] = parseFloat(material['Stock Level']) || 0;
    material['Reorder Point'] = parseFloat(material['Reorder Point']) || 0;
    material['Unit Cost'] = material['Unit Cost'].replace('MZN', 'MZN ');
    
    return material;
  });
};

const RawMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortField, setSortField] = useState('Material Name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Parse actual data from CSV
  const rawMaterialsData = useMemo(() => parseRawMaterialsData(), []);

  // Get recipes data for "Used In" column
  const getUsedInProducts = (materialId) => {
    const recipes = rawMaterialsData.find(m => m['Material ID'] === materialId)?.['RECIPES'];
    if (!recipes) return [];
    
    // Extract recipe IDs and map to product names (simplified)
    const recipeIds = recipes.split(',').map(r => r.trim()).filter(r => r && r !== 'Unnamed record');
    
    // Group by product type based on recipe ID prefixes
    const productTypes = [];
    recipeIds.forEach(id => {
      if (id.startsWith('S300')) productTypes.push('300ml Ice Cream');
      else if (id.startsWith('S5L')) productTypes.push('5L Ice Cream');
      else if (id.startsWith('MASS')) productTypes.push('Massa');
      else if (id.startsWith('RECH')) productTypes.push('Recheio');
      else if (id.startsWith('CREM')) productTypes.push('Creme');
    });
    
    return [...new Set(productTypes)];
  };

  // Calculate material status
  const calculateStatus = (stock, reorder) => {
    if (stock <= 0) return 'out-of-stock';
    if (stock <= reorder * 0.3) return 'critical';
    if (stock <= reorder) return 'low';
    if (stock <= reorder * 1.5) return 'warning';
    return 'sufficient';
  };

  // Enhanced materials with calculated fields
  const materials = useMemo(() => {
    return rawMaterialsData.map(material => {
      const stock = material['Stock Level'];
      const reorder = material['Reorder Point'];
      const status = calculateStatus(stock, reorder);
      
      return {
        id: material['Material ID'],
        name: material['Material Name'],
        supplier: material['Supplier'],
        unitCost: material['Unit Cost'],
        stock,
        reorder,
        expiry: material['Expiry Tracking'],
        status,
        usedIn: getUsedInProducts(material['Material ID']),
        recipes: material['RECIPES'],
        quantityPerBatch: material['Quantity per Batch'],
        batchSize: material['Batch Size'],
      };
    });
  }, [rawMaterialsData]);

  const filteredMaterials = useMemo(() => {
    let filtered = materials.filter(material => {
      const matchesSearch = 
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === 'all') return matchesSearch;
      if (filter === 'critical') return matchesSearch && material.status === 'critical';
      if (filter === 'low') return matchesSearch && material.status === 'low';
      if (filter === 'warning') return matchesSearch && material.status === 'warning';
      if (filter === 'out') return matchesSearch && material.status === 'out-of-stock';
      if (filter === 'expiry') return matchesSearch && material.expiry === 'Yes';
      return matchesSearch;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField.toLowerCase().replace(' ', '')];
      let bValue = b[sortField.toLowerCase().replace(' ', '')];
      
      if (sortField === 'Stock Level') {
        aValue = a.stock;
        bValue = b.stock;
      } else if (sortField === 'Material Name') {
        aValue = a.name;
        bValue = b.name;
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [materials, searchTerm, filter, sortField, sortDirection]);

  const getStockPercentage = (stock, reorder) => {
    if (reorder === 0) return stock > 0 ? 100 : 0;
    const maxStock = Math.max(reorder * 3, stock);
    return Math.min(100, (stock / maxStock) * 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sufficient': return 'success';
      case 'warning': return 'warning';
      case 'low': return 'warning';
      case 'critical': return 'error';
      case 'out-of-stock': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sufficient': return <CheckCircle fontSize="small" />;
      default: return <Warning fontSize="small" />;
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleReorder = (material) => {
    // In a real app, this would trigger a purchase order
    setSnackbar({
      open: true,
      message: `Reorder request sent for ${material.name}`,
      severity: 'success'
    });
  };

  const stats = {
    total: materials.length,
    critical: materials.filter(m => m.status === 'critical').length,
    low: materials.filter(m => m.status === 'low' || m.status === 'warning').length,
    out: materials.filter(m => m.status === 'out-of-stock').length,
    expiry: materials.filter(m => m.expiry === 'Yes').length,
  };

  const supplierStats = materials.reduce((acc, material) => {
    if (!acc[material.supplier]) {
      acc[material.supplier] = { count: 0, materials: [] };
    }
    acc[material.supplier].count++;
    acc[material.supplier].materials.push(material.name);
    return acc;
  }, {});

  const topSuppliers = Object.entries(supplierStats)
    .map(([supplier, data]) => ({
      supplier,
      count: data.count,
      materials: data.materials.slice(0, 3), // Show first 3 materials
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const criticalMaterials = materials.filter(m => 
    m.status === 'critical' || m.status === 'out-of-stock'
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Raw Materials Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setOpenDialog(true)}
          size={window.innerWidth < 600 ? "small" : "medium"}
        >
          New Material
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
                  placeholder="Search materials by name, ID, or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
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
                <FormControl fullWidth size="small">
                  <InputLabel>Filter by Status</InputLabel>
                  <Select
                    value={filter}
                    label="Filter by Status"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Materials ({stats.total})</MenuItem>
                    <MenuItem value="critical">Critical ({stats.critical})</MenuItem>
                    <MenuItem value="low">Low Stock ({stats.low})</MenuItem>
                    <MenuItem value="out">Out of Stock ({stats.out})</MenuItem>
                    <MenuItem value="expiry">Expiry Tracking ({stats.expiry})</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3} lg={2.4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Inventory sx={{ fontSize: { xs: 30, sm: 40 }, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6">{stats.total}</Typography>
                  <Typography variant="caption" color="textSecondary">Total Materials</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2.4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Warning sx={{ fontSize: { xs: 30, sm: 40 }, color: 'error.main', mb: 1 }} />
                  <Typography variant="h6" color="error.main">{stats.critical}</Typography>
                  <Typography variant="caption" color="textSecondary">Critical</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2.4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Warning sx={{ fontSize: { xs: 30, sm: 40 }, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h6" color="warning.main">{stats.low}</Typography>
                  <Typography variant="caption" color="textSecondary">Low Stock</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2.4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <ShoppingBag sx={{ fontSize: { xs: 30, sm: 40 }, color: 'info.main', mb: 1 }} />
                  <Typography variant="h6" color="info.main">{stats.out}</Typography>
                  <Typography variant="caption" color="textSecondary">Out of Stock</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2.4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Info sx={{ fontSize: { xs: 30, sm: 40 }, color: 'secondary.main', mb: 1 }} />
                  <Typography variant="h6" color="secondary.main">{stats.expiry}</Typography>
                  <Typography variant="caption" color="textSecondary">Expiry Tracking</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Critical Stock Alerts */}
        {criticalMaterials.length > 0 && (
          <Grid item xs={12}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                '& .MuiAlert-message': { width: '100%' }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Typography variant="subtitle1">
                  ⚠️ {criticalMaterials.length} materials need urgent attention
                </Typography>
                <Button 
                  size="small" 
                  color="inherit" 
                  sx={{ mt: { xs: 1, sm: 0 } }}
                  onClick={() => setFilter('critical')}
                >
                  View All
                </Button>
              </Box>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {criticalMaterials.slice(0, 3).map((material) => (
                  <Grid item xs={12} sm={6} md={4} key={material.id}>
                    <Card variant="outlined" sx={{ borderColor: 'error.main' }}>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography variant="body2" fontWeight="bold" noWrap>
                          {material.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Stock: {material.stock} | Min: {material.reorder}
                        </Typography>
                        <Button
                          fullWidth
                          size="small"
                          variant="outlined"
                          color="error"
                          sx={{ mt: 1 }}
                          startIcon={<LocalShipping />}
                          onClick={() => handleReorder(material)}
                        >
                          Order Urgently
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Alert>
          </Grid>
        )}

        {/* Materials Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 1, sm: 2 }, overflow: 'auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
              <Typography variant="h6">
                Raw Materials Inventory ({filteredMaterials.length})
              </Typography>
              <Button 
                size="small" 
                startIcon={<ContentCopy />}
                onClick={() => {
                  navigator.clipboard.writeText(
                    filteredMaterials.map(m => `${m.id},${m.name},${m.stock}`).join('\n')
                  );
                  setSnackbar({ open: true, message: 'Data copied to clipboard', severity: 'success' });
                }}
              >
                Export
              </Button>
            </Box>
            <TableContainer sx={{ maxHeight: { xs: 400, md: 600 } }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <span>Material ID</span>
                        <IconButton size="small" onClick={() => handleSort('Material ID')}>
                          {sortField === 'Material ID' ? 
                            (sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />) : 
                            <ArrowUpward fontSize="small" color="disabled" />
                          }
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <span>Name</span>
                        <IconButton size="small" onClick={() => handleSort('Material Name')}>
                          {sortField === 'Material Name' ? 
                            (sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />) : 
                            <ArrowUpward fontSize="small" color="disabled" />
                          }
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Unit Cost</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <span>Stock</span>
                        <IconButton size="small" onClick={() => handleSort('Stock Level')}>
                          {sortField === 'Stock Level' ? 
                            (sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />) : 
                            <ArrowUpward fontSize="small" color="disabled" />
                          }
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>Reorder Point</TableCell>
                    <TableCell>Stock Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMaterials.map((material) => (
                    <TableRow key={material.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {material.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={material.name} arrow>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                            {material.name}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap sx={{ maxWidth: 100 }}>
                          {material.supplier}
                        </Typography>
                      </TableCell>
                      <TableCell>{material.unitCost}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={material.stock < material.reorder ? 'bold' : 'normal'}>
                          {material.stock.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{material.reorder.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={getStockPercentage(material.stock, material.reorder)}
                              color={getStatusColor(material.status)}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Typography variant="caption" sx={{ minWidth: 35 }}>
                            {getStockPercentage(material.stock, material.reorder).toFixed(0)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={material.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(material.status)}
                          icon={getStatusIcon(material.status)}
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1} flexWrap="wrap">
                          <IconButton size="small">
                            <Edit fontSize="small" />
                          </IconButton>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            startIcon={<LocalShipping />}
                            onClick={() => handleReorder(material)}
                            sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                          >
                            Reorder
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {filteredMaterials.length === 0 && (
              <Typography align="center" color="textSecondary" sx={{ py: 4 }}>
                No materials found
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Supplier Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Top Suppliers
            </Typography>
            <List dense>
              {topSuppliers.map((supplier, index) => (
                <ListItem 
                  key={index} 
                  divider
                  secondaryAction={
                    <Chip label={`${supplier.count} items`} size="small" color="primary" />
                  }
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {supplier.supplier}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" display="block">
                      {supplier.materials.join(', ')}
                      {supplier.materials.length < supplier.count && ` ... +${supplier.count - supplier.materials.length} more`}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Material Categories */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Material Summary
            </Typography>
            <List dense>
              <ListItem divider>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Packaging Materials
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Plates, boxes, stickers, lids
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {materials.filter(m => 
                    m.name.includes('PLATE') || 
                    m.name.includes('BOX') || 
                    m.name.includes('STICKER') || 
                    m.name.includes('LID')
                  ).length} items
                </Typography>
              </ListItem>
              <ListItem divider>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Raw Ingredients
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Meat, seafood, dairy, spices
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {materials.filter(m => 
                    m.name.includes('TRIGO') || 
                    m.name.includes('LEITE') || 
                    m.name.includes('CAMARAO') || 
                    m.name.includes('FRANGO') ||
                    m.name.includes('SPICE')
                  ).length} items
                </Typography>
              </ListItem>
              <ListItem divider>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Ice Cream Ingredients
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Flavor powders, cream, stabilizers
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {materials.filter(m => 
                    m.name.includes('FLAVOUR') || 
                    m.name.includes('CREAM') || 
                    m.name.includes('WHEY') ||
                    m.name.includes('MILK')
                  ).length} items
                </Typography>
              </ListItem>
              <ListItem>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Expiry Tracking Required
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Materials with Yes in Expiry Tracking
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {stats.expiry} items
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* New Material Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Raw Material</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Material ID" size="small" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Material Name" size="small" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Supplier" size="small" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Unit Cost (MZN)" type="number" size="small" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Initial Stock" type="number" size="small" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Reorder Point" type="number" size="small" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Expiry Tracking</InputLabel>
                <Select label="Expiry Tracking" defaultValue="No">
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Material
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RawMaterials;