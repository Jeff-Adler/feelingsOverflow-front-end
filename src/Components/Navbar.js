import React from 'react';
import { NavLink } from 'react-router-dom'

function Navbar (props) {
    return (
        <ul id="navbar">
            {props.user? `Welcome, ${props.user.username}! ` : null}<br/>

            <NavLink to="/posts">
                <li>Posts </li>
            </NavLink>

            <NavLink to="/createpost">
                <li>Create Post </li>
            </NavLink>

            <NavLink to="/signup">
                <li>Create Account </li>
            </NavLink>

            {props.user ? <li onClick={props.clickHandler}>Log Out </li> :
                <NavLink to="/login">
                    <li>Login </li>
                </NavLink>
            }

        </ul>
    )
}

export default Navbar