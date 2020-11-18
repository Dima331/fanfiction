import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DragZone } from '../components/DragZone'
import { Editor } from '../components/Editor'
import { useLocation } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import '../styles/styles.css';
import {
  fetchAddChapterRequest,
  getAddChapter
} from '../modules/chapters';

export const AddСhapter = () => {
  const location = useLocation();
  const history = useHistory();
  const [statusLoad, setStatusLoad] = useState(false);
  const [form, setForm] = useState({
    title: '',
    text: '',
    image: '',
    funId: '',
  })
  const dispatch = useDispatch();
  const { added } = useSelector(state => ({
    added: getAddChapter(state)
  }));

  useEffect(() => {
    console.log(added)
    if (added) {
      history.push(`/view/${location.funId}`);
    }
  }, [added]);


  useEffect(() => {
    const funId = location.funId;
    if (funId) {
      setForm(prev => ({
        ...prev,
        funId: funId,
      }))
    }
  }, [location]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(fetchAddChapterRequest(form))
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

  return (
    <Row className='justify-content-md-center'>
      <Col xs lg='6' className='mt-5'>
        <Jumbotron>
          <h2 className='display-4 list-fanfic__title mb-4'><FormattedMessage id='chapter-new-add' /></h2>
          <Form
            onSubmit={(e) => submitHandler(e)}>
            <Form.Group>
              <Form.Label><FormattedMessage id='chapter-title' /></Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={form.title}
                onChange={changeHandler}
              />
            </Form.Group>
            <hr />
            <Form.Group>
              <Form.Label><FormattedMessage id='chapter-text' /></Form.Label>
              <Editor
                textHandler={textHandler}
                setStatusLoad={setStatusLoad}
              />
            </Form.Group>
            <hr />
            <Form.Group>
              <Form.Label><FormattedMessage id='chapter-image' /></Form.Label>
              <DragZone
                imageHandler={imageHandler}
                setStatusLoad={setStatusLoad}
              />
            </Form.Group>
            <hr />
            <Button
              variant="primary"
              type="submit"
              disabled={statusLoad}
              className='mt-5'>
              <FormattedMessage id='chapter-add' />
            </Button>
          </Form>
        </Jumbotron>
      </Col>
    </Row>
  )
}