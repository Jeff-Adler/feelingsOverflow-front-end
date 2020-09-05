import React from 'react';
import { NavLink } from 'react-router-dom'

function Navbar (props) {
    return (
        <ul id="navbar">
            {props.user? `Welcome, ${props.user.username}! ` : null}<br/>

            <NavLink to="/posts">
                <li>Posts </li>
            </NavLink><br/>

            <NavLink to="/createpost">
                <li>Create Post </li>
            </NavLink><br/>

            <NavLink to="/signup">
                <li>Create Account </li>
            </NavLink><br/>

            {/* <NavLink to={`/users/${props.user.id}/`}> */}
            <NavLink to="/profile">
                <li>Profile </li>
            </NavLink><br/>

            {props.user ? <li onClick={props.clickHandler}>Log Out </li> :
                <NavLink to="/login">
                    <li>Login </li>
                </NavLink>
            }

        </ul>
    )
}

export default Navbar