import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { locales } from '../local/locales'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  fetchLoginOutUser,
  loginUser
} from '../modules/users';

export const Navigation = ({ currentLocale, setCurrentLocale, setTheme, theme }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => ({
    token: loginUser(state),
  }));

  const handleChange = event => {
    setCurrentLocale(event.target.value);
    localStorage.setItem('local', event.target.value)
  }

  const handleStyle = () => {
    setTheme(prev => {
      let state = prev == 0 ? 1 : 0
      localStorage.setItem('theme', state)
      return state
    })
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container className="nav-container">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="w-100">
        <div className=' d-flex align-items-center nav-search' >
          <Navbar.Brand href="/"><FormattedMessage id='nav-main' /></Navbar.Brand>
          <Form inline className="ml-4 ">
            <FormControl
              size="sm"
              type="text"
              className="mr-2 marginl" />
            <Button
              variant="info" ><FormattedMessage id='nav-search' /></Button>
          </Form>
        </div>
        <div className='d-flex align-items-center  justify-content-center nav-option'  >
          <Col className='d-flex align-items-center justify-content-end'>
            <Form.Control as="select" size="sm"
              value={currentLocale}
              className="mr-4"
              onChange={handleChange}>
              <FormattedMessage id='local-picker.en'>
                {(message) => <option value={locales.EN}>{message}</option>}
              </FormattedMessage>
              <FormattedMessage id='local-picker.ru'>
                {(message) => <option value={locales.RU}>{message}</option>}
              </FormattedMessage>
            </Form.Control>
          </Col>
          <Col className='d-flex align-items-center justify-content-center' >
            <Button
              variant="success"
              onClick={handleStyle}
            >Style
            </Button>
          </Col>
        </div>
        {!token &&
          <div className='d-flex align-items-center  nav-auth'>
            <Nav.Link href="/auth">
              <Button
                variant="light">
                <FormattedMessage id='nav-auth' />
              </Button>
            </Nav.Link>
            <Nav.Link href="/registration">
              <Button
                variant="light">
                <FormattedMessage id='nav-reg' />
              </Button>
            </Nav.Link>

          </div>
        }
        {token &&
          <Col className='d-flex align-items-center nav-auth' xs lg="3" >
            <p className="mr-4 user-name" >
              <FormattedMessage id='nav-person' />: {token.user.name}</p>
            <Button
              variant="light"
              onClick={() => dispatch(fetchLoginOutUser())}>
              <FormattedMessage id='nav-out' />
            </Button>
          </Col>
        }

      </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}