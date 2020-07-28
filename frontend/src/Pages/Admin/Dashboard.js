import React, { Component } from "react";
import AdminNav from "../../Components/AdminNav.component";
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <AdminNav/>
                {(this.props.isAuthenticated === true && this.props.erole === '3') ? 
                <h1>logged</h1>
                : <h1>not logged</h1>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole
  });
  
export default connect(mapStateToProps,null)(Dashboard);
