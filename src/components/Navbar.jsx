// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../theme/colorModeContext";

function Navbar() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const baseStyle = {
    marginRight: "20px",
    textDecoration: "none",
    color: theme.palette.text.primary,
    fontWeight: "bold",
  };

  const activeStyle = {
    color: theme.palette.mode === "dark" ? "#90caf9" : "#007BFF",
  };

  const dropdownWrapper = {
    position: "relative",
    display: "inline-block",
    marginRight: "20px",
  };

  const dropdownContent = {
    display: "none",
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: theme.palette.mode === "dark" ? "#2d2d2d" : "#f9f9f9",
    padding: "10px",
    boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
    zIndex: 1,
    minWidth: "180px",
    flexDirection: "column",
  };

  const navContainer = {
    padding: "1rem",
    backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "#eaeaea",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const linkGroup = { display: "inline-block" };

  const linkItem = {
    display: "block",
    padding: "6px 10px",
    color: theme.palette.text.primary,
    textDecoration: "none",
  };

  return (
    <nav style={navContainer}>
      {/* LEFT SIDE: links */}
      <div style={linkGroup}>
        {/* Home */}
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? { ...baseStyle, ...activeStyle } : baseStyle)}
          end
        >
          Home
        </NavLink>

        {/* Products Dropdown */}
        <div
          style={dropdownWrapper}
          onMouseEnter={(e) =>
            (e.currentTarget.querySelector(".dropdown-content").style.display = "block")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.querySelector(".dropdown-content").style.display = "none")
          }
        >
          <span style={{ ...baseStyle, cursor: "pointer" }}>Products ▾</span>
          <div className="dropdown-content" style={{ ...dropdownContent }}>
            <NavLink
              to="/products"
              style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}
            >
              Products
            </NavLink>
            <NavLink
              to="/carts"
              style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}
            >
              Carts
            </NavLink>
            <NavLink
              to="/products-search"
              style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}
            >
              Products Search
            </NavLink>
            <NavLink
              to="/carts-by-user/1"
              style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}
            >
              Carts by User (ex: #1)
            </NavLink>
          </div>
        </div>

        {/* Users Dropdown */}
        <div
          style={dropdownWrapper}
          onMouseEnter={(e) =>
            (e.currentTarget.querySelector(".dropdown-content").style.display = "block")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.querySelector(".dropdown-content").style.display = "none")
          }
        >
          <span style={{ ...baseStyle, cursor: "pointer" }}>Users ▾</span>
          <div className="dropdown-content" style={{ ...dropdownContent }}>
            <NavLink
              to="/users"
              style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}
            >
              Get All Users
            </NavLink>
            <NavLink
              to="/carts-by-user/1"
              style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}
            >
              Carts by User (ex: #1)
            </NavLink>
            <NavLink
              to="/user-cart/1"
              style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}
            >
              User Cart Detail (ex: #1)
            </NavLink>
          </div>
        </div>

        {/* External Links Dropdown */}
        <div
          style={dropdownWrapper}
          onMouseEnter={(e) =>
            (e.currentTarget.querySelector(".dropdown-content").style.display = "block")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.querySelector(".dropdown-content").style.display = "none")
          }
        >
          <span style={{ ...baseStyle, cursor: "pointer" }}>External ▾</span>
          <div className="dropdown-content" style={{ ...dropdownContent }}>
            <a
              href="https://dummyjson.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={linkItem}
            >
              DummyJSON Docs
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Dark mode toggle */}
      <Tooltip
        title={
          theme.palette.mode === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
      >
        <IconButton onClick={toggleColorMode} aria-label="toggle color mode">
          {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    </nav>
  );
}

export default Navbar;
