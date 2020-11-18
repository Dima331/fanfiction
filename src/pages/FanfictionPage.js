import React, { useEffect, useState } from 'react'
import { ListChapters } from '../components/ListChapters'
import { Comments } from '../components/Comments'
import { Loader } from '../components/Loader'
import { useParams, useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import socket from '../socket';

import {
  getChapters,
  getChaptersLoading,
  fetchChaptersRequest,
  deleteChapterOrder,
  deleteFetchChapterRequest,
  sortFetchChapterRequest,
  sortChapterOrder
} from '../modules/chapters';

import {
  getFanfiction,
  getFanfictionLoading,
  fetchFanfictionRequest,
  getFanfictionError,
  addCommentsFanfiction,
  getAddChapter,
  fetchChangeFanfictionSuccess
} from '../modules/fanfictions';

import {
  loginUser,
} from '../modules/users';


export const FanfictionPage = () => {
  const [rights, setRights] = useState(false);
  const history = useHistory();
  const linkId = useParams().id;
  const dispatch = useDispatch();
  const { chapters, chaptersLoading, fanfiction, fanfictionLoading, error, token } = useSelector(state => ({
    chapters: getChapters(state),
    chaptersLoading: getChaptersLoading(state),
    fanfiction: getFanfiction(state),
    error: getFanfictionError(state),
    fanfictionLoading: getFanfictionLoading(state),
    token: loginUser(state),
    // change: getChangeFanfiction(state),
  }));

  useEffect(() => {
    socket.on('ROOM:GET_COMMENT', stateHandler);
  }, [])

  const stateHandler = (room) => {
    console.log(room)
    let user = {}
    user.name = room.user.name
    dispatch(addCommentsFanfiction({ comment: room.comment, user }))
  }

  useEffect(() => {
    dispatch(fetchChaptersRequest(linkId))
    dispatch(fetchFanfictionRequest(linkId))
    dispatch(fetchChangeFanfictionSuccess(false))
  }, [])

  useEffect(() => {
    if (token && fanfiction && !fanfictionLoading) {
      if (token.user.id == fanfiction.userId) {
        setRights(true)
      }
      if (token.user.role == '1') {
        setRights(true)
      }
    } else {
      setRights(false)
    }
  }, [token, fanfiction])
  
  useEffect(() => {
    if (error) {
      history.push(`/`);
    }
  }, [error])

  const deleteHandler = async (e, chapter) => {
    let arrCahpters = [...chapters];

    arrCahpters.splice(chapter.order - 1, 1)
    arrCahpters.forEach((element, i) => {
      element.order = i + 1
    });

    dispatch(deleteFetchChapterRequest({ chapter: chapter, chapters: arrCahpters }))
    dispatch(deleteChapterOrder({ chapters: arrCahpters }))

  }

  const changeOrderHandler = async (e, i, option) => {
    let arrCahpters = [...chapters]

    if (option == 'up') {
      arrCahpters[i].order -= 1
      arrCahpters[i - 1].order += 1
    }
    if (option == 'down') {
      arrCahpters[i].order += 1
      arrCahpters[i + 1].order -= 1
    }

    arrCahpters.sort((a, b) => a.order > b.order ? 1 : -1);
    dispatch(sortFetchChapterRequest(arrCahpters))
    dispatch(sortChapterOrder(arrCahpters))
  }


  if (fanfictionLoading || chaptersLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Row className='mt-5 mb-5'>
        <Col xs lg="12">
          {fanfiction &&
            <ul className="list-fanfic">
              <li className=' rounded-lg  list-fanfic__item' >
                <Jumbotron>
                  <h2 className='display-4 list-fanfic__title mb-4'>{fanfiction.title}</h2>
                  <Alert variant='light'>
                    <p className='list-fanfic__des'>{fanfiction.description}</p>
                  </Alert>
                  <p className='list-fanfic__genre mb-2'><FormattedMessage id='funfiction-genre' />: {fanfiction.genre}</p>
                  <div className='list-fanfic__rating mb-4 '>
                    <p className='list-fanfic__rating '><FormattedMessage id='funfiction-contents' />: </p>
                    <ListChapters
                      chapters={chapters}
                      deleteHandler={deleteHandler}
                      changeOrderHandler={changeOrderHandler}
                      rights={rights}
                    />
                  </div>
                  <Row>
                    <Col xs lg="6">
                      <ul className='tags-list  d-flex flex-wrap'>
                        {fanfiction.tags && fanfiction.tags.map(tag => {
                          return <li key={tag.id} className="tags-list__item mr-2 mb-2"><Badge variant="info">{tag.name}</Badge></li>
                        })}
                      </ul></Col>
                    <Col xs lg="2" className='d-flex justify-content-md-end'><FormattedMessage id='funfiction-author' />: {fanfiction.user}</Col>
                    <Col xs lg="4" className='d-flex justify-content-md-end'><FormattedMessage id='funfiction-date' />: {fanfiction.dateString}</Col>
                  </Row>
                </Jumbotron>
              </li>
            </ul>
          }
        </Col>
      </Row>
      <Comments />
    </>
  )
}