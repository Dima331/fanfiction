import React, { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import {FormattedMessage} from 'react-intl'
import socket from '../socket';
import {
	getComments,
	fetchCommentsFanfictionRequest,
} from '../modules/fanfictions';

import {
  loginUser
} from '../modules/users';

export const Comments = () => {
	const [comment, setComment] = useState('')
	const dispatch = useDispatch();
	const linkId = useParams().id;
  const { comments, user } = useSelector(state => ({
    comments: getComments(state),
    user: loginUser(state),
  }));

	useEffect(() => {
    dispatch(fetchCommentsFanfictionRequest(linkId))
    socket.emit('ROOM:JOIN', linkId);
	}, [linkId])

	const submitComment = (e) => {
    e.preventDefault()
    socket.emit('ROOM:ADD', { fanfictionId: linkId, comment, user: user.user});
    setComment('');
  }
  
	const commentHandler = (e) => {
    setComment(e.target.value);
	}

  return (
    <>
        <Row className='mt-5 mb-5'>
            <Col xs="12">
							<ul>
                {comments && comments.length == 0 &&  <p><FormattedMessage id='comment-no'/></p>}
                  {comments && comments.map((item,i )=>{
                    return (
                      <li key={i}>
                        <Alert variant="success">
                          <Alert.Heading>{item.user.name}</Alert.Heading>
                            <hr />
                            <p className="mb-0">{item.comment}</p>
                            </Alert>
                      </li>)
                  })}
							</ul>
            </Col>
						<Col xs="12">
						{user &&
            <Form 
            onSubmit={submitComment}
            className="comment"
            >
                 <hr />
              <Form.Group controlId='formBasicLogin'>
                <Form.Label><FormattedMessage id='comment'/></Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='comment'
                  value={comment}
                  onChange={commentHandler}
                />
              </Form.Group>
           
              <Button
                type="submit"
                variant='primary'>
              <FormattedMessage id='comment-send'/></Button>
            </Form>
            }
					</Col>
        </Row> 
    </>
  )
}