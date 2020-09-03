import React from 'react';
import { NavLink } from 'react-router-dom'

function Navbar (props) {
    return (
        <>
            <NavLink to="/signup">
                Create Account 
            </NavLink>

            {props.user ? <li onClick={props.clickHandler}>Log Out</li> :
                <NavLink to="/login">
                    Login 
                </NavLink>
            }

            <NavLink to="/posts">
                Posts 
            </NavLink>

            <NavLink to="/createpost">
                Create Post 
            </NavLink>
        </>
    )
}

export default Navbar