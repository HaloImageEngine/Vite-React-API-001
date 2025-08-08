import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Card, CardContent, Grid, Avatar, Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function CartsbyUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const [u, c] = await Promise.all([
          axios.get(`https://dummyjson.com/users/${userId}`),
          axios.get(`https://dummyjson.com/carts/user/${userId}`),
        ]);
        setUser(u.data ?? null);
        setCarts(c.data?.carts ?? []);
      } catch (e) {
        console.error(e);
        setUser(null);
        setCarts([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [userId]);

  const cartColumns = [
    {
      field: "id",
      headerName: "Cart ID",
      type: "number",
      width: 110,
      renderCell: (params) => (
        <Button component={Link} to={`/user-cart/${params?.row?.id}`} variant="contained" size="small">
          {params?.row?.id}
        </Button>
      ),
    },
    { field: "totalProducts", headerName: "Products", type: "number", width: 120 },
    { field: "totalQuantity", headerName: "Qty", type: "number", width: 100 },
    { field: "total", headerName: "Total ($)", type: "number", width: 130 },
    { field: "discountedTotal", headerName: "Discounted ($)", type: "number", width: 160 },
  ];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Carts by User
      </Typography>

      {/* User summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={user?.image} alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`} sx={{ width: 64, height: 64 }} />
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
              <Button component={Link} to="/users" variant="outlined" size="small">Back to Users</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Carts grid */}
      <Box sx={{ height: 560 }}>
        <DataGrid
          rows={carts ?? []}
          columns={cartColumns}
          getRowId={(r) => r?.id}
          loading={loading}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } } }}
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
