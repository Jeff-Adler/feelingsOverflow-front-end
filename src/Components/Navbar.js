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
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
        <Navbar sticky="top" color="light" light expand="md">
          <NavbarBrand>
            pillow talk
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
                <NavLink tag={Link} to="/createpost">create new post</NavLink>
              </NavItem>

              <NavItem>
              {props.user ? <NavLink onClick={props.clickHandler} href="/login">log out </NavLink> :
                    <NavLink to="/login">
                        login
                    </NavLink>
                }
              </NavItem>



 

                {/* left this here in case we want to use a dropdown? */}
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
            <NavbarText> {props.user? `Welcome, ${props.user.username}! ` : null} </NavbarText>
          </Collapse>
        </Navbar>
    );
  }
  

export default NavBar


// <ul id="navbar">
//                 {props.user? `Welcome, ${props.user.username}! ` : null}
//                 <br/>

//                 <NavLink to="/posts">
//                     <li>Posts </li>
//                 </NavLink>

//                 <NavLink to="/createpost">
//                     <li>Create Post </li>
//                 </NavLink>

//                 <NavLink to="/signup">
//                     <li>Create Account </li>
//                 </NavLink>

//                 {/* <NavLink to={`/users/${props.user.id}/`}> */}
//                 <NavLink to="/profile">
//                     <li>Profile </li>
//                 </NavLink>

//                 {props.user ? <li onClick={props.clickHandler}>Log Out </li> :
//                     <NavLink to="/login">
//                         <li>Login </li>
//                     </NavLink>
//                 }

//             </ul>