import React from 'react'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import pulseLogo from '../assets/pulseLogo.png'

export const NavBar = () => {
    return (
        <>
            <Navbar border="success" className="mb-4 myCustomNavbar">
                <Container>
                    <Link to='/' className='text-decoration-none'>
                        <h2 className='navBarHeading'>
                            PulseChat
                            <img src={pulseLogo} style={{ width: '30px' }}></img>
                        </h2>
                    </Link>
                    <span>Welcome, Manish Singh! 😎</span>
                    <Nav>
                        <Stack direction='horizontal' gap={3}>
                            <Link to='/login' className='text-decoration-none'>
                                <h6 className='navBarHeading '>
                                    Login
                                </h6>
                            </Link>
                            <Link to='/register' className='text-decoration-none'>
                                <h6 className='navBarHeading'>
                                    Register
                                </h6>
                            </Link>
                        </Stack>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
