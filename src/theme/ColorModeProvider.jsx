import React, { useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import { ColorModeContext } from "./colorModeContext";

export default function ColorModeProvider({ children }) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("color-mode");
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    } else {
      setMode(prefersDark ? "dark" : "light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDark]);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("color-mode", next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  const ctxValue = useMemo(() => ({ mode, toggleColorMode }), [mode]);

  return (
    <ColorModeContext.Provider value={ctxValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
