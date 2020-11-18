import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import '../styles/styles.css';
import { Tags } from '../components/Tags';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/Loader';
import {  useHistory } from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

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
  fetchAddFanfictionRequest,
  getAddFanfiction
} from '../modules/fanfictions';

import {
  loginUser,
} from '../modules/users';

export const AddFun = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { baseTags, genres, loadTags, loadGenres, added, token } = useSelector(state => ({
    genres: getGenres(state),
    token: loginUser(state),
    baseTags: getTags(state),
    loadTags: getTagsLoading(state),
    loadGenres: getGenresLoading(state),
    added: getAddFanfiction(state),
  }));
  const [form, setForm] = useState({
    title: '',
    description: '',
    genre: 1,
    tags: [],
  })

  useEffect(() => {
    dispatch(fetchTagsRequest())
    dispatch(fetchGenresRequest())
  }, []);

  useEffect(() => {
    if (added) {
      history.push(`/view/${added.id}`);
    }
  }, [added]);

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      userId: token.user.id
    }))
  }, [token]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const newTags = (tags) => {
    setForm(prev => ({
      ...prev,
      tags: tags
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(fetchAddFanfictionRequest({form, token}))
  }

  if (loadTags || loadGenres) {
    return (
      <Loader />
    )
  }

  return (
    <Row className='justify-content-md-center'>
      <Col xs lg='6' className='mt-5'>
        <Jumbotron>
          <h2 className='display-4 list-fanfic__title mb-4'><FormattedMessage id='funfiction-new-add'/></h2>
          <Form
            onSubmit={(e) => submitHandler(e)}>
            <Form.Group>
              <Form.Label><FormattedMessage id='funfiction-title'/></Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={form.title}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label><FormattedMessage id='funfiction-description'/></Form.Label>
              <Form.Control
                as="textarea"
                required
                name='description'
                maxLength="250"
                value={form.description}
                onChange={changeHandler}
                rows={3}
                className='description'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label><FormattedMessage id='funfiction-genre'/></Form.Label>
              <Form.Control
                as="select"
                value={form.genre}
                name='genre'
                onChange={changeHandler}>
                {genres && genres.map((genre) => {
                  return <option
                    key={genre.id}
                    value={genre.id}>{genre.name}</option>
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label><FormattedMessage id='funfiction-tags'/></Form.Label>
              {baseTags && <Tags
                tagsInBase={baseTags}
                newTags={newTags}
              />}
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-5'>
            <FormattedMessage id='funfiction-add'/>
          </Button>
          </Form>
        </Jumbotron>
      </Col>
    </Row>
  )
}