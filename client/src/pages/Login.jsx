//Login

import React, { useEffect } from "react"
import { Container, Card, Form, Button, Alert, Stack, Row, Col } from "react-bootstrap"
import backgroundImage from '../assets/messageBG2.jpg'

export const Login = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'left';
    document.body.style.backgroundColor = '#ffff';
    return () => {
      document.body.style = '';
    };
  }, [])


  return (
    <>
      <Form className="mt-5">
        <Row style={{ justifyContent: "right" }}>
          <Col className="form" xs={6} >
            <Stack gap={2}>
              <h2 style={{ padding: '20px', textAlign: "center" }}>Login</h2>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email"></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"></Form.Control>
              <Button className="mt-3 mb-3" variant="primary" type="submit">Login</Button>
              {/* <Alert variant="danger"><p>An error occured!</p></Alert> */}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  )
}
