import React from "react";
import { Link } from "react-router-dom";
import "./Page.css";

export default function Home() {
  return (
    <div className="page-container">
      <div className="logo"><img src="../assets/u.png" alt="logo" /></div>
      <div id="buttons">
        <Link to="/play" className="btn" id="btn01">Play</Link>
        <Link to="/about" className="btn">About</Link>
      </div>
    </div>
  );
}
