import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Loader } from '../components/Loader';
import { AsideUser } from '../components/AsideUser';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  fetchDeleteFanfictionRequest,
  fetchUserFanfictionsRequest,
  getUserFanfictionsLoading,
  getUserFanfictions,
  fetchFanfictionFailure
} from '../modules/fanfictions';

import {
    loginUser,
    getloginUser
} from '../modules/users';

export const UserFanfictionPage = () => {
  const dispatch = useDispatch();
  const { fanfictions, loading, token, loadUser } = useSelector(state => ({
    fanfictions: getUserFanfictions(state),
    loading: getUserFanfictionsLoading(state),
    token: loginUser(state),
    loadUser: getloginUser(state)
  }));
  
  useEffect(() => {
    dispatch(fetchFanfictionFailure(null))
    dispatch(fetchUserFanfictionsRequest(token.user.id))
  }, [token])

  const deleteFanfictionHandler = (e, id) => {
    e.preventDefault()
    console.log(id)
    dispatch(fetchDeleteFanfictionRequest(id))
  }
  
  if (loading && loadUser) {
    return (
      <Loader />
    )
  }

  return (
    <Row className=' mt-5 main'>
      <Col xs  md='8' sm='12' xs='12'>
        {!loading  && fanfictions &&
        <>
            {fanfictions && fanfictions.length === 0 && 
            <div className='d-flex justify-content-center'>
              <h2><FormattedMessage id='funfiction-no'/></h2>
            </div>
            
            }
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
                    <p className='list-fanfic__genre mb-2'><FormattedMessage id='funfiction-genre'/>:  {item.genre}</p>
                    
                    <Link
                      className='link'
                      to={`/view/${item.id}`}><Button variant="primary" className='mb-5'><FormattedMessage id='funfiction-show'/></Button>
                    </Link>
                    <Row>
                      <Col xs lg="6">
                        <ul className='tags-list  d-flex'>
                          {item.tags.map(item => {
                            return <li key={item.id} className="tags-list__item mr-2"><Badge variant="info">{item.name}</Badge></li>
                          })}
                        </ul>
                      </Col>
                      <Col xs lg="2" className='d-flex justify-content-md-end'><FormattedMessage id='funfiction-author'/>: {item.user}</Col>
                      <Col xs lg="4" className='d-flex justify-content-md-end'><FormattedMessage id='funfiction-date'/>: {item.dateString}</Col>
                    </Row>
                    <div className='mt-4'>
                      <Link to={`/edit/fanfiction/${item.id}`}> 
                        <Button variant="success" type="submit" className='mr-2'><FormattedMessage id='edit'/></Button>
                      </Link>
                      <Link to="#" onClick={(e) => deleteFanfictionHandler(e, item.id)}>
                          <Button variant="success" type="submit"><FormattedMessage id='delete'/></Button>
                      </Link>
                    </div>
                  </Jumbotron>
                </li>
              )
            }
           
            })
            }
          </ul>
          </>
        }
      </Col>
      <Col xs  md='4' sm='12' xs='12'> 
        <AsideUser />
      </Col>
    </Row>
  );
}