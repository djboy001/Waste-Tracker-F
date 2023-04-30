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

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "./context/ContextApi";

import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "../src/components/Navbar";
import Maps from "./pages/Maps";
import SeeAllVolunteers from "./pages/SeeAllVolunteers";



function App() {

  return (
    <Router>
      <AuthProvider>
          <Navbar />
          <div className="rootContentDiv">
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/maps">
              <Redirect to="/maps/streets-v12" />
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/maps/:mapname" component={Maps} />
            <Route path="/seeallvolunteers/:currentPlaceId" component={SeeAllVolunteers} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
          </Switch> 
          </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
