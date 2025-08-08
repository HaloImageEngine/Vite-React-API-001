import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box, Container, Typography, Card, CardContent, Avatar, Grid, Button
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function CartsByUsers() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [carts, setCarts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingCarts, setLoadingCarts] = useState(true);

  useEffect(() => {
    setLoadingUser(true);
    axios
      .get(`https://dummyjson.com/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch(console.error)
      .finally(() => setLoadingUser(false));

    setLoadingCarts(true);
    axios
      .get(`https://dummyjson.com/carts/user/${userId}`)
      .then((res) => setCarts(res.data?.carts ?? []))
      .catch(console.error)
      .finally(() => setLoadingCarts(false));
  }, [userId]);

  const cartColumns = [
    {
      field: "id",
      headerName: "Cart ID",
      type: "number",
      width: 110,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/user-cart/${params?.row?.id}`}
          variant="contained"
          size="small"
        >
          {params?.row?.id}
        </Button>
      ),
    },
    { field: "totalProducts", headerName: "Products", type: "number", width: 120 },
    { field: "totalQuantity", headerName: "Qty", type: "number", width: 100 },
    { field: "total", headerName: "Total ($)", type: "number", width: 130 },
    { field: "discountedTotal", headerName: "Discounted ($)", type: "number", width: 150 },
  ];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>User Carts</Typography>

      {/* User Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                src={user?.image}
                alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                sx={{ width: 64, height: 64 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                {user?.firstName} {user?.lastName} (#{user?.id})
              </Typography>
              <Typography variant="body2">
                {user?.email} • {user?.phone}
              </Typography>
              <Typography variant="body2">
                {user?.address?.address}, {user?.address?.city}, {user?.address?.state}
              </Typography>
              <Typography variant="body2">Username: {user?.username}</Typography>
            </Grid>
            <Grid item>
              <Button component={Link} to="/users" variant="outlined" size="small">
                Back to Users
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Carts Grid */}
      <Box sx={{ height: 560 }}>
        <DataGrid
          rows={carts ?? []}
          columns={cartColumns}
          getRowId={(r) => r?.id}
          loading={loadingCarts || loadingUser}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
            sorting: { sortModel: [{ field: "id", sort: "asc" }] },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </Box>
    </Container>
  );
}
