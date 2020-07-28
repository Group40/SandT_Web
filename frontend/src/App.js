import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from './store';
import { loadUser} from './Actions/authActions';
import { connect } from 'react-redux';
import './App.css';
import AdminRoutes from "./Pages/Admin/AdminRoutes";
import AdminLogin from "./Pages/Admin/AdminLogin";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
    let route;
    if(this.props.isAuthenticated === false || this.props.isAuthenticated === true || this.props.isAuthenticated === null) {
      route = <Switch>
        <Route exact path="/adminlogin" component={AdminLogin}/>
        <Route path="/admin" component={AdminRoutes}/>          
      </Switch>
    }
    if(this.props.isAuthenticated === true && this.props.type === "3") {
      route = <Switch>
        <Route exact path="/adminlogin" component={AdminRoutes}/>
        <Route path="/admin" component={AdminRoutes}/>
      </Switch>
    }
    return (
      <React.Fragment>
        <Router>
        <Route exact path="/adminlogin" component={AdminLogin}/>
        <Route path="/admin" component={AdminRoutes}/>
        </Router>
        </React.Fragment>
    );
  } 
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  type: state.auth.type
});

export default connect(mapStateToProps,null)(App);

