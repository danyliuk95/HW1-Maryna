import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../store/slice/productsSlice';
import { fetchModifiers } from '../../store/slice/modifiersSlice';
import { Box, Grid, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import { TabContext, TabPanel } from '@mui/lab';
import ProductsList from './ProductsList';
import ModifiersList from './ModifiersList';
import OrderingList from './OrderingList';

const Ordering = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('1')

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchModifiers())
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <OrderingList />
          </Grid>
          <Grid item xs={8}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Products" value="1" />
                  <Tab label="Modifiers" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ProductsList />
              </TabPanel>
              <TabPanel value="2">
                <ModifiersList />
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Ordering;
