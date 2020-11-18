import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import {
  fetchAddUserRequest,
  getUserError,
  getUser
} from '../modules/users';

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    email: '', login: '', password: '', name: '', city: '',
  });

  const { error, token, user } = useSelector(state => ({
    error: getUserError(state),
    token: getUser(state),
    user: getUser(state),
  }));

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(fetchAddUserRequest(form))
  }

  useEffect(() => {
    if(user){
      if(user.length !== 0){
        history.push(`/confirmation`);
      }
    }
  }, [error, user])

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="6" className=" mt-5">
        <Card>
          <Card.Body>
            <h1><FormattedMessage id='auth-title-registration'/></h1>
            <Form onSubmit={registerHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label><FormattedMessage id='auth-email'/></Form.Label>
                <Form.Control
                  required
                  minLength="3"
                  maxLength="30"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={changeHandler} />
              </Form.Group>
              <Form.Group controlId="formBasicLogin">
                <Form.Label><FormattedMessage id='auth-login'/></Form.Label>
                <Form.Control
                  required
                  minLength="3"
                  maxLength="20"
                  type="text"
                  name="login"
                  value={form.login}
                  onChange={changeHandler} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label><FormattedMessage id='auth-password'/></Form.Label>
                <Form.Control
                  required
                  minLength="3"
                  maxLength="20"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label><FormattedMessage id='auth-name'/></Form.Label>
                <Form.Control
                  required
                  minLength="3"
                  maxLength="20"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={changeHandler} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label><FormattedMessage id='auth-city'/></Form.Label>
                <Form.Control
                  required
                  minLength="3"
                  maxLength="20"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={changeHandler} />
              </Form.Group>
              {error && 
                <Alert variant='danger'>
                  <p>{error.message}</p>
                  {error.errors && error.errors.map((err, i) => {
                    return (
                    <p key={i}>{err.msg}</p>
                    )
                  })}
                </Alert>}
              <Button
                variant="primary"
                type='submit'>
                <FormattedMessage id='comment-send'/></Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}