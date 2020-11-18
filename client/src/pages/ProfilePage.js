import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import {useSelector, useDispatch } from 'react-redux';
import EditInPlace from "react-edit-in-place"
import { FormattedMessage} from 'react-intl'

import {
    loginUser,
    fetchEditUserRequest,
    getEditUserError,
    fetchUserRequest,
    getOneUser
  } from '../modules/users';

  
export const ProfilePage = () => {
    const dispatch = useDispatch();
    const userId = useParams().id;
    const [form, setForm] = useState({
      email: '', login: '', password: '', name: '', city: '',
    });

    const { error, token, user } = useSelector(state => ({
      error: getEditUserError(state),
      token: loginUser(state),
      user: getOneUser(state),
    }));
  
    const changeHandler = (name, value) => {
      setForm({ ...form, [name]: value });
    }
  
    const editHandler = async (e) => {
      e.preventDefault();
     dispatch(fetchEditUserRequest(form))
    }

    useEffect(() => {
      setForm(user)
    }, [user])


    useEffect(() => { 
       if(!userId){
        setForm(token.user)
      } else {
        dispatch(fetchUserRequest(userId))
      }
    }, [])

    return (
        <Row className="justify-content-md-center">
          <Col xs lg="6" className=" mt-5">
            <Card>
              <Card.Body>
                <h1><FormattedMessage id='edit'/></h1>
                <Form onSubmit={editHandler}>
                  <Form.Group controlId="formBasicEmail" className='d-flex'>
                    <Form.Label className='form-label'><FormattedMessage id='auth-email'/></Form.Label>
                {form.email &&
                    <EditInPlace 
                        value={form.email}
                        name="email" 
                        type="email" 
                        placeholder="text1"
                        className="edit-in-place"
                        isDisabled={false}
                        onChange={(value, name) => {changeHandler(name, value)}} 
                    />
                    }
                  </Form.Group> 
                  <Form.Group controlId="formBasicLogin" className='d-flex'>
                    <Form.Label className='form-label'><FormattedMessage id='auth-login'/></Form.Label>
                    {form.login &&
                    <EditInPlace 
                        value={form.login}
                        name="login" 
                        type="text" 
                        placeholder="text1"
                        className="edit-in-place"
                        isDisabled={false}
                        onChange={(value, name) => {changeHandler(name, value)}} 
                    />
                    }
                  </Form.Group> 
                  <Form.Group controlId="formBasicEmail" className='d-flex'>
                    <Form.Label className='form-label'><FormattedMessage id='auth-name'/></Form.Label>
                    {form.name &&
                    <EditInPlace 
                        value={form.name}
                        name="name" 
                        type="text" 
                        placeholder="text1"
                        className="edit-in-place"
                        isDisabled={false}
                        onChange={(value, name) => {changeHandler(name, value)}} 
                    />
                    }
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className='d-flex'>
                    <Form.Label className='form-label'><FormattedMessage id='auth-city'/></Form.Label>
                    {form.city &&
                        <EditInPlace 
                            value={form.city}
                            name="city" 
                            type="text" 
                            placeholder="text1"
                            className="edit-in-place"
                            isDisabled={false}
                            onChange={(value, name) => {changeHandler(name, value)}} 
                         />
                    }
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
                    <FormattedMessage id='edit'/></Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )
}