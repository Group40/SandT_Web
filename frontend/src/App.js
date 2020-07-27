import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import AdminRoutes from "./Pages/Admin/AdminRoutes";
import AdminLogin from "./Pages/Admin/AdminLogin";

class App extends Component {
  render(){
    return (
      <React.Fragment>
        <Router>
          <Route path="/adminlogin" component={AdminLogin}/>
          <Route path="/admin" component={AdminRoutes}/>
        </Router>
        </React.Fragment>
    );
  } 
}

export default App;

