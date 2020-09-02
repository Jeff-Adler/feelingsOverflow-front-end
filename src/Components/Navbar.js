import React from 'react';
import { NavLink } from 'react-router-dom'

function Navbar () {
    return (
        <ul>
            <NavLink to="/signup">
                <li>Create Account</li>
            </NavLink>
            <NavLink to="/login">
                <li>Login</li>
            </NavLink>
        </ul>
    )
}

export default Navbar