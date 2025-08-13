// src/pages/Products/CartsDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Box, Container, Typography, Card, CardContent,
    Avatar, Button, Alert, Stack, Skeleton
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function CartsDetails() {
    const { cartId } = useParams();
    const [cart, setCart] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setErr(null);
            try {
                const cRes = await axios.get(`https://dummyjson.com/carts/${cartId}`);
                const c = cRes.data ?? null;

                let u = null;
                if (c?.userId != null) {
                    try {
                        const uRes = await axios.get(`https://dummyjson.com/users/${c.userId}`);
                        u = uRes.data ?? null;
                    } catch { }
                }

                if (!cancelled) {
                    setCart(c);
                    setUser(u);
                }
            } catch (e) {
                console.error(e);
                if (!cancelled) setErr("Unable to load cart details.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [cartId]);

    const currency = (v) =>
        typeof v === "number" && Number.isFinite(v)
            ? new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(v)
            : v == null
                ? "—"
                : String(v);

    // Build rows with concrete numeric fields + totals
    const { rows, totals } = useMemo(() => {
        const src = Array.isArray(cart?.products) ? cart.products.filter(Boolean) : [];

        const num = (x) => (typeof x === "number" ? x : x == null ? null : Number(x));
        const safeMul = (a, b) => (Number.isFinite(a) && Number.isFinite(b) ? Number((a * b).toFixed(2)) : null);
        const safeDiv = (a, b) => (Number.isFinite(a) && Number.isFinite(b) && b !== 0 ? Number((a / b).toFixed(2)) : null);

        const computed = src.map((p) => {
            const id = p.id;
            const title = p.title ?? `#${id}`;
            const thumbnail = p.thumbnail ?? null;

            const quantity = num(p.quantity);
            const priceApi = num(p.price);
            const totalApi = num(p.total);
            const discountPercentage = num(p.discountPercentage);
            const discTotalApi = num(p.discountedTotal);

            const price = Number.isFinite(priceApi) ? priceApi : safeDiv(totalApi, quantity);
            const total = Number.isFinite(totalApi) ? totalApi : safeMul(price, quantity);
            const discountedTotal = Number.isFinite(discTotalApi)
                ? discTotalApi
                : (Number.isFinite(total) && Number.isFinite(discountPercentage)
                    ? Number((total * (1 - discountPercentage / 100)).toFixed(2))
                    : null);

            return {
                id,
                title,
                thumbnail,
                price,              // unit price (number)
                quantity,           // number
                total,              // line total (number)
                discountPercentage, // number
                discountedTotal,    // number
            };
        });

        const sum = (arr) => arr.reduce((acc, v) => acc + (Number.isFinite(v) ? v : 0), 0);
        const subtotal = sum(computed.map((r) => r.total));
        const discountedTotalSum = sum(computed.map((r) => r.discountedTotal));
        const totalQty = sum(computed.map((r) => r.quantity));

        return {
            rows: computed,
            totals: {
                totalQty,
                subtotal,
                discountedTotal: discountedTotalSum,
                apiTotal: typeof cart?.total === "number" ? cart.total : null,
                apiDiscountedTotal: typeof cart?.discountedTotal === "number" ? cart.discountedTotal : null,
            },
        };
    }, [cart]);

    const productColumns = useMemo(() => [
        {
            field: "product",
            headerName: "Product",
            minWidth: 240,
            flex: 1,
            valueGetter: (params) =>
                params?.row?.title ?? (params?.row?.id ? `#${params.row.id}` : ""),
            renderCell: (params) => {
                const id = params?.row?.id;
                const title = params?.row?.title ?? (id ? `#${id}` : "—");
                const thumb = params?.row?.thumbnail;
                return (
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                        {thumb ? (
                            <Avatar variant="rounded" src={thumb} alt={title} sx={{ width: 28, height: 28 }} />
                        ) : null}
                        <Button
                            component={id ? Link : "button"}
                            to={id ? `/product/${id}` : undefined}
                            size="small"
                            variant="text"
                            disabled={!id}
                            sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                        >
                            {title}
                        </Button>
                    </Stack>
                );
            },
            filterable: true,
            sortable: true,
        },
        {
            field: "price", // bind to concrete numeric field
            headerName: "Price",
            type: "number",
            width: 110,
            align: "right",
            headerAlign: "right",
            // use renderCell instead of valueFormatter (more reliable across versions)
            renderCell: (params) => currency(params?.row?.price),
            sortComparator: (a, b) => {
                const av = Number(a); const bv = Number(b);
                if (!Number.isFinite(av) && !Number.isFinite(bv)) return 0;
                if (!Number.isFinite(av)) return 1;
                if (!Number.isFinite(bv)) return -1;
                return av - bv;
            }
        },
        {
            field: "quantity",
            headerName: "Qty",
            type: "number",
            width: 90,
            align: "right",
            headerAlign: "right",
        },
        {
            field: "total", // bind to concrete numeric field
            headerName: "Line Total",
            type: "number",
            width: 130,
            align: "right",
            headerAlign: "right",
            renderCell: (params) => currency(params?.row?.total),
            sortable: true,
        },
        {
            field: "discountPercentage",
            headerName: "Disc %",
            type: "number",
            width: 100,
            align: "right",
            headerAlign: "right",
            renderCell: (params) =>
                Number.isFinite(params?.row?.discountPercentage)
                    ? `${params.row.discountPercentage}%`
                    : "—",
        },
        {
            field: "discountedTotal", // bind to concrete numeric field
            headerName: "Disc Total",
            type: "number",
            width: 130,
            align: "right",
            headerAlign: "right",
            renderCell: (params) => currency(params?.row?.discountedTotal),
            sortable: true,
        },
    ], []);

    function TotalsFooter() {
        return (
            <Box sx={{ px: 2, py: 1, borderTop: 1, borderColor: "divider", bgcolor: "background.paper" }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "minmax(240px, 1fr) 110px 90px 130px 100px 130px",
                        alignItems: "center",
                        gap: 1,
                        fontSize: 14,
                    }}
                >
                    <Box sx={{ fontWeight: 600 }}>Totals</Box>
                    <Box /> {/* Price: no aggregate */}
                    <Box sx={{ fontWeight: 700, textAlign: "right" }}>{totals.totalQty ?? 0}</Box>
                    <Box sx={{ fontWeight: 700, textAlign: "right" }}>{currency(totals.subtotal)}</Box>
                    <Box /> {/* Disc %: no aggregate */}
                    <Box sx={{ fontWeight: 700, textAlign: "right" }}>{currency(totals.discountedTotal)}</Box>
                </Box>

                {/* API vs computed (optional) */}
                <Box sx={{ mt: 0.5, color: "text.secondary", fontSize: 12 }}>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                        <span>API Total: {currency(totals.apiTotal)}</span>
                        <span>API Discounted: {currency(totals.apiDiscountedTotal)}</span>
                    </Stack>
                </Box>
            </Box>
        );
    }

    return (
        <Container sx={{ py: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Cart Details</Typography>
                <Button component={Link} to="/carts-utility" size="small" variant="outlined">
                    Back to Carts Utility
                </Button>
            </Stack>

            {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

            {!cart || loading ? (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Skeleton variant="text" width={220} />
                        <Skeleton variant="rectangular" height={120} />
                    </CardContent>
                </Card>
            ) : null}

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Line Items</Typography>
                    <Box sx={{ height: 520 }}>
                        <DataGrid
                            rows={rows}
                            columns={productColumns}
                            getRowId={(r) => r?.id ?? `${r?.title ?? "row"}-${Math.random().toString(36).slice(2)}`}
                            loading={loading}
                            disableRowSelectionOnClick
                            slots={{ toolbar: GridToolbar, footer: TotalsFooter, noRowsOverlay: NoRows }}
                            slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } } }}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10, page: 0 } },
                                sorting: { sortModel: [{ field: "product", sort: "asc" }] },
                            }}
                            pageSizeOptions={[5, 10, 25, 50]}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

function NoRows() {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="body2">No products found in this cart.</Typography>
        </Box>
    );
}


