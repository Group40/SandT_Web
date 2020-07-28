import React, { Component, Fragment } from 'react';
import { Collapse, Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Logout from './LogOut.component';
import { connect } from 'react-redux';
class AdminNav extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
        collapsed: true,
    };
  }

  toggleNavbar = e => {
    this.setState({ collapsed: !this.state.collapsed });   
  };
  render(){
  return (
    <React.Fragment>
      <Navbar color="info" light>
        <NavbarBrand href="/admin/dashboard" className="mr-auto">S & T Admin Dashboard</NavbarBrand>
        {(this.props.isAuthenticated === true && this.props.erole === '3') ? 
        <React.Fragment>
          <Fragment>Hi {this.props.username}!</Fragment>
          <Fragment><Logout/></Fragment>
        </React.Fragment>
        : null}
        <NavbarToggler color="dark" onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            {(this.props.isAuthenticated === true && this.props.erole === '3') ? 
            <React.Fragment>
              <NavItem>
                <NavLink href="/admin/addevents">Add a new event</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/eventlist">Events List</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/eventcalendar">Event Calendar</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/eventmanagement">Event Management</NavLink>
              </NavItem>
              <NavItem>
                <Logout/>
              </NavItem>
              </React.Fragment>
                : 
                <NavItem>
                <NavLink href="/login">Login as an admin</NavLink>
              </NavItem>
            } 
          </Nav>
        </Collapse>  
      </Navbar>
      </React.Fragment>
  );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  erole: state.auth.erole,
  username: state.auth.username
});

export default connect(mapStateToProps,null)(AdminNav);