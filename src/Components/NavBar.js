import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <NavLink to='/transactions'>Transactions</NavLink> {' '}
            <NavLink to='/transactions/new'>New Transaction</NavLink>{' '}
        </nav>
    )
}

export default NavBar;