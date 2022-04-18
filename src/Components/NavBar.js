import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Nav, Navbar, Container } from 'react-bootstrap';


const NavBar = () => {
    const { logOut, currentUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        try {
            setLoading(true);
            await logOut();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>🍞  Bread</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to='/transactions' >Transactions</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to='/transactions/new'>New Transaction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            {!currentUser?.email && <Nav.Link as={NavLink} to='/signin'>Sign In</Nav.Link>}
                            {currentUser?.email && <Nav.Link as={NavLink} to='/signin' onClick={handleSignOut} disabled={loading}>Sign Out</Nav.Link>}
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;