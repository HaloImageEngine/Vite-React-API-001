// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button component={Link} to="/products-search" variant="outlined" sx={{ mb: 2 }}>
        Back to Search
      </Button>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Box>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: 300, borderRadius: 8 }}
          />
        </Box>
        <Box>
          <Typography variant="body1"><strong>ID:</strong> {product.id}</Typography>
          <Typography variant="body1"><strong>Brand:</strong> {product.brand}</Typography>
          <Typography variant="body1"><strong>Category:</strong> {product.category}</Typography>
          <Typography variant="body1"><strong>Price:</strong> ${product.price}</Typography>
          <Typography variant="body1"><strong>Stock:</strong> {product.stock}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
        </Box>
      </Box>
    </Container>
  );
}

