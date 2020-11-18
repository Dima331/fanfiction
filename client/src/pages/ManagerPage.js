import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/styles.css';
import { TableUsers } from '../components/TableUsers';
import {
  fetchUsersRequest,
  getUsers
} from '../modules/users';

export const ManagerPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => ({
    users: getUsers(state),

  }));

  useEffect(() => {
    dispatch(fetchUsersRequest())
  }, []);

  return (
    <>
      {users &&
        <TableUsers
          users={users}
        />
      }
    </>
  )
}