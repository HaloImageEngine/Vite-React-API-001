// src/pages/Users/CartsByUserGridUtility.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Avatar,
    Button,
    Alert,
    Skeleton,
    Stack,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function CartsByUserGridUtility() {
    const [rows, setRows] = useState([]);
    const [usersById, setUsersById] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setErr(null);
            try {
                // 1) Fetch carts
                const cartsRes = await axios.get("https://dummyjson.com/carts?limit=100");
                const cartsRaw = Array.isArray(cartsRes.data?.carts) ? cartsRes.data.carts : [];
                const carts = cartsRaw.filter(Boolean);

                // 2) Fetch users for those carts
                const uniqueUserIds = [...new Set(carts.map((c) => c.userId))].filter(
                    (id) => id !== null && id !== undefined
                );
                const userCalls = uniqueUserIds.map((id) =>
                    axios.get(`https://dummyjson.com/users/${id}`).then((r) => r.data).catch(() => null)
                );
                const users = await Promise.all(userCalls);
                const map = new Map();
                users.forEach((u) => {
                    if (u?.id) map.set(u.id, u);
                });

                // 3) Normalize carts with parsed date and **materialized userName**
                const normalized = carts.map((c) => {
                    const rawDate = c?.date ?? null;
                    const parsedDate = rawDate ? new Date(rawDate) : null;

                    const u = c?.userId != null ? map.get(c.userId) : null;
                    const userName = u ? `${u.firstName} ${u.lastName}` : (c?.userId != null ? `User #${c.userId}` : "");

                    return {
                        ...c,
                        _rawDate: rawDate,
                        _parsedDate: parsedDate,
                        userName,       // <--- concrete string field for filtering/sorting
                    };
                });

                if (cancelled) return;
                setUsersById(map);
                setRows(normalized);
            } catch (e) {
                console.error(e);
                if (!cancelled) setErr("Unable to load carts. Please try again.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const currency = (v) =>
        typeof v === "number"
            ? new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(v)
            : v ?? "";

    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "Cart #",
                width: 120,
                sortable: true,
                renderCell: (params) => {
                    const id = params?.row?.id;
                    return (
                        <Button
                            component={id ? Link : "button"}
                            to={id ? `/cart/${id}` : undefined}
                            size="small"
                            variant="contained"
                            disabled={!id}
                        >
                            {id ?? "—"}
                        </Button>
                    );
                },
            },
            {
                field: "userName",            // <--- use the real field, not a valueGetter
                headerName: "User",
                type: "string",
                flex: 1,
                minWidth: 240,
                sortable: true,               // now sortable by the string field
                filterable: true,             // built-in "contains" works
                renderCell: (params) => {
                    const uid = params?.row?.userId;
                    const user = uid != null ? usersById.get(uid) : null;
                    const name = params?.row?.userName || "—";
                    return (
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                            <Avatar src={user?.image || undefined} sx={{ width: 28, height: 28 }} />
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {name}
                            </span>
                        </Stack>
                    );
                },
            },
            {
                field: "_parsedDate",
                headerName: "Date",
                width: 170,
                type: "dateTime",
                valueGetter: (params) => params?.row?._parsedDate ?? null,
                valueFormatter: (params) =>
                    params?.value
                        ? new Intl.DateTimeFormat(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                        }).format(params.value)
                        : "—",
                sortComparator: (v1, v2) => {
                    if (!v1 && !v2) return 0;
                    if (!v1) return 1;
                    if (!v2) return -1;
                    return v1 - v2;
                },
            },
            { field: "totalProducts", headerName: "Products", type: "number", width: 110 },
            { field: "totalQuantity", headerName: "Qty", type: "number", width: 90 },
            {
                field: "total",
                headerName: "Total",
                type: "number",
                width: 120,
                valueFormatter: (params) => currency(params?.value),
            },
            {
                field: "discountedTotal",
                headerName: "Discounted",
                type: "number",
                width: 140,
                valueFormatter: (params) => currency(params?.value),
            },
        ],
        [usersById]
    );

    return (
        <Container sx={{ py: 3 }}>
            <Typography variant="h4" gutterBottom>
                Carts by User
            </Typography>

            <Card sx={{ mb: 2 }}>
                <CardContent>
                    {loading ? (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Skeleton variant="circular" width={48} height={48} />
                            </Grid>
                            <Grid item xs>
                                <Skeleton variant="text" width={240} />
                                <Skeleton variant="text" width="60%" />
                            </Grid>
                        </Grid>
                    ) : (
                        <Typography variant="body2">
                            Showing {rows.length} cart{rows.length === 1 ? "" : "s"} from {usersById.size} user
                            {usersById.size === 1 ? "" : "s"}.
                        </Typography>
                    )}
                </CardContent>
            </Card>

            {err && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {err}
                </Alert>
            )}

            <Box sx={{ height: 640 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(r) => r.id}
                    loading={loading}
                    disableRowSelectionOnClick
                    slots={{ toolbar: GridToolbar, noRowsOverlay: NoRows }}
                    slotProps={{
                        toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "_parsedDate", sort: "desc" }], // date desc by default
                        },
                        pagination: { paginationModel: { pageSize: 10, page: 0 } },
                        // Optional: add a default filter model example
                        // filter: { filterModel: { items: [{ field: 'userName', operator: 'contains', value: '' }] } }
                    }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                />
            </Box>
        </Container>
    );
}

function NoRows() {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="body2">No carts found.</Typography>
        </Box>
    );
}
