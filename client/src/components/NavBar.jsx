import React, { useContext } from 'react'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import pulseLogo from '../assets/pulseLogo.png'
import { AuthContext } from '../context/AuthContext';
import { Notification } from './Chats/Notification';

export const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <>
            <Navbar border="success" className="mb-4 myCustomNavbar">
                <Container>
                    <Link to='/' className='text-decoration-none'>
                        <h2 className='navBarHeading'>
                            PulseChat
                            <img src={pulseLogo} style={{ width: '45px' }}></img>
                        </h2>
                    </Link>
                    {user && <span>Welcome, {user?.name}! 😎</span>}
                    <Nav>
                        <Notification></Notification>
                        <Stack direction='horizontal' gap={3}>
                            {user && (<>
                                <Link onClick={() => logoutUser()} to='/login' className='text-decoration-none'>
                                    <h6 className='navBarHeading '>
                                        Logout
                                    </h6>
                                </Link>
                            </>)}
                            {!user && (
                                <>
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
                                </>
                            )}
                        </Stack>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
