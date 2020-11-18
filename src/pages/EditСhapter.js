import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DragZone } from '../components/DragZone'
import { Editor } from '../components/Editor'
import { useSelector, useDispatch } from 'react-redux';
import '../styles/styles.css';
import {FormattedMessage} from 'react-intl'
import { Loader } from '../components/Loader';

import {
  getEditChapter,
  getEditChapterLoading,
  editFetchChapterRequest,
  changeFetchChapterRequest
} from '../modules/chapters';

export const EditСhapter = () => {
  const [form, setForm] = useState({})
  const linkId = useParams().id;
  const history = useHistory();
  const [statusLoad, setStatusLoad] = useState(false);
  const dispatch = useDispatch();
  const { chapter, chapterLoading } = useSelector(state => ({
    chapter: getEditChapter(state),
    chapterLoading: getEditChapterLoading(state),
  }));

  useEffect(() => {
    dispatch(editFetchChapterRequest(linkId))
  }, [])

  useEffect(() => {
    setForm(chapter)
  }, [chapter]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(changeFetchChapterRequest(form))
    history.push(`/`);
  }

  const textHandler = (text) => {
    text = text.replace('↵', '\n');
    setForm(prev => ({
      ...prev,
      text: text
    }))
  }

  const imageHandler = (url) => {
    setForm(prev => ({
      ...prev,
      image: url
    }))
  }

  if (chapterLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      {chapter &&
        <Row className='justify-content-md-center'>
          <Col xs lg='6' className='mt-5'>
            <Jumbotron>
              <h2 className='display-4 list-fanfic__title mb-4'><FormattedMessage id='chapter-title'/></h2>
              <Form
                onSubmit={(e) => submitHandler(e)}
              >
                <Form.Group>
                  <Form.Label><FormattedMessage id='chapter-title'/></Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    placeholder="Enter title chapter"
                    value={form.title || ""}
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label><FormattedMessage id='chapter-text'/></Form.Label>
                  {<Editor
                    textHandler={textHandler}
                    editText={form.text}
                    setStatusLoad={setStatusLoad}
                  />}
                </Form.Group>
                <Form.Group>
                  <Form.Label><FormattedMessage id='chapter-image'/></Form.Label>
                  <DragZone
                    imageHandler={imageHandler}
                    editImage={form.image}
                    setStatusLoad={setStatusLoad}
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className='mt-5'
                  disabled={statusLoad}
                >
                <FormattedMessage id='edit'/>
                </Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      }
    </>
  )
}