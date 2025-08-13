import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Box, Container, Typography, Card, CardContent, Avatar, Grid, Button, Alert, Stack, Skeleton
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function CartsByUsers() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setErr(null);

        const userReq = axios.get(`https://dummyjson.com/users/${userId}`);
        const cartsReq = axios.get(`https://dummyjson.com/carts/user/${userId}`);

        Promise.all([userReq, cartsReq])
            .then(([uRes, cRes]) => {
                if (cancelled) return;
                setUser(uRes.data ?? null);
                setCarts(cRes.data?.carts ?? []);
            })
            .catch((e) => {
                if (cancelled) return;
                console.error(e);
                setErr("Unable to load user or carts. Try again.");
            })
            .finally(() => !cancelled && setLoading(false));

        return () => { cancelled = true; };
    }, [userId]);

    const currency = (v) =>
        typeof v === "number"
            ? new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(v)
            : v;

    const cartColumns = useMemo(() => [
        {
            field: "id",
            headerName: "Cart ID",
            type: "number",
            width: 120,
            sortable: true,
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
        {
            field: "total",
            headerName: "Total",
            type: "number",
            width: 130,
            valueFormatter: ({ value }) => currency(value),
        },
        {
            field: "discountedTotal",
            headerName: "Discounted",
            type: "number",
            width: 150,
            valueFormatter: ({ value }) => currency(value),
        },
    ], []);

    return (
        <Container sx={{ py: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">User Carts</Typography>
                <Button component={Link} to="/users" variant="outlined" size="small">
                    Back to Users
                </Button>
            </Stack>

            {/* User Info */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    {loading ? (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item><Skeleton variant="circular" width={64} height={64} /></Grid>
                            <Grid item xs>
                                <Skeleton variant="text" width={220} />
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="text" width="40%" />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar
                                    src={user?.image || undefined}
                                    alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                                    sx={{ width: 64, height: 64 }}
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6">
                                    {user?.firstName} {user?.lastName} {user?.id ? `( #${user.id} )` : ""}
                                </Typography>
                                <Typography variant="body2">
                                    {[user?.email, user?.phone].filter(Boolean).join(" • ")}
                                </Typography>
                                <Typography variant="body2">
                                    {[
                                        user?.address?.address,
                                        user?.address?.city,
                                        user?.address?.state
                                    ].filter(Boolean).join(", ")}
                                </Typography>
                                {user?.username && (
                                    <Typography variant="body2">Username: {user.username}</Typography>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
            </Card>

            {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

            {/* Carts Grid */}
            <Box sx={{ height: 560 }}>
                <DataGrid
                    rows={carts ?? []}
                    columns={cartColumns}
                    getRowId={(r) => r?.id}
                    loading={loading}
                    disableRowSelectionOnClick
                    slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRows }}
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

function CustomNoRows() {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="body2">No carts found for this user.</Typography>
        </Box>
    );
}
