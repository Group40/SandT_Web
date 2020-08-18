import React, { Component } from "react";
import AdminNav from "../../Components/AdminNav.component";
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                
                {(this.props.isAuthenticated === true && (this.props.erole === '3' || this.props.erole === '2')) ? 
                <AdminNav/>
                : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole
  });
  
export default connect(mapStateToProps,null)(Dashboard);
