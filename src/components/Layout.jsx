// src/components/Layout.jsx
import React from 'react';
import Header from '../Header';
import Navbar from './Navbar';
import Footer from '../Footer'; // optional
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Outlet /> {/* This renders the child route */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
