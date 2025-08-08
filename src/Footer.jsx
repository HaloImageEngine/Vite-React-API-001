import React from "react";

function Footer() {
  return (
    <footer style={{ padding: "1rem", background: "#282c34", color: "#fff" }}>
      <p>&copy; {new Date().getFullYear()} DummyJson API</p>
    </footer>
  );
}

export default Footer;
