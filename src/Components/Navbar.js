import React from 'react';
import { NavLink } from 'react-router-dom'

function Navbar (props) {
    return (
        <ul>
            <NavLink to="/signup">
                <li>Create Account</li>
            </NavLink>

            {props.user ? <li onClick={props.clickHandler}>Log Out</li> :
                <NavLink to="/login">
                    <li>Login</li>
                </NavLink>
            }
        </ul>
    )
}

export default Navbar