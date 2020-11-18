import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { ToolBar } from './ToolBar';
import {useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import {FormattedMessage} from 'react-intl'
import {
  getTableErrorUser
} from '../modules/users';



export const TableUsers = ({ users, pick }) => {
  const { error } = useSelector(state => ({
    error: getTableErrorUser(state),
  }));

  return (
    <Row className="justify-content-md-center">
      <Col xs="12" className="mt-5" style={{overflowX: 'scroll'}}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th><FormattedMessage id='admin-functions' /></th>
              <th><FormattedMessage id='admin-id' /></th>
              <th><FormattedMessage id='auth-login' /></th>
              <th><FormattedMessage id='auth-email' /></th>
              <th><FormattedMessage id='auth-name' /></th>
              <th><FormattedMessage id='admin-date' /></th>
              <th><FormattedMessage id='admin-staus' /></th>
              <th><FormattedMessage id='admin-verified' /></th>
              <th><FormattedMessage id='admin-role' /></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, i) => {
              return (
                <tr key={user.id}>
                  <td>
                    <ToolBar 
                      userId={user.id}
                      status={user.status}
                      role={user.role}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.createdAt}</td>
                  <td>{!!+user.status ? 'block' : 'not block'}</td>
                  <td>{!!+user.isVerified ? 'not verified' : 'verified'}</td>
                  <td>{!!+user.role ? 'admin' : 'user'}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {error && 
          <Alert variant='danger'>
            <p>{error.message}</p>
            {error.errors && error.errors.map((err, i) => {
              return (
              <p key={i}>{err.msg}</p>
              )
            })}
          </Alert>
        }
      </Col>
    </Row>
  )
}