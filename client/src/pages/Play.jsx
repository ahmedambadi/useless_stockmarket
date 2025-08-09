import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import "./Page.css";


import { createChart } from 'lightweight-charts';
import './Page.css';

// Component to render the stock page
const StockPage = () => {
    const chartContainerRef = useRef();
    const chartRef = useRef();
    const [stockName, setStockName] = useState('DIHFEOIF'); // Default stock

    // List of stocks based on the provided image
    const stockList = [
        'DIHFEOIF', 'SCJEOJ', 'iSLC;SC', 'SCS;LC', 'SCJSO;CJE;O', 
        'SLC;SKC', 'SLCJ;SOV', 'SLKCSLC', 'S;L;CJS;VL', 'SC;LS'
    ];

    /**
     * Generates Open, High, Low, Close (OHLC) data using Geometric Brownian Motion (GBM).
     * @param {number} s0 - Initial stock price.
     * @param {number} mu - Drift (average return rate).
     * @param {number} sigma - Volatility.
     * @param {number} n_steps - Number of time steps (e.g., days).
     * @returns {Array} - Array of OHLC data points for the chart.
     */
    const generateGBMData = (s0, mu, sigma, n_steps) => {
        const data = [];
        let price = s0;
        const dt = 1 / n_steps; // Time step

        const today = new Date();

        for (let i = 0; i < n_steps; i++) {
            // Generate a random number from a standard normal distribution
            const epsilon = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3) / 3;
            
            const openPrice = price;
            
            // GBM formula for price evolution
            price = price * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * epsilon);
            
            const closePrice = price;

            // Simulate High and Low
            const high = Math.max(openPrice, closePrice) * (1 + Math.random() * 0.02);
            const low = Math.min(openPrice, closePrice) * (1 - Math.random() * 0.02);
            
            // Format time for the chart library (YYYY-MM-DD)
            const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
            const time = date.toISOString().split('T')[0];

            data.push({ time, open: openPrice, high, low, close: closePrice });
        }
        return data;
    };

    useEffect(() => {
        // Generate new data when the stock name changes
        const ohlcData = generateGBMData(100, 0.1, 0.4, 100);

        if (chartContainerRef.current) {
            // If chart instance exists, remove it before creating a new one
            if (chartRef.current) {
                chartRef.current.remove();
            }

            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 400, // Explicit height for the chart
                layout: {
                    backgroundColor: '#000000',
                    textColor: 'rgba(255, 255, 255, 0.9)',
                },
                grid: {
                    vertLines: { color: 'rgba(197, 203, 206, 0.2)' },
                    horzLines: { color: 'rgba(197, 203, 206, 0.2)' },
                },
                crosshair: { mode: 0 },
                rightPriceScale: { borderColor: 'rgba(197, 203, 206, 0.8)' },
                timeScale: { borderColor: 'rgba(197, 203, 206, 0.8)' },
            });
            chartRef.current = chart; // Store chart instance

            const candleSeries = chart.addCandlestickSeries({
                upColor: '#4bffb5',
                downColor: '#ff4976',
                borderDownColor: '#ff4976',
                borderUpColor: '#4bffb5',
                wickDownColor: '#ff4976',
                wickUpColor: '#4bffb5',
            });

            candleSeries.setData(ohlcData);
            chart.timeScale().fitContent();
        }

        // Cleanup function to remove the chart on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
            }
        };
    }, [stockName]); // Rerun effect when stockName changes

    return (
        <div className="page-container">
            <div className="top-bar">
                <div className="stock-title">{stockName}</div>
                <div className="portfolio-value">100000</div>
            </div>
            <div className="main-area">
                <div className="stock-list" id="buttons">
                    {stockList.map((stock) => (
                        <button 
                            key={stock} 
                            className="stock-btn" 
                            onClick={() => setStockName(stock)}
                        >
                            {stock}
                        </button>
                    ))}
                </div>
                <div className="graph-section">
                    <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
                    <div className="history">
                        <div className="portfolio-controls">
                            <div className="control-box"></div>
                            <div className="control-box"></div>
                        </div>
                        <span className="portfolio-label">portfolio</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockPage;