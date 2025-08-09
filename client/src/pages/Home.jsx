import React from "react";
import { Link } from "react-router-dom";
import "./Page.css";

export default function Home() {
  return (
    <div className="page-container">
      <div className="logo">ULS</div>
      <div className="buttons">
        <Link to="/play" className="btn">Play</Link>
        <Link to="/about" className="btn">About</Link>
      </div>
    </div>
  );
}
