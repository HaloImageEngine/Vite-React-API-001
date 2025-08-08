// src/pages/ProductsSearch.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductsSearch() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    const found = products.find((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );
    if (found) {
      setHighlightedId(found.id);
    } else {
      setHighlightedId(null);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/product/${params.row.id}`}
          variant="contained"
          color="primary"
          size="small"
        >
          {params.row.id}
        </Button>
      ),
    },
    { field: "title", headerName: "Title", flex: 2, minWidth: 200 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "price", headerName: "Price", width: 90 },
    { field: "stock", headerName: "Stock", width: 90 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Products
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: "flex", mb: 2, gap: 2 }}>
        <TextField
          label="Search by Title"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Products Grid */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowClassName={(params) =>
            params.id === highlightedId ? "highlight-row" : ""
          }
        />
      </Box>

      {/* Highlight row style */}
      <style>{`
        .highlight-row {
          background-color: #fff8c4 !important;
        }
      `}</style>
    </Container>
  );
}
