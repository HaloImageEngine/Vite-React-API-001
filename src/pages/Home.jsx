// src/pages/Home.jsx
import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Container sx={{ py: 5 }}>
      {/* Header */}
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          p: 4,
          borderRadius: 2,
          boxShadow: 1,
          mb: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          DummyJSON Dashboard
        </Typography>
        <Typography variant="body1">
          This app showcases a simple data-driven dashboard built with{" "}
          <strong>React</strong>, <strong>Axios</strong>, and{" "}
          <strong>Material UI</strong> (including <strong>MUI X Data Grid</strong>),
          using live data from <strong>DummyJSON</strong>. Explore products, carts,
          and users with sortable/filterable grids and drill-down pages.
        </Typography>
      </Box>

      {/* Internal quick links */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button component={RouterLink} to="/products" variant="contained">
              Products
            </Button>
          </Grid>
          <Grid item>
            <Button component={RouterLink} to="/products-search" variant="outlined">
              Products Search
            </Button>
          </Grid>
          <Grid item>
            <Button component={RouterLink} to="/carts" variant="outlined">
              Carts
            </Button>
          </Grid>
          <Grid item>
            <Button component={RouterLink} to="/users" variant="outlined">
              Users
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Tech stack cards */}
      <Typography variant="h5" gutterBottom>
        Tech Stack & Docs
      </Typography>
      <Grid container spacing={3}>
        {/* React */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">React</Typography>
              <Typography variant="body2" color="text.secondary">
                UI library for building component-based apps. This site uses React
                with React Router for client-side navigation.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Docs
              </Button>
              <Button
                href="https://reactrouter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Router
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Axios */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Axios</Typography>
              <Typography variant="body2" color="text.secondary">
                Promise-based HTTP client used here to fetch data from the
                DummyJSON API.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href="https://axios-http.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Axios Docs
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Material UI */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Material UI (MUI)</Typography>
              <Typography variant="body2" color="text.secondary">
                Component library for layout, typography, and theming used across
                the app.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href="https://mui.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MUI Docs
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* MUI X Data Grid */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">MUI X Data Grid</Typography>
              <Typography variant="body2" color="text.secondary">
                Powerful data grid with sorting, filtering, and quick search enabled
                on all list pages.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href="https://mui.com/x/react-data-grid/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data Grid Docs
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* DummyJSON */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">DummyJSON API</Typography>
              <Typography variant="body2" color="text.secondary">
                Free mock API used for products, carts, and users. Great for demos
                and testing.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href="https://dummyjson.com/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                DummyJSON Docs
              </Button>
              <Button
                href="https://dummyjson.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Root
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Project Source (optional) */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Source & Branching</Typography>
              <Typography variant="body2" color="text.secondary">
                Using Git with branches for new pages and features. Create feature
                branches in Visual Studio and push to GitHub.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href="https://docs.github.com/en/get-started/using-git/about-git"
                target="_blank"
                rel="noopener noreferrer"
              >
                Git Basics
              </Button>
              <Button
                href="https://learn.microsoft.com/visualstudio/version-control/git-with-visual-studio?view=vs-2022"
                target="_blank"
                rel="noopener noreferrer"
              >
                VS + Git
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
