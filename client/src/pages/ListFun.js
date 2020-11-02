import React, { useEffect, useState, useMemo,useCallback,  } from 'react';
import { useHttp } from '../hooks/http.hook'
import { useParams, useHistory, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

export const ListFun = () => {
    const { request, loading } = useHttp()
    const [form, setForm] = useState([])

    const getFun = useCallback(async () => {
        try {
            const fetched = await request(`/api/fanfictions/view`, 'GET', null)
            setForm(fetched)
        } catch (e) { }
    }, [setForm, request])

    useEffect(() => {
        getFun()
      }, [getFun])

      const deleteNewsHandler = (e, id) => {
        e.preventDefault()
        fetchDelNews(id)
      }

      const fetchDelNews = useCallback(async (id) => {
        try {
          await request('/api/fanfictions/delete', 'DELETE', { id })
        } catch (e) { }
      }, [request])

    return (
        <div>
        {!loading && form &&
            <div className="col s12">
                {form.map((item, i) => {
                    return (
                    <div key={i}>
                        <h3>{item.title}</h3>
                        <h5>{item.description}</h5>
                        <Link
                            to={`/edit/${item.id}`}
                        >Edit</Link>

                        <Link
                            to={`/view/${item.id}`}
                        >Open</Link>
                        <Button variant="primary" type="submit" className='mt-7'>
                            <Link to="#" onClick={(e) => deleteNewsHandler(e, item.id)}>X</Link>
                        </Button>
                        <hr />
                    </div>
                    )
                })}
            </div>
        }
        </div>
    );
}