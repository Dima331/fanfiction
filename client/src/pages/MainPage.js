import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/Loader'
import { Aside } from '../components/Aside';
import { Link } from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StarRatings from 'react-star-ratings';
import { FormattedMessage } from 'react-intl'

import {
  getFanfictions,
  getFanfictionsLoading,
  fetchFanfictionsRequest,
  fetchDeleteFanfictionRequest,
  fetchFanfictionFailure,
  fetchRatingRequest,
} from '../modules/fanfictions';
import {
  loginUser,
} from '../modules/users';

export const MainPage = () => {
  const dispatch = useDispatch();
  const [star, setStar] = useState({});
  const { fanfictions, loading, token } = useSelector(state => ({
    token: loginUser(state),
    fanfictions: getFanfictions(state),
    loading: getFanfictionsLoading(state),
  }));
  
  useEffect(() => {
    dispatch(fetchFanfictionFailure(null))
    dispatch(fetchFanfictionsRequest())
  }, [])

  const deleteFanfictionHandler = (e, id) => {
    e.preventDefault()
    dispatch(fetchDeleteFanfictionRequest(id))
  }

  const ratingHandler = (mark , idFan) => {
    dispatch(fetchRatingRequest({mark, idFan, user: token.user}))
  }
  
  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <Row className=' mt-5 main'>
      <Col xs  md='8' sm='12' xs='12'>
        {!loading  && fanfictions &&
          <ul className=" list-fanfic">
            {fanfictions && fanfictions.map((item, i) => {
              if(!item.hide){
              return (
                <li key={i} className='rounded-lg  list-fanfic__item' >
                  <Jumbotron>
                    <h2 className='display-4 list-fanfic__title mb-4'>{item.title}</h2>
                    <Alert variant='light'>
                      <p className='list-fanfic__des'>{item.description}</p>
                    </Alert>
                    <p className='list-fanfic__genre mb-2'><FormattedMessage id='funfiction-genre'/>: {item.genre}</p>
                    <div className='star-container mb-4'>
                      <p className='list-fanfic__rating mr-2'><FormattedMessage id='funfiction-rating'/>: </p>
                        {!token && <div className="star-blok"></div>}
                        <StarRatings
                          rating={item.rating}
                          changeRating={ratingHandler}
                          numberOfStars={5}
                          starDimension="20px"
                          starSpacing="0px"
                          name={item.id.toString()}
                        />
                        <p className='star-number'>{item.rating}</p>
                    </div>
                    <Link
                      className='link'
                      to={`/view/${item.id}`}><Button variant="primary" className='mb-5'><FormattedMessage id='funfiction-show'/></Button>
                    </Link>
                    <Row>
                      <Col xs lg="6">

                        <ul className='tags-list  d-flex flex-wrap'>
                          {item.tags.map(item => {
                            return <li key={item.id} className="tags-list__item mr-2 mb-2"><Badge variant="info">{item.name}</Badge></li>
                          })}
                        </ul>
                      </Col>
                      <Col xs lg="2" className='d-flex justify-content-md-end'><FormattedMessage id='funfiction-author'/>: {item.user}</Col>
                      <Col xs lg="4" className='d-flex justify-content-md-end'><FormattedMessage id='funfiction-date'/>: {item.dateString}</Col>
                    </Row>
                    {token && +token.user.role == '1'  &&
                    <div className='mt-4'>
                      <Link to={`/edit/fanfiction/${item.id}`}> 
                        <Button variant="success" type="submit" className='mr-2'><FormattedMessage id='edit'/></Button>
                      </Link>
                      <Link to="#" onClick={(e) => deleteFanfictionHandler(e, item.id)}>
                          <Button variant="success" type="submit"><FormattedMessage id='delete'/></Button>
                      </Link>
                    </div>}
                  </Jumbotron>
                </li>
              )
            }
            })}
          </ul>
        }
      </Col>
      <Col xs  md='4' sm='12' xs='12'> 
        <Aside />
      </Col>
    </Row>
  );
}