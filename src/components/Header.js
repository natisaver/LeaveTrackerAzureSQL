import  { React, useState } from 'react'
import Message from './Message';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import "../index.css";


const Header = () => {

    

    return (
        <header>

            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Leave Application <img alt="logo" id="floatpic" src="https://img.icons8.com/color/48/000000/float.png"/></Navbar.Brand>   
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Nav className="ms-auto text-right" id="aligntoright">
                            <LinkContainer to="/apply">
                                <Nav.Link><i class="fas fa-archive"></i> Requests</Nav.Link>
                            </LinkContainer>
                            {userInfo 
                                ? (<NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>) 
                                : 
                                <LinkContainer to="/login">
                                    <Nav.Link><i class="fas fa-user"></i> Sign In</Nav.Link>
                                </LinkContainer>
                            }

                        </Nav> */}
                    </Navbar.Collapse>                    
                </Container>
            </Navbar>
            {/* {logoutz && <Message error="Success!" msg="You have logged out." variant="success"/> } */}
        </header>
    )
}

export default Header
