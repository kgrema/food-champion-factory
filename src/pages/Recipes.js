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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Restaurant,
  ExpandMore,
  Kitchen,
  Scale,
} from '@mui/icons-material';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);

  // Real recipe data from your CSV
  const recipes = [
    {
      id: 'S300VN-RECIPE',
      name: 'SORVET300ML-VANILLA',
      batchSize: '285 units',
      ingredients: [
        { material: 'AGUA', quantity: '33.33 L', unit: 'L' },
        { material: 'FETALID', quantity: '285 pcs', unit: 'pcs' },
        { material: 'FETATAB', quantity: '285 pcs', unit: 'pcs' },
        { material: 'PLMFAT', quantity: '0.45 kg', unit: 'kg' },
        { material: 'WHEYPD', quantity: '1.20 kg', unit: 'kg' },
        { material: 'LEITCOND', quantity: '5 units', unit: 'pcs' },
      ],
      instructions: 'Mix all ingredients, freeze for 24 hours',
      shelfLife: '6 months',
    },
    {
      id: 'S5LVN-RECIPE',
      name: 'SORVET5L-VANILLA',
      batchSize: '6 units',
      ingredients: [
        { material: 'AGUA', quantity: '33.33 L', unit: 'L' },
        { material: 'LID5L', quantity: '19 pcs', unit: 'pcs' },
        { material: '5LTAB', quantity: '19 pcs', unit: 'pcs' },
        { material: 'PLMFAT', quantity: '0.45 kg', unit: 'kg' },
        { material: 'WHEYPD', quantity: '1.20 kg', unit: 'kg' },
        { material: 'VANFLVOR', quantity: '0.06 kg', unit: 'kg' },
      ],
      instructions: 'Combine dry ingredients, add water, mix thoroughly, package',
      shelfLife: '6 months',
    },
    {
      id: 'MASSARESS-RECIPE',
      name: 'MASSA DE RESSOIS',
      batchSize: '1 batch',
      ingredients: [
        { material: 'CORNSTCH', quantity: '0.05 kg', unit: 'kg' },
        { material: '1KGTRIGO', quantity: '2.00 kg', unit: 'kg' },
        { material: 'AGUA', quantity: '3.20 L', unit: 'L' },
        { material: 'WHEYPD', quantity: '0.10 kg', unit: 'kg' },
        { material: 'CHKNSPICE', quantity: '2 units', unit: 'pcs' },
      ],
      instructions: 'Mix dry ingredients, add water gradually, knead for 15 minutes',
      shelfLife: '2 days refrigerated',
    },
    {
      id: 'RECHFRA-RECIPE',
      name: 'RECHEIO DE FRANGO',
      batchSize: '5 kg',
      ingredients: [
        { material: 'PETFRANCO', quantity: '5.00 kg', unit: 'kg' },
        { material: 'LOURO', quantity: '0.00001 g', unit: 'g' },
        { material: 'GALIC', quantity: '20.00 g', unit: 'g' },
        { material: 'CKCALDO', quantity: '3 pcs', unit: 'pcs' },
        { material: 'CHKNSPICE', quantity: '0.05 kg', unit: 'kg' },
      ],
      instructions: 'Cook chicken with spices for 15 minutes',
      shelfLife: '3 days refrigerated',
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Recipe Management</Typography>
        <Button variant="contained" startIcon={<Add />}>
          New Recipe
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search recipes by name or ingredient..."
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

        {/* Recipe Statistics */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Restaurant sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h5">24</Typography>
                <Typography variant="caption" color="textSecondary">Total Recipes</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Kitchen sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h5">8</Typography>
                <Typography variant="caption" color="textSecondary">Ice Cream Recipes</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Restaurant sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h5">6</Typography>
                <Typography variant="caption" color="textSecondary">Samossa Recipes</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Scale sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h5">10</Typography>
                <Typography variant="caption" color="textSecondary">Filling Recipes</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Recipes List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              All Recipes
            </Typography>
            {recipes.map((recipe) => (
              <Accordion
                key={recipe.id}
                expanded={expanded === recipe.id}
                onChange={handleChange(recipe.id)}
                sx={{ mb: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {recipe.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Batch Size: {recipe.batchSize} • Shelf Life: {recipe.shelfLife}
                      </Typography>
                    </Box>
                    <Box>
                      <Chip label={recipe.id} size="small" />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Ingredients Required
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Material</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Unit</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {recipe.ingredients.map((ingredient, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{ingredient.material}</TableCell>
                                <TableCell>{ingredient.quantity}</TableCell>
                                <TableCell>{ingredient.unit}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Instructions
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="body2">{recipe.instructions}</Typography>
                      </Paper>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button size="small" startIcon={<Edit />}>
                          Edit Recipe
                        </Button>
                        <Button size="small" startIcon={<Scale />} variant="outlined">
                          Scale Batch
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recipe Categories
            </Typography>
            <List>
              {[
                { category: 'Ice Cream Recipes', count: 8, color: 'primary' },
                { category: 'Samossa Recipes', count: 6, color: 'success' },
                { category: 'Spring Roll Recipes', count: 4, color: 'warning' },
                { category: 'Filling Recipes', count: 10, color: 'info' },
                { category: 'Dough Recipes', count: 3, color: 'secondary' },
              ].map((item) => (
                <ListItem key={item.category} divider>
                  <ListItemText
                    primary={item.category}
                    secondary={`${item.count} recipes`}
                  />
                  <Chip label={item.count} size="small" color={item.color} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Most Used Ingredients
            </Typography>
            <List>
              {[
                { ingredient: 'AGUA', recipes: 14 },
                { ingredient: 'PLMFAT', recipes: 12 },
                { ingredient: 'WHEYPD', recipes: 10 },
                { ingredient: '1KGTRIGO', recipes: 8 },
                { ingredient: 'LEITCOND', recipes: 6 },
              ].map((item) => (
                <ListItem key={item.ingredient} divider>
                  <ListItemText
                    primary={item.ingredient}
                    secondary={`Used in ${item.recipes} recipes`}
                  />
                  <Box sx={{ width: 100 }}>
                    <Box
                      sx={{
                        height: 8,
                        bgcolor: 'primary.main',
                        width: `${(item.recipes / 14) * 100}%`,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recipes;