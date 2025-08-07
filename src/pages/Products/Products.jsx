import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Container // ✅ Import Container from MUI
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'price', headerName: 'Price', width: 90 },
    { field: 'stock', headerName: 'Stock', width: 90 }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </Box>
    </Container>
  );
}