import React, { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../context/Auth.context';
// import { useHttp } from '../hooks/http.hook';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Rating  from 'react-rating';
import { Star } from 'react-bootstrap-icons';
import { StarFill } from 'react-bootstrap-icons';
import {IntlProvider, FormattedMessage, FormattedNumber} from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom'
import {
  fetchLoginUserRequest,
  loginUserError,
  loginUser
} from '../modules/users';

export const AuthPage = () => {
  const [form, setForm] = useState({
    login: '', password: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  const { error, token } = useSelector(state => ({
    error: loginUserError(state),
    token: loginUser(state),
  }));

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(fetchLoginUserRequest(form))
  }

  useEffect(() => {
    if(token){
      history.push(`/`);
    }
  }, [error, token])

  return (
    <Row className='justify-content-md-center'>
      <Col xs lg='6' className=' mt-5'>
        <Card>
          <Card.Body>
            <h1><FormattedMessage id='auth-title-auth'/></h1>
            <Form onSubmit={loginHandler}>
              <Form.Group controlId='formBasicLogin'>
                <Form.Label><FormattedMessage id='auth-login'/></Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='login'
                  value={form.login}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label><FormattedMessage id='auth-password'/></Form.Label>
                <Form.Control
                  required
                  type='password'
                  name='password'
                  value={form.password}
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
                variant='primary'
                type='submit'><FormattedMessage id='nav-auth'/>
                </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
};