import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/Loader';
import { FormattedMessage } from 'react-intl'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../styles/styles.css';

import {
  getTagsLoading,
} from '../modules/tags';

import {
  getGenres,
  getGenresLoading,
  fetchGenresRequest
} from '../modules/genres';
import {
  filterGenreFanfictions,
  filterResetFanfictions,
  filterTimeLaterFanfictions,
  filterTimeEarlyFanfictions
} from '../modules/fanfictions';

import {
  loginUser
} from '../modules/users';

export const AsideUser = () => {
  const dispatch = useDispatch();
  const { genres, loadTags, loadGenres, user } = useSelector(state => ({
    genres: getGenres(state),
    loadTags: getTagsLoading(state),
    loadGenres: getGenresLoading(state),
    user: loginUser(state),
  }));

  useEffect(() => {
    dispatch(fetchGenresRequest())
  }, [])

  if (loadTags || loadGenres) {
    return (
      <Loader />
    )
  }

  return (
    <>
      {!loadTags && !loadGenres &&
        <aside className='h-100 aside rounded-lg'>
           {user &&
            <>
              <Link to={`/addfanfiction`}> 
                <Button variant="success"  className='mr-2 mb-2'>
                  <FormattedMessage id='funfiction-add'/></Button>
              </Link>
              <Link to={`/profile`}> 
                <Button variant="success"  className='mr-2 mb-2'>
                  <FormattedMessage id='profile'/></Button>
              </Link>
            </>
          }
          <Card className='card_fix'>
            <Card.Body>
            <FormattedMessage id='aside-filter-time'/>
              <div className='d-flex mt-2 justify-content-between'>
                <Button 
                  variant="primary" 
                  className='btn-filter-raiting'
                  onClick={()=> dispatch(filterTimeLaterFanfictions(213))}>
                  <FormattedMessage id='aside-filter-time-min'/>
                </Button>
                <Button 
                  variant="primary" 
                  className='btn-filter-raiting'
                  onClick={()=> dispatch(filterTimeEarlyFanfictions(123))}
                  >
                 <FormattedMessage id='aside-filter-time-max'/>
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card className='card_fix'>
            <Card.Body>
              <FormattedMessage id='aside-filter-genre'/>
              <ul>
              <li className='d-flex mt-2'>
                <Button 
                  variant="primary" 
                  className='btn-filter-genre w-100'
                  onClick={()=> (dispatch(filterResetFanfictions()))}
                ><FormattedMessage id='aside-reset'/> </Button>
              </li>
                {genres && genres.map((genre) => (
                  <li key={genre.id} className='d-flex mt-2'>
                    <Button 
                      variant="primary" 
                      className='btn-filter-genre w-100'
                      onClick={()=> (dispatch(filterGenreFanfictions(genre.name)))}>
                      {genre.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </aside>
      }
    </>
  )
}