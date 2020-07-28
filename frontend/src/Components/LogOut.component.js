import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../Actions/authActions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render(){
        return(
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">
                <FontAwesomeIcon icon={faSignOutAlt}/>Logout
                </NavLink>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { logout }
)(Logout);