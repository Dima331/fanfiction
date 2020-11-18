import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { FormattedMessage } from 'react-intl'

export const TokenPresentPage = () => {
    return  (
        <Row className='justify-content-md-center'>
          <Col xs lg='6' className='mt-5'>
            <Jumbotron>
              <h2 className='display-4 list-fanfic__title mb-4'><FormattedMessage id='auth-check-email'/></h2>
              <Link to={`/`}>
                <Button 
                    variant="primary" 
                    type="submit" >
                    <FormattedMessage id='auth-to-main'/>
                </Button>
              </Link>
            </Jumbotron>
          </Col>
        </Row>
      )
}