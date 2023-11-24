//Login

import React, { useContext, useEffect } from "react"
import { Form, Button, Alert, Stack, Row, Col } from "react-bootstrap"
import backgroundImage from '../assets/messageBG2.jpg'
import { AuthContext } from "../context/AuthContext";

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
  }, []);

  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } = useContext(AuthContext)


  return (
    <>
      <Form className="mt-5" onSubmit={loginUser}>
        <Row style={{ justifyContent: "right" }}>
          <Col className="form" xs={6} >
            <Stack gap={2}>
              <h2 style={{ padding: '20px', textAlign: "center" }}>Login</h2>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}></Form.Control>
              <Button className="mt-3 mb-3" variant="primary" type="submit">{isLoginLoading ? "Logging in.." : "Login"}</Button>
              {loginError && <Alert variant="danger"><p>{loginError?.message}</p></Alert>}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  )
}
