import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HomeImg from '../Assets/Home.jpg'
import styled from 'styled-components';
import { motion } from 'framer-motion';


const Home = () => {
    const Section = styled.section`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `

    const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    padding: 3rem calc((100vw-1300px) / 2);
  `

    const ColumnLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem 6rem;

    h1{
        margin-bottom: 0.5rem;
        font-size: 3rem;
    }

    p{
        margin: 2rem 0;
        font-size: 2rem;
        line-height; 1;
    }
    `

    const Image = styled.img`
    height: 490px;
  `

    const ColumnRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 60px;
  `

    const fadeLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <Section>
            <Container>
                <ColumnLeft id='bk-text'>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        Welcome to Bread!
                    </motion.h1>
                    <motion.p
                        variants={fadeLeft}
                        initial='hidden'
                        animate='visible'
                        transition={{ duration: 3 }}
                        id='quote-font'
                    >
                        Stuck between <strong>"I need to save money"</strong> and <strong>"you only live once"</strong>?
                    </motion.p>
                    <motion.p
                        variants={fadeLeft}
                        initial='hidden'
                        animate='visible'
                        transition={{ duration: 3 }}
                        id='quote-font'
                    >
                        Start budgeting your money today with Bread, the best budgeting app!
                    </motion.p>
                    <Link to='/transactions/new'>
                        <Button>
                            Add Transaction
                        </Button>
                    </Link>
                </ColumnLeft>
                <ColumnRight>
                    <Image src={HomeImg} alt='two people exercising' />
                </ColumnRight>
            </Container>
        </Section>
    )
};

export default Home;