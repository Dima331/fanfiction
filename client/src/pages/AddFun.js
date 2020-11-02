import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/styles.css';
import { ImgChapter } from './ImgChapter'
import { Tags } from '../components/Tags'
import ReactMarkdown from 'react-markdown'
import { useDropzone } from 'react-dropzone';
import { Editor } from '../components/Editor'
import { useHttp } from '../hooks/http.hook'


export const AddFun = () => {
  const [AllTags, setAllTags] = useState([]);
  const { request, loading } = useHttp()
  const [genres, setGenres] = useState([])
  const [baseTags, setBaseTags] = useState([])

  const getGanres = useCallback(async () => {
    try {
      const data = await request('api/genres', 'GET', null)
      setGenres(data)
    } catch (e) { }
  }, [request])

  const getTags = useCallback(async () => {
    try {
      const data = await request('api/tags', 'GET', null)
      setBaseTags(data)
    } catch (e) { }
  }, [request])

  useEffect(() => {
    getGanres()
    getTags()
  }, [getGanres, getTags])

  const [form, setForm] = useState({
    title: '',
    description: '',
    genre: 1,
    tags: []
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  
  const newTags = (tags) => {
    setForm( prev => ({
      ...prev,
      tags: tags
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
      try {
        const data = await request('api/fanfictions/add', 'POST', form)
      } catch (e) { }
  }

  return (
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
                    value={genre.id}>{genre.name}</option>
                })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            {baseTags && <Tags
              tagsInBase={baseTags}
              newTags={newTags}
            />}
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Title chapter</Form.Label>
            <Form.Control
              required
              type="text"
              name="chapter"
              placeholder="Enter title chapter"
              value={form.chapter}
              onChange={changeHandler}
            />
          </Form.Group> */}
          {/* <Form.Group>
            <Editor/>
          </Form.Group> */}
          {/* <Form.Group>
            <Form.Label>Image chapter</Form.Label>
            <ImgChapter />
          </Form.Group> */}
          <Button variant="primary" type="submit" className='mt-7'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  )
}