import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/ContextApi';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CSS/App.css";
import "./CSS/Home.css";
import "./CSS/About.css";
import "./CSS/Navbar.css";
import "./CSS/Components.css";
import "./CSS/SeeAllVolunteers.css"
import "./CSS/Map.css"
import "./CSS/Footer.css"
import "./CSS/LoginAndRegister.css"
import "./CSS/ContactUs.css"
import 'react-toastify/dist/ReactToastify.css';
import "mapbox-gl/dist/mapbox-gl.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



// Server
// REACT_APP_url=https://waste-tracker-backend.vercel.app/