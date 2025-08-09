import React from "react";
import { Link } from "react-router-dom";
import "./Page.css";

export default function About() {
  return (
    <div className="page-container">
      <h1>About ULS</h1>
      <p>A totally unfair stock market simulator where you always lose when buying and win when selling.</p>
      <Link to="/" className="btn">Back</Link>
    </div>
  );
}
