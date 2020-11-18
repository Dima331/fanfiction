import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Loader } from '../components/Loader'
import {useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { EmojiNeutral } from 'react-bootstrap-icons';
import { EmojiSmile } from 'react-bootstrap-icons';
import ReactMarkdown from 'react-markdown'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import {
  getChapter,
  getChapterLoading,
  fetchChapterRequest,
  getChapterNav,
  getChapterNavLoading,
  fetchChapterNavRequest,
  fetchLikeChapterRequest
} from '../modules/chapters';

import {
  loginUser,
} from '../modules/users';

export const СhapterPage = () => {
  const chapterId = useParams().idChapter;
  const linkId = useParams().id;
  const history = useHistory();
  const [like, setLike] = useState(false)
  const dispatch = useDispatch();
  const { chapter, chapterLoading, nav, chapterNavLoading, token } = useSelector(state => ({
    chapter: getChapter(state),
    chapterLoading: getChapterLoading(state),
    nav: getChapterNav(state),
    chapterNavLoading: getChapterNavLoading(state),
    token: loginUser(state),
  }));
  
  useEffect(() => {
    dispatch(fetchChapterRequest({ id: linkId, chapterId: chapterId }))
    dispatch(fetchChapterNavRequest({ id: linkId, chapterId: chapterId }))
  }, [])

 useEffect(() => {
    if(chapter && token){
      if(chapter.likes){
        for(let val of chapter.likes){
          if(val.userId == token.user.id){
            if(val.value){
              setLike(val.value)
            }else  {
              setLike(val.value)
            }
          }
        }
      }
    }
  }, [chapter, token])

  const changePageHandler = (e, page) => {
    history.push(`/view/${linkId}/${page}/`);
    window.location.reload();
  }

  const likesHandler = (chapter) => {
    console.log(chapter, token.user.id)
    setLike(prev=> !prev)
    dispatch(fetchLikeChapterRequest({chapterId: chapter, userId: token.user.id}))
  }

  if (chapterLoading || chapterNavLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      {chapter && nav &&
        <>
          <Row className='mt-5 mb-5'>
            <Col xs lg="12">
              <ul className="list-fanfic">
                <li className=' rounded-lg  list-fanfic__item' >
                  <Jumbotron>
                    <h2 className='display-4 list-fanfic__title mb-4'>{chapter.title}</h2>
                    {chapter.image && 
                      <Image
                        src={chapter.image}
                        className='mb-4'
                        thumbnail />
                    }
                    <div className="like-container">
                     {!token && <div className="star-blok"></div>}
                      <Button 
                        variant="success" 
                        className='mb-5 d-flex justify-content-around align-items-center'
                        onClick={() => likesHandler(chapter.id)}>
                        <span>{chapter.overall_likes}</span>
                        <span className='d-flex justify-content-around align-items-center'>{like ? <EmojiSmile /> : <EmojiNeutral />}</span>
                      </Button>
                    </div>
                    <div className='markdown'>
                      <Alert variant='light'>
                        <ReactMarkdown
                          children={chapter.text} />
                      </Alert>
                    </div>
                  </Jumbotron>
                </li>
              </ul>
            </Col>
          </Row>
          <div className='mb-5 w-xs-100 d-flex justify-content-between'>
            {!chapterNavLoading && nav.prev &&
              <Button variant="success" onClick={(e) => changePageHandler(e, nav.prev.id)}><FormattedMessage id='chapter-previous'/></Button>
            }
            <div></div>
            {!chapterNavLoading && nav.next &&
              <Button variant="success" onClick={(e) => changePageHandler(e, nav.next.id)}><FormattedMessage id='chapter-next'/></Button>
            }
          </div>
        </>
      }
    </>
  )
}