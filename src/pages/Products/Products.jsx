import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data?.products ?? []))
      .catch((err) => {
        console.error(err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 90 },
    { field: "title", headerName: "Title", flex: 2, minWidth: 200 },
    { field: "brand", headerName: "Brand", flex: 1, minWidth: 120 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 120 },
    { field: "price", headerName: "Price", type: "number", flex: 1, minWidth: 100 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1, minWidth: 90 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) => params?.row?.rating ?? null,
    },
  ];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={products ?? []}
          columns={columns}
          getRowId={(r) => r?.id}
          loading={loading}
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
