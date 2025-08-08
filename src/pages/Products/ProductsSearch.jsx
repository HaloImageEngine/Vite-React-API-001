import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export default function ProductsSearch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [highlightedIds, setHighlightedIds] = useState([]);

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

  // Compute all matches (title/brand/category) for highlight
  const matches = useMemo(() => {
    const term = searchText.trim().toLowerCase();
    if (!term) return new Set();
    return new Set(
      (products ?? [])
        .filter(
          (p) =>
            (p.title ?? "").toLowerCase().includes(term) ||
            (p.brand ?? "").toLowerCase().includes(term) ||
            (p.category ?? "").toLowerCase().includes(term)
        )
        .map((p) => p.id)
    );
  }, [products, searchText]);

  useEffect(() => {
    setHighlightedIds([...matches]);
  }, [matches]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 90,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/product/${params?.row?.id}`}
          variant="contained"
          size="small"
        >
          {params?.row?.id}
        </Button>
      ),
    },
    { field: "title", headerName: "Title", flex: 2, minWidth: 220 },
    { field: "brand", headerName: "Brand", flex: 1, minWidth: 120 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 120 },
    { field: "price", headerName: "Price", type: "number", flex: 1, minWidth: 100 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1, minWidth: 90 },
  ];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Search Products
      </Typography>

      {/* Page-level search that highlights matching rows */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search title / brand / category"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="outlined" onClick={() => setSearchText("")}>
          Clear
        </Button>
      </Box>

      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={products ?? []}
          columns={columns}
          getRowId={(r) => r?.id}
          loading={loading}
          disableRowSelectionOnClick
          // Sorting + filtering + global quick filter toolbar
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
            sorting: { sortModel: [{ field: "id", sort: "asc" }] },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          getRowClassName={(params) =>
            highlightedIds.includes(params.id) ? "highlight-row" : ""
          }
        />
      </Box>

      {/* highlight style */}
      <style>{`
        .highlight-row {
          background-color: #fff8c4 !important;
        }
      `}</style>
    </Container>
  );
}
