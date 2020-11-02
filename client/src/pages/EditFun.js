import React, { useEffect, useState, useMemo, useCallback, } from 'react';
import { useHttp } from '../hooks/http.hook'
import { useParams, useHistory, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Tags } from '../components/Tags'

export const EditFun = () => {
  const { request, loading } = useHttp()
  const linkId = useParams().id
  const history = useHistory();
  const [AllTags, setAllTags] = useState([]);
  const [genres, setGenres] = useState([])
  const [baseTags, setBaseTags] = useState([])
  const [form, setForm] = useState({
     title: '', description: '', genre: '', tags: [], allTags: []
  })
  // const [form, setForm] = useState({})

  const getFun = useCallback(async () => {
    try {
      const fetched = await request(`/api/fanfictions/edit/${linkId}`, 'GET', null)
      setForm(fetched)
      setBaseTags(fetched.allTags)
    } catch (e) { }
  }, [setForm, request])

  const getGanres = useCallback(async () => {
    try {
      const data = await request('/api/genres', 'GET', null)
      setGenres(data)
    } catch (e) { }
  }, [request])

  useEffect(() => {
    getFun()
    getGanres()
  }, [getFun, getGanres])

  const newTags = (tags) => {
    setForm( prev => ({
      ...prev,
      tags: tags
    }))
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
      try {
        form.id =  linkId
        const data = await request('/api/fanfictions/change', 'POST', form)
      } catch (e) { }
  }

  if (loading) {
    return ('NI')
  } 

  return (
    
    <div>
      {linkId}
      {form && 
      <Row className='justify-content-md-center'>
        <Col xs lg='6' className='mt-7'>
          <Form
            onSubmit={(e) => submitHandler(e)}
          >
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                placeholder="Enter title"
                value={form.title}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                required
                name='description'
                value={form.description}
                placeholder='Description'
                onChange={changeHandler}
                rows={3}
                className='description'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Janre</Form.Label>
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
              <Form.Label>Tags</Form.Label>
              {baseTags && <Tags
                tagsInBase={baseTags}
                newTags={newTags}
                currentTags={form.tags}
              />}
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-7'>
              Submit
          </Button>
          </Form>
        </Col>
      </Row>
    }
    </div>
  );
}