import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Jumbotron fluid>
            <Container>
                <h1>Welcome to Bread!</h1>
                <p>Stuck between <strong>"I need to save money"</strong> and <strong>"you only live once?"</strong></p>
                <h6>Start budgeting your money today with Bread, the best budgeting app!</h6>
                <Link to='/transactions/new'>
                    <Button>
                        Add New Transaction
                    </Button>
                </Link>
            </Container>
        </Jumbotron>
    )
}

export default Home;