import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import "./Page.css";

export default function Play() {
  const stocks = ["TCS", "Infosys", "Reliance", "HDFC"];
  const [selected, setSelected] = useState(stocks[0]);
  const [money, setMoney] = useState(10000);
  const [history, setHistory] = useState([]);
  const [price, setPrice] = useState(500);

  const generateGraph = (basePrice) => {
    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push({ name: i, price: Math.max(10, basePrice + Math.random() * 200 - 100) });
    }
    return data;
  };
  const [graphData, setGraphData] = useState(generateGraph(price));

  const buyStock = () => {
    if (money >= price) {
      setMoney(money - price);
      setPrice(10);
      setGraphData(generateGraph(10));
      setHistory([{ action: "Buy", stock: selected, price }, ...history]);
    }
  };

  const sellStock = () => {
    setMoney(money + price);
    let newPrice = price + Math.random() * 500;
    setPrice(newPrice);
    setGraphData(generateGraph(newPrice));
    setHistory([{ action: "Sell", stock: selected, price }, ...history]);
  };

  return (
    <div className="play-container">
      <div className="top-bar">
        <span>Money: ₹{money.toFixed(2)}</span>
        <Link to="/" className="btn">Home</Link>
      </div>
      <div className="main-area">
        <div className="stock-list">
          {stocks.map(stock => (
            <button key={stock} onClick={() => setSelected(stock)} className="btn stock-btn">
              {stock}
            </button>
          ))}
        </div>
        <div className="graph-section">
          <h2>{selected} - ₹{price.toFixed(2)}</h2>
          <LineChart width={500} height={300} data={graphData}>
            <Line type="monotone" dataKey="price" stroke="#a020f0" />
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
          </LineChart>
          <div className="action-buttons">
            <button onClick={buyStock} className="btn">Buy</button>
            <button onClick={sellStock} className="btn">Sell</button>
          </div>
          <div className="history">
            <h3>History</h3>
            {history.map((h, i) => (
              <p key={i} style={{ color: h.action === "Buy" ? "red" : "lime" }}>
                {h.action} {h.stock} at ₹{h.price.toFixed(2)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
