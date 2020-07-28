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
    if(this.props.isAuthenticated === 'false') {
      route = <Switch>
        <Route exact path="/adminlogin" component={AdminLogin}/>
        <Route path="/admin" component={AdminLogin}/>          
      </Switch>
    }
    if(this.props.isAuthenticated === 'true' && this.props.erole === '3') {
      route = <Switch>
        <Route path="/adminlogin" component={AdminRoutes}/>
        <Route path="/admin" component={AdminRoutes}/>
      </Switch>
    }
    return (
      <React.Fragment>
        <Router>
          {route}         
        </Router>
      </React.Fragment>
    );
  } 
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  erole: state.auth.erole
});

export default connect(mapStateToProps,null)(App);

