import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ArchiveFill } from 'react-bootstrap-icons';
import { ShieldFillX } from 'react-bootstrap-icons';
import { ShieldFillCheck } from 'react-bootstrap-icons';
import { FilePerson } from 'react-bootstrap-icons';
import { FilePersonFill } from 'react-bootstrap-icons';
import { FileText } from 'react-bootstrap-icons';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import {
    fetchDeleteUserRequest,
    fetchBlockUserRequest,
    fetchAdminUserRequest,
    fetchChangeUserRequest
  } from '../modules/users';
  

export const ToolBar = ({userId, status, role}) => {
    const dispatch = useDispatch();

    return (
        <Row className="justify-content-md-center">
            <Col className="d-flex">
            <Button
                variant="light"
                onClick={()=> dispatch(fetchAdminUserRequest(userId))}
                style={{ marginRight: '10px'}}
                className='btn-toolbar'
                >{!!+role 
                    ? <FilePersonFill color="teal" size={20} /> 
                    : <FilePerson color="teal" size={20}/>}
                </Button>
                  <Button
                    variant="primary"
                    style={{ marginRight: '10px'}}
                    onClick={()=> dispatch(fetchBlockUserRequest(userId))}
                    className='btn-toolbar'
                >{!!+status 
                    ? <ShieldFillCheck color="yellow" size={20} /> 
                    : <ShieldFillX color="yellow" size={20}/>}
                </Button>
                <Button
                    variant="primary"
                    onClick={()=> dispatch(fetchDeleteUserRequest(userId))}
                    style={{ marginRight: '10px'}}
                    className='btn-toolbar'>
                <ArchiveFill color="#fff" size={20}/></Button>   
            <Link to={`/user/${userId}`}> 
                <Button
                    variant="primary"
                    style={{ marginRight: '10px'}}
                    className='btn-toolbar'
                ><FileText color="#fff" size={20}/></Button>
            </Link>
                <Button
                    variant="primary"
                    style={{ marginRight: '0px'}}
                    className='btn-toolbar'
                    onClick={()=> dispatch(fetchChangeUserRequest(userId))}>
                <ArrowRightSquareFill   color="#fff" size={20}/></Button>
            </Col>
        </Row>
    )
}