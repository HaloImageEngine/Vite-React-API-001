
import { useEffect, useState } from 'react';
import './App.css';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { Routes, Route } from 'react-router-dom';
import React from 'react';

import About from './pages/About';



function App() {

    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);


    return (
        <div className="App">
      <Header />
      <main>
        <Body />
      </main>
      <Footer />
    </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }
}

export default App;