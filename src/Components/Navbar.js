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
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
        <Navbar sticky="top" color="light" light expand="md">
          <NavbarBrand>
            PillowTalk
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            
            <Nav className="mr-auto" navbar>
              
              <NavItem>
                <NavLink tag={Link} to="/posts">all posts</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink tag={Link} to="/profile">
                  my posts
                </NavLink>
              </NavItem>

              <NavItem>
              {props.user ? <NavLink onClick={props.clickHandler} href="/login">log out </NavLink> :
                    <NavLink to="/login">
                        login
                    </NavLink>
                }
              </NavItem>
            </Nav>
            <NavbarText> {props.user? `Welcome, ${props.user.username}! ` : null} </NavbarText>
          </Collapse>
        </Navbar>
    );
  }
  

export default NavBar

