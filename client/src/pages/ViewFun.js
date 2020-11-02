import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'

export const ViewFun = () => {
  const { request, loading } = useHttp()
  const linkId = useParams().id
  const [form, setForm] = useState({
    title: '', description: '', document: '', found: '', section: '', html: '', tags: []
  })

  const getNews = useCallback(async () => {
    try {
      const fetched = await request(`/api/fanfictions/view/${linkId}`, 'GET', null)
      setForm({
        title: fetched.title,
        description: fetched.description,
        genre: fetched.genre,
        tags: fetched.tags,
      })
    } catch (e) { }
  }, [linkId, request])


  useEffect(() => {
    getNews()
  }, [getNews])


  if (loading) {
    return ('NI')
  }
  return (
    <>
      {!loading &&
        <div>
          <h1>{form.title}</h1>
          <h2>{form.description}</h2>
          <h2>{form.genre}</h2>
          {form.tags && form.tags.map((item) => {
            return <h4 key={item.id}>{item.name}</h4>
          })}
        </div>
      }
    </>
  )
}