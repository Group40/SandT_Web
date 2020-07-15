import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const AdminNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <React.Fragment>
      <Navbar color="info" light>
        <NavbarBrand href="/admin/dashboard" className="mr-auto">S & T Admin Dashboard</NavbarBrand>
        <NavbarToggler color="dark" onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/admin/addevents">Add a new event</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/eventlist">Events List</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/eventcalendar">Event Calendar</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </React.Fragment>
  );
}

export default AdminNav;