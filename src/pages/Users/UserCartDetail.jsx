import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function UserCartDetail() {
  const { cartId } = useParams();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/carts/${cartId}`)
      .then(res => setCart(res.data))
      .catch(console.error);
  }, [cartId]);

  const productColumns = [
    { field: "id", headerName: "Item ID", width: 90 },
    { field: "title", headerName: "Title", flex: 2, minWidth: 200 },
    { field: "price", headerName: "Price", width: 110 },
    { field: "quantity", headerName: "Qty", width: 90 },
    { field: "total", headerName: "Total", width: 110 },
    { field: "discountPercentage", headerName: "Disc %", width: 110 },
    { field: "discountedPrice", headerName: "Disc Price", width: 130 },
  ];

  if (!cart) {
    return (
      <Container sx={{ py: 3 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 3 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <Button variant="outlined" component={Link} to={`/carts-by-user/${cart.userId}`}>
          Back to User Carts
        </Button>
        <Typography variant="h5">Cart #{cart.id}</Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 1 }}>
        User ID: <strong>{cart.userId}</strong>
      </Typography>
      <Typography variant="body2">
        Products: {cart.totalProducts} • Quantity: {cart.totalQuantity} • Total: ${cart.total} • Discounted Total: ${cart.discountedTotal}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={cart.products || []}
          columns={productColumns}
          getRowId={(r) => r.id}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Container>
  );
}
