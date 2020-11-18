import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Loader } from '../components/Loader'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTokenUserRequest,
  getTokenError,
  getTokenLoading,
} from '../modules/users';

export const TokenPage = () => {
  const token = useParams().id;
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => ({
    error: getTokenError(state),
    loading: getTokenLoading(state),
  }));

  useEffect(() => {
    // console.log(3424)
    dispatch(fetchTokenUserRequest({ token }))
  }, [token])

  if (loading) {
    return (
      <Loader />
    )
  }
  return (
    <Row className='justify-content-md-center'>
      <Col xs lg='6' className='mt-5'>
        <Jumbotron>
          {!error &&
            <div>
              <h2 className='display-4 mb-4'><FormattedMessage id='auth-confirmed-emain' /></h2>
              <Link to={`/auth`}>
                <Button
                  variant="light"><FormattedMessage id='nav-auth' />
                </Button>
              </Link>
            </div>
          }
          {error
            &&
            <div>
              <h2 className='display-4 mb-4'><FormattedMessage id='auth-not-valid' /></h2>
              <Link to={`/`}>
                <Button
                  variant="primary"
                  type="submit">
                  <FormattedMessage id='auth-to-main' />
                </Button>
              </Link>
            </div>
          }
        </Jumbotron>
      </Col>
    </Row>
  );
}