import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <>
        <Navbar sticky="top" color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            Feelings<strong>Overflow</strong>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            
            <Nav className="mr-auto" navbar>
              
              <NavItem>
                <NavLink tag={Link} to="/">
                  Home
                </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink tag={Link} to="/user/posts">
                 My Posts
                </NavLink>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem data-toggle="false" tag={Link} to="/user/info">
                  Account Info
                </DropdownItem>
                <DropdownItem tag={Link} to={`/user/${props.user.id}/analytics`}>
                  Stats
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} onClick={props.clickHandler} to="/login">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            </Nav>
            <NavbarText> {props.user? `Welcome, ${props.user.username}! ` : null} </NavbarText>
          </Collapse>
        </Navbar>
      </>
    );
  }
  

export default NavBar

