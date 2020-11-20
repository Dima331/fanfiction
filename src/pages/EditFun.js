import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Tags } from '../components/Tags'
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Loader } from '../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import {
  getGenres,
  getGenresLoading,
  fetchGenresRequest
} from '../modules/genres';

import {
  getTags,
  getTagsLoading,
  fetchTagsRequest,
} from '../modules/tags';

import {
  fetchEditFanfictionRequest,
  fetchChangeFanfictionRequest,
  getEditFanfictionLoading,
  getEditFanfiction,
  getEditFanfictionError,
  getChangeFanfiction,
  fetchFanfictionRequest
} from '../modules/fanfictions';

import {
  loginUser,
} from '../modules/users';

export const EditFun = () => {
  const history = useHistory();
  const [form, setForm] = useState([]);
  const linkId = useParams().id;
  const dispatch = useDispatch();
  const { baseTags, change, genres, loadTags, loadGenres, fanfiction, fanfictionLoading, token, error } = useSelector(state => ({
    genres: getGenres(state),
    token: loginUser(state),
    baseTags: getTags(state),
    loadTags: getTagsLoading(state),
    loadGenres: getGenresLoading(state),
    fanfiction: getEditFanfiction(state),
    fanfictionLoading: getEditFanfictionLoading(state),
    error: getEditFanfictionError(state),
    change: getChangeFanfiction(state)
  }));

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    // console.log(change , form)
    if(change){
      dispatch(fetchFanfictionRequest(linkId))
      history.push(`/view/${linkId}`);
    }
  }, [change]);

  useEffect(() => {
    if(error){
      history.push(`/`);
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchTagsRequest())
    dispatch(fetchGenresRequest())
    dispatch(fetchEditFanfictionRequest({token, linkId}))
  }, []);

  useEffect(() => {
    console.log(fanfiction)
    setForm(fanfiction)
    setForm(prev => ({
      ...prev,
      id: linkId
    }))
  }, [fanfiction]);

  const newTags = (tags) => {
    setForm(prev => ({
      ...prev,
      tags: tags
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(fetchChangeFanfictionRequest(form))
  }

  if (loadTags || loadGenres || fanfictionLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      {fanfiction &&
        <Row className='justify-content-md-center'>
          <Col xs lg='6' className='mt-5'>
            <Jumbotron>
              <h2 className='display-4 list-fanfic__title mb-4'><FormattedMessage id='funfiction-edit-title'/></h2>
              <Form
                onSubmit={(e) => submitHandler(e)}>
                <Form.Group>
                  <Form.Label><FormattedMessage id='funfiction-title'/></Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    value={form.title || ""}
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label><FormattedMessage id='funfiction-description'/></Form.Label>
                  <Form.Control
                    as="textarea"
                    required
                    name='description'
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
                        value={genre.id}
                      >{genre.name}</option>
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label><FormattedMessage id='funfiction-tags'/></Form.Label>
                  {baseTags && <Tags
                    tagsInBase={baseTags}
                    newTags={newTags}
                    currentTags={form.tags}
                  />}
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-5'>
                <FormattedMessage id='edit'/>
                </Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      }
    </div>
  );
}