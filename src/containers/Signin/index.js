


import React, { useEffect } from 'react'
import { Layout } from '../../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Input } from '../../UI/Input';
import { isUserLoggedIn, login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const Signin = () => {
    

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    // const [ values , handledInputChange, reset ] = useForm();

    // const { email, password } = values;

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    
    // const [error, setError] = useState();


    const handledLogin = (e) => {

        e.preventDefault();

        console.log(email);
        dispatch(login({email, password}));
    }

    if( auth.authenticate){
        return <Redirect to={`/`} />
    }


    return (
        <Layout>
            <Container>
                <Row style = {{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset:3}} >
                        <form onSubmit={ handledLogin } >
                            <Input 
                                type="email"
                                placeholder = "Email"
                                label="Email"
                                autoComplete= "off"
                                name="email"
                                value= { email }
                                onChange = { (e) => setEmail(e.target.value) }
                                />
                            <Input 
                                label="Password"
                                placeholder = "Password"
                                type="password"
                                autoComplete= "off"
                                name="password"
                                value= { password }
                                onChange = { (e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
