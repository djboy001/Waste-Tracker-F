import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, } from "react-router-dom";
import { myStorage } from "./constants";
import { useAuth } from "./context/ContextApi";

import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "../src/components/Navbar";
import Maps from "./pages/Maps";
import SeeAllVolunteers from "./pages/SeeAllVolunteers";



function App() {
  const { setCurrentUsername } = useAuth();
  useEffect(() => {
    console.log("user: ",myStorage.getItem("user"));
    setCurrentUsername(myStorage.getItem("user"));
  }, []);

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
    </Router>
  );
}

export default App;
