import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/styles.css';
import {
  getTags,
  getTagsLoading,
  fetchTagsRequest,
} from '../modules/tags';
import {
  getGenres,
  getGenresLoading,
  fetchGenresRequest
} from '../modules/genres';
import {
  filterMainTagFanfictions,
  filterMainGenreFanfictions,
  filterMainResetFanfictions,
  filterRatingMin,
  filterRatingMax
} from '../modules/fanfictions';

import {
  loginUser
} from '../modules/users';

export const Aside = () => {
  const dispatch = useDispatch();
  const { tags, genres, loadTags, loadGenres, user } = useSelector(state => ({
    genres: getGenres(state),
    tags: getTags(state),
    loadTags: getTagsLoading(state),
    loadGenres: getGenresLoading(state),
    user: loginUser(state),
  }));

  useEffect(() => {
    dispatch(fetchTagsRequest())
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
                {user.user.role == '1' && 
                <Link to={`/admin`}> 
                  <Button variant="success"  className='mr-2 mb-2'>
                    <FormattedMessage id='admin'/></Button>
                </Link>
                }
                <Link to={`/userfanfiction`}> 
                <Button variant="success" className='mr-2 mb-2'>
                  <FormattedMessage id='funfiction-my'/></Button>
              </Link>
              <Link to={`/profile`}> 
                <Button variant="success"  className='mr-2 mb-2'>
                  <FormattedMessage id='profile'/></Button>
              </Link>
            </>
          }
          <Card className='card_fix'>
            <Card.Body>
            <FormattedMessage id='aside-filter-rating'/>
              <div className='d-flex mt-2 justify-content-between'>
                <Button 
                  variant="primary" 
                  className='btn-filter-raiting'
                  onClick={()=> (dispatch(filterRatingMin()))}>
                  <FormattedMessage id='aside-filter-rating-max'/>
                </Button>
                <Button 
                  variant="primary" 
                  className='btn-filter-raiting'
                  onClick={()=> (dispatch(filterRatingMax()))}>
                  <FormattedMessage id='aside-filter-rating-min'/>
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
                      onClick={()=> (dispatch(filterMainResetFanfictions()))}> 
                      <FormattedMessage id='aside-reset'/>
                  </Button>
                </li>
                  {genres && genres.map((genre) => (
                    <li key={genre.id} className='d-flex mt-2'>
                      <Button 
                        variant="primary" 
                        className='btn-filter-genre w-100'
                        onClick={()=> (dispatch(filterMainGenreFanfictions(genre.name)))}
                        >{genre.name}
                      </Button>
                    </li>
                  ))}
              </ul>
            </Card.Body>
          </Card>
          <Card className='card_fix'>
            <Card.Body>
              <FormattedMessage id='aside-cloud-tags'/>
              <ul className='tags-list d-flex flex-wrap'>
                <li className='d-flex mt-2 tags-list__item mr-2'>
                  <Button 
                      variant="info" 
                      className='btn-cloudtags'
                      onClick={()=> (dispatch(filterMainResetFanfictions()))}
                    ><FormattedMessage id='aside-reset'/>
                  </Button>
                </li>
                {tags && tags.map((tag) => (
                  <li key={tag.id} className='d-flex mt-2 tags-list__item mr-2'>
                    <Button 
                      variant="info" 
                      className='btn-cloudtags'
                      onClick={()=> (dispatch(filterMainTagFanfictions(tag.name)))}
                    >{tag.name}</Button>
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