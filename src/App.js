import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// import SeeAllVolunteers from "./pages/SeeAllVolunteers";

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


const Contact = require("./pages/Contact").default;
const Footer = require("../src/components/Footer").default;
// const Header = require("../src/components/Header").default;
const Home = require("./pages/Home").default;
const About = require("./pages/About").default;
const Navbar = require("../src/components/Navbar").default;
const Maps = require("./pages/Maps").default;
const SeeAllVolunteers = require("./pages/SeeAllVolunteers").default;

function App() {

  return (
    <Router>
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
        {/* <Footer /> */}
    </Router>
  );
}

export default App;
