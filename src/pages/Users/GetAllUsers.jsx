// src/pages/Users/GetAllUsers.jsx
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/users")
      .then((res) => setUsers(res.data?.users ?? []))
      .catch((err) => {
        console.error(err);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // local search (client-side) for name/username/email
  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;
    return users.filter((u) =>
      (`${u.firstName ?? ""} ${u.lastName ?? ""}`.toLowerCase().includes(term)) ||
      ((u.username ?? "").toLowerCase().includes(term)) ||
      ((u.email ?? "").toLowerCase().includes(term))
    );
  }, [users, q]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 90,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/carts-by-user/${params?.row?.id}`}
          variant="contained"
          size="small"
        >
          {params?.row?.id}
        </Button>
      ),
    },
    {
      field: "fullName",
      headerName: "Name",
      flex: 2,
      minWidth: 180,
      valueGetter: (params) => {
        const row = params?.row ?? {};
        return `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim();
      },
      // optional: make sorting explicit (string compare)
      sortComparator: (v1, v2) => (v1 ?? "").localeCompare(v2 ?? ""),
    },
    { field: "username", headerName: "Username", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 140 },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      minWidth: 120,
      valueGetter: (params) => params?.row?.address?.city ?? "",
    },
    {
      field: "carts",
      headerName: "Carts",
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/carts-by-user/${params?.row?.id}`}
          variant="outlined"
          size="small"
        >
          View Carts
        </Button>
      ),
    },
  ];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      {/* Page-level search (separate from DataGrid quick filter) */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          size="small"
          label="Search name / username / email"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button variant="outlined" onClick={() => setQ("")}>
          Clear
        </Button>
      </Box>

      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={rows ?? []}
          columns={columns}
          getRowId={(r) => r?.id}
          loading={loading}
          disableRowSelectionOnClick
          // Sorting + filtering + quick filter toolbar
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          // Nice defaults
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
