import React, { Component, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Logout from './LogOut.component';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

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
        {(this.props.erole === '3') 
        ?
        <NavbarBrand href="/admin/dashboard" className="mr-auto">S & T Admin Dashboard</NavbarBrand>
        :
        <NavbarBrand href="/crew/dashboard" className="mr-auto">S & T Crew Member Dashboard</NavbarBrand>
        }
        {(this.props.isAuthenticated === true && this.props.erole === '3') ?
        <React.Fragment>
          <Fragment>Hi {this.props.username}!</Fragment>
          <Fragment>
              <NavLink href="/admin/notifications">
              <FontAwesomeIcon icon={faBell}/>
              </NavLink>
          </Fragment>
          <Fragment><Logout/></Fragment>
        </React.Fragment>
        : 
        <React.Fragment>
          <Fragment>Hi {this.props.username}!</Fragment>
          <Fragment>
              <NavLink href="/crew/notifications">
              <FontAwesomeIcon icon={faBell}/>
              </NavLink>
          </Fragment>
          <Fragment><Logout/></Fragment>
        </React.Fragment>
        }
        <NavbarToggler color="dark" onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            {(this.props.isAuthenticated === true && this.props.erole === '3') ?
            <React.Fragment>
              <NavItem>
                <NavLink href="/admin/eventmanagement">Event Management</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/usermanagement">User Management</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/photomanagement">Astrography Management</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/coursemanagement">Institute of Astronomy</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">S & T Publications</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/optics">S & T Optics</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">IOAS Astrophilia</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/notifications">Report Generator</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/appscroll">App HomeScreen Scroll</NavLink>
              </NavItem>
              </React.Fragment>
                :
              <React.Fragment>
                <NavItem>
                  <NavLink href="/crew/eventmanagement">Event Management</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">User Management</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/crew/photomanagement">Astrography Management</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/crew/coursemanagement">Institute of Astronomy</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">S & T Publications</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">S & T Optics</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">IOAS Astrophilia</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/crew/notifications">Report Generator</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/crew/appscroll">App HomeScreen Scroll</NavLink>
                </NavItem>
              </React.Fragment>
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