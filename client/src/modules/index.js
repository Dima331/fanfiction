import { combineReducers } from 'redux';
import fanfictions from './fanfictions';
import chapters from './chapters';
import users from './users';
import genres from './genres';
import tags from './tags';

export default combineReducers({
  fanfictions,
  chapters,
  genres,
  users,
  tags,
});
