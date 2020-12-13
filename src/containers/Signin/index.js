


import React from 'react'
import { Layout } from '../../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Input } from '../../UI/Input';
export const Signin = () => {
    return (
        <Layout>
            <Container>
                <Row style = {{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset:3}} >
                        <Form>
                        <Input 
                            label="Email"
                            placeholder = "Email"
                            value=""
                            type="email"
                            onChange = { () => {}}
                        />
                        <Input 
                            label="Password"
                            placeholder = "Password"
                            value=""
                            type="password"
                            onChange = { () => {}}
                        />
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
