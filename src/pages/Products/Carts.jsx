// src/pages/Carts.jsx

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function Carts() {
  const [carts, setCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/carts')
      .then(res => setCarts(res.data.carts))
      .catch(err => console.error(err));
  }, []);

  const cartColumns = [
    { field: 'id', headerName: 'Cart ID', width: 90 },
    { field: 'userId', headerName: 'User ID', width: 90 },
    { field: 'totalProducts', headerName: 'Total Products', width: 130 },
    { field: 'totalQuantity', headerName: 'Total Quantity', width: 130 },
    { field: 'total', headerName: 'Total ($)', width: 100 },
    { field: 'discountedTotal', headerName: 'Discounted Total ($)', width: 160 }
  ];

  const productColumns = [
    { field: 'id', headerName: 'Product ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'discountPercentage', headerName: 'Discount %', width: 120 },
    { field: 'discountedPrice', headerName: 'Discounted Price', width: 150 }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Carts List
      </Typography>

      {/* Master Grid: List of Carts */}
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={carts}
          columns={cartColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.id}
          onRowClick={(params) => setSelectedCart(params.row)}
        />
      </Box>

      {/* Detail Grid: Cart Products */}
      {selectedCart && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Cart #{selectedCart.id} — Product Details
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={selectedCart.products}
              columns={productColumns}
              getRowId={(row) => row.id}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
