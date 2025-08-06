
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

//swa deploy dist --deployment-token "ae901d6a3c380f0d5a25a6d0343cbcb9aa39d3c06730923d7e91855e192e569d01-e92628c7-018e-4179-94eb-782738f631ae01e160901b40cc1e"

function App() {
  const [products, setProducts] = useState([]);

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
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </Container>
  );
}

export default App;
