// src/pages/Products/Carts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Box, Typography, Divider, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export default function Carts() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/carts")
      .then((res) => setCarts(res.data?.carts ?? []))
      .catch((err) => {
        console.error(err);
        setCarts([]);
      })
      .finally(() => setLoading(false));
  }, []);

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
    { field: "userId", headerName: "User ID", type: "number", width: 110 },
    { field: "totalProducts", headerName: "Products", type: "number", width: 120 },
    { field: "totalQuantity", headerName: "Qty", type: "number", width: 100 },
    { field: "total", headerName: "Total ($)", type: "number", width: 130 },
    { field: "discountedTotal", headerName: "Discounted ($)", type: "number", width: 160 },
  ];

  const itemColumns = [
    { field: "id", headerName: "Item ID", type: "number", width: 100 },
    { field: "title", headerName: "Title", flex: 2, minWidth: 220 },
    { field: "price", headerName: "Price", type: "number", width: 110 },
    { field: "quantity", headerName: "Qty", type: "number", width: 100 },
    { field: "total", headerName: "Total", type: "number", width: 110 },
    { field: "discountPercentage", headerName: "Disc %", type: "number", width: 120 },
    { field: "discountedPrice", headerName: "Disc Price", type: "number", width: 130 },
  ];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Carts
      </Typography>

      {/* Master grid: carts */}
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={carts ?? []}
          columns={cartColumns}
          getRowId={(r) => r?.id}
          loading={loading}
          disableRowSelectionOnClick
          onRowClick={(params) => setSelectedCart(params?.row ?? null)}
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

      {/* Details grid: items in the selected cart */}
      {selectedCart && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Cart #{selectedCart.id} — Items
          </Typography>
          <Box sx={{ height: 560 }}>
            <DataGrid
              rows={selectedCart?.products ?? []}
              columns={itemColumns}
              getRowId={(r) => r?.id}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
              }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
                sorting: { sortModel: [{ field: "title", sort: "asc" }] },
              }}
              pageSizeOptions={[5, 10, 25, 50]}
            />
          </Box>
        </>
      )}
    </Container>
  );
}
