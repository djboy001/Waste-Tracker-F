import React from "react";

export default function Navbar() {
  return (
    <div className="NavbarClass">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark row" id="navbar">
        <div className="container-fluid">
          <a className="navbar-brand col-sm ms-3" href="/">
            Waste Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation" 
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-bucket" id="navbarNav">
            <ul className="navbar-nav col-sm">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/">
                  Home <span className="sr-only"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/maps" >
                  Map
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
