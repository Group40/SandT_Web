import React, { Component } from "react";
import AdminNav from "../../Components/AdminNav.component";
import AdminLogin from "./AdminLogin";
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <AdminNav/>
                {(this.props.isAuthenticated === 'true' && this.props.erole === '3') ? 
                <h1>hi</h1>
                : <AdminLogin/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole
  });
  
export default connect(mapStateToProps,null)(Dashboard);
