//Register.jsx

import React, { useContext, useEffect } from "react";
import { Form, Button, Stack, Row, Col, Alert } from "react-bootstrap";
import backgroundImage from '../assets/messageBG.jpg';
import { AuthContext } from "../context/AuthContext";

export const Register = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'right';
    document.body.style.backgroundColor = '#ffff';
    return () => {
      document.body.style = '';
    };
  }, []);

  const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
  

  return (
    <Form className="mt-md-5" onSubmit={registerUser}>
      <Row className="justify-content-md-left">
        <Col className="form" xs={12} md={6}>
          <Stack gap={2} className="mx-auto">
            <h2 className="p-md-4 text-center">Register</h2>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
            <Button className="mt-3 mb-3" variant="primary" type="submit">
              {isRegisterLoading ? 'creating your account...' : "Register"}
            </Button>
            {registerError?.error && <Alert variant="danger"><p>{registerError?.message}</p></Alert>}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};















//Without Responsive

// import React, { useEffect } from "react"
// import { Container, Card, Form, Button, Alert, Stack, Row, Col } from "react-bootstrap"
// import backgroundImage from '../assets/messageBG.jpg'

// export const Register = () => {

//   useEffect(() => {
//     document.body.style.backgroundImage = `url(${backgroundImage})`;
//     document.body.style.backgroundSize = 'contain';
//     document.body.style.backgroundRepeat = 'no-repeat';
//     document.body.style.backgroundPosition = 'right';
//     document.body.style.backgroundColor = '#ffff';
//     return () => {
//       document.body.style.backgroundImage = '';
//       document.body.style.backgroundSize = '';
//       document.body.style.backgroundRepeat = '';
//       document.body.style.backgroundPosition = '';
//       document.body.style.backgroundColor = '#ffff';
//     };
//   }, [])


//   return (
//     <>
//       <Form className="mt-5">
//         <Row style={{ justifyContent: "left" }}>
//           <Col className="form" xs={6}>
//             <Stack gap={2}>
//               <h2 style={{ padding: '20px', textAlign: "center" }}>Register</h2>
//               <Form.Label >Name</Form.Label>
//               <Form.Control type="text" placeholder="Name"></Form.Control>
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" placeholder="Email"></Form.Control>
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password"></Form.Control>
//               <Button className="mt-3 mb-3" variant="primary" type="submit">Register</Button>
//               {/* <Alert variant="danger"><p>An error occured!</p></Alert> */}
//             </Stack>
//           </Col>
//         </Row>
//       </Form>
//     </>
//   )
// }
