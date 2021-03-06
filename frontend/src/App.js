import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import store from './store';
import { loadUser} from './Actions/authActions';
import { connect } from 'react-redux';
import './App.css';
import AdminRoutes from "./Pages/Admin/AdminRoutes";
import CrewRoutes from "./Pages/Admin/CrewRoutes";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Dashboard from "./Pages/Admin/Dashboard";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
    let route;
    if(this.props.isAuthenticated === false) {
      route = <Switch> 
        <Route path="/login" exact component={AdminLogin}/> 
        <Redirect to="/login"/>      
      </Switch>
    }
    if(this.props.isAuthenticated === true && this.props.erole === '3') {
      route = <Switch> 
        <Route path="/admin" component={AdminRoutes}/>
        <Redirect to="/"/>  
      </Switch>
    }
    if(this.props.isAuthenticated === true && this.props.erole === '2') {
      route = <Switch> 
        <Route path="/crew" component={CrewRoutes}/>
        <Redirect to="/"/>  
      </Switch>
    }
    else{
      
    }
    return (
      <React.Fragment>
        <Router>
          <Route default path="/" exact component={Dashboard}/>
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

