import React, { useEffect, useState, useMemo, useCallback, } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { CaretUpFill } from 'react-bootstrap-icons';
import { CaretDownFill } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import { FormattedMessage } from 'react-intl'

export const ListChapters = ({ chapters, deleteHandler, changeOrderHandler, rights }) => {
  const linkId = useParams().id;

  return (
    <ListGroup>
      <ol className='list-chapters rounded-lg'>
        {chapters.length == 0 && <p><FormattedMessage id='chapters-no' /></p>}
        {chapters &&
          chapters.map((item, i) => {
            if (i == 0) {
              return (
                <ListGroup.Item key={i}>
                  <li style={{ listStyle: 'unset' }} className='list-chapters__item'>
                    <Row className='d-flex align-items-center'>
                      <Col md="12" lg='7'><Link to={`/view/${linkId}/${item.id}/`}>{item.title}</Link></Col>
                      {rights && <Col md="12" lg='5' className='d-flex align-items-center justify-content-between mt-3 mt-lg-0 container-btn'>
                        <div className='arrows d-flex justify-content-end'>
                          {chapters.length !== 1 &&
                            <Button variant="warning"
                              className='btn-arrow'
                              onClick={(e) => changeOrderHandler(e, i, 'down')}>
                              <CaretDownFill />
                            </Button>
                          }
                        </div>
                        <div>
                          <Button  className='mr-2' variant="danger" onClick={(e) => deleteHandler(e, item)}><FormattedMessage id='delete' /></Button>
                          <Link className='link' to={`/chapter/edit/${item.id}`}><Button variant="success"><FormattedMessage id='edit' /></Button></Link>
                        </div>
                      </Col>}
                    </Row>
                  </li>
                </ListGroup.Item>
              )
            } else if (i + 1 == chapters.length) {
              return (
                <ListGroup.Item key={i}>
                  <li style={{ listStyle: 'unset' }} className='list-chapters__item'>
                    <Row className='d-flex align-items-center'>
                      <Col md="12" lg='7'><Link to={`/view/${linkId}/${item.id}/`}>{item.title}</Link></Col>
                      {rights && <Col md="12" lg='5' className='d-flex align-items-center justify-content-between mt-3 mt-lg-0 container-btn'>
                        <div className='arrows d-flex justify-content-start'>
                          <Button variant="warning"
                            className='btn-arrow'
                            onClick={(e) => changeOrderHandler(e, i, 'up')}>
                            <CaretUpFill />
                          </Button>
                        </div>
                        <div>
                          <Button  className='mr-2' variant="danger" onClick={(e) => deleteHandler(e, item)}><FormattedMessage id='delete' /></Button>
                          <Link className='link' to={`/chapter/edit/${item.id}`}><Button variant="success"><FormattedMessage id='edit' /></Button></Link>
                        </div>
                      </Col>}
                    </Row>
                  </li></ListGroup.Item>
              )
            } else {
              return (
                <ListGroup.Item key={i}>
                  <li style={{ listStyle: 'unset' }} className='list-chapters__item'>
                    <Row className='d-flex align-items-center'>
                      <Col md="12" lg='7'><Link to={`/view/${linkId}/${item.id}/`}>{item.title}</Link></Col>
                      {rights && <Col md="12" lg='5' className='d-flex align-items-center justify-content-between mt-3 mt-lg-0 container-btn'>
                        <div className='arrows'>
                          <Button variant="warning"
                            onClick={(e) => changeOrderHandler(e, i, 'up')}
                            className='btn-arrow mr-2 '>
                            <CaretUpFill />
                          </Button>
                          <Button variant="warning"
                            onClick={(e) => changeOrderHandler(e, i, 'down')}
                            className='btn-arrow'>
                            <CaretDownFill />
                          </Button>
                        </div>
                        <div>
                          <Button className='mr-2' variant="danger" onClick={(e) => deleteHandler(e, item)}><FormattedMessage id='delete' /></Button>
                          <Link className='link ' to={`/chapter/edit/${item.id}`}> <Button variant="success"><FormattedMessage id='edit' /></Button></Link>
                        </div>
                      </Col>}
                    </Row>
                  </li>
                </ListGroup.Item>
              )
            }
          })
        }
      </ol>
      {rights &&
        <div>
          <Link
            to={{
              pathname: "/addchapter",
              funId: linkId,
            }}
            className='link'>
            <Button variant="success" className='mt-3'><FormattedMessage id='chapter-add' /></Button>
          </Link>
        </div>
      }
    </ListGroup>
  );
}