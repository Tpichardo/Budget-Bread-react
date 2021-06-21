import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
    return (
        <Nav variant="tabs" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link as={NavLink} to='/' eventKey="link-1">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to='/transactions' eventKey="link-2">Transactions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to='/transactions/new' eventKey="link-3">New Transaction</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default NavBar;