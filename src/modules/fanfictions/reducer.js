import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchFanfictionsRequest,
  fetchFanfictionsSuccess,
  fetchFanfictionsFailure,
} from './actions';

import {
  fetchFanfictionRequest,
  fetchFanfictionSuccess,
  fetchFanfictionFailure,
} from './actions';

import {
  fetchAddFanfictionRequest,
  fetchAddFanfictionSuccess,
  fetchAddFanfictionFailure,
} from './actions';

import {
  fetchEditFanfictionRequest,
  fetchEditFanfictionSuccess,
  fetchEditFanfictionFailure,
} from './actions';

import {
  fetchDeleteFanfictionRequest,
  fetchDeleteFanfictionSuccess,
  fetchDeleteFanfictionFailure,
} from './actions';

import {
  filterGenreFanfictions,
  filterMainTagFanfictions,
  filterMainResetFanfictions,
  filterMainGenreFanfictions,
  filterResetFanfictions,
  filterTimeLaterFanfictions,
  filterTimeEarlyFanfictions
} from './actions';

import {
  fetchUserFanfictionsRequest,
  fetchUserFanfictionsSuccess,
  fetchUserFanfictionsFailure,
} from './actions';

import {
  fetchChangeFanfictionRequest,
  fetchChangeFanfictionSuccess,
  fetchChangeFanfictionFailure,
} from './actions';

import {
  fetchRatingRequest,
  fetchRatingSuccess,
  fetchRatingFailure,
  changeRating
} from './actions';

import {
  fetchCommentsFanfictionRequest,
  fetchCommentsFanfictionSuccess,
  fetchCommentsFanfictionFailure,
  addCommentsFanfiction
} from './actions';

import {
  filterRatingMax,
  filterRatingMin,
} from './actions';


const comments = handleActions({
  [fetchCommentsFanfictionRequest]: () => [],
  [fetchCommentsFanfictionSuccess]: (_state, action) => action.payload,
  [addCommentsFanfiction]: (_state, action) => {
    return [..._state, action.payload]
  }
}, []);

const commentsLoading = handleActions({
  [fetchCommentsFanfictionRequest]: () => true,
  [fetchCommentsFanfictionSuccess]: () => false,
  [fetchCommentsFanfictionFailure]: () => false,
}, false);

const commentsError = handleActions({
  [fetchCommentsFanfictionRequest]: () => null,
  [fetchCommentsFanfictionFailure]: (_state, action) => action.payload,
}, null);

const fanfictions = handleActions({
  [fetchFanfictionsRequest]: () => [],
  [fetchFanfictionsSuccess]: (_state, action) => {
    for (let val of action.payload) {
      val.hide = false;
    }

    return action.payload
  },
  [fetchDeleteFanfictionSuccess]: (_state, action) => 
  {
    return _state.filter((item)=> {
      if(item.id == action.payload.id){
        return false
      }
      return true
    })
  },
  [filterMainGenreFanfictions]: (_state, action) => {
    let arrCahpters = [..._state];

    arrCahpters = arrCahpters.map((element, i) => {
      if (element.genre !== action.payload) {
        element.hide = true
      } else {
        element.hide = false
      }
      return element
    });

    return arrCahpters
  },
  [filterMainTagFanfictions]: (_state, action) => {
    console.log(action.payload)
    let arrCahpters = [..._state];

    arrCahpters = arrCahpters.map((element, i) => {
      if(element.tags.length == 0 ){
        element.hide = true
        return element
      }
      for (let val of element.tags) {
        if (val.name !== action.payload) {
          element.hide = true

        } else {
          element.hide = false
          return element
        }
      }
   
      return element
    });

    return arrCahpters
  },
  [fetchRatingSuccess]: (_state, action) => {
    _state = _state.map((item)=> {
      if(action.payload.id == item.id) {
        item.rating = action.payload.overall_rating
      }
      return item
    })
    return _state
  },
  [filterRatingMax]: (_state, action) => {
    let arr = [..._state];
    return arr.sort((a, b) => a.rating < b.rating ? 1 : -1);
  },
  [filterRatingMin]: (_state, action) => {
    let arr = [..._state];
    console.log(arr)
    return arr.sort((a, b) => a.rating > b.rating ? 1 : -1);
  },
  [filterMainResetFanfictions]: (_state, action) => {
    let arrCahpters = [..._state];
    arrCahpters = arrCahpters.map((element, i) => {
      element.hide = false
      
      return element
    });
    
    return arrCahpters
  },
  [changeRating]: (_state, action) => {
    _state = _state.map((item)=> {
      if(action.payload.idFan == item.id) {
        item.rating = action.payload.mark
      }
      return item
    })
    return _state
  }
}, []);

const fanfictionsLoading = handleActions({
  [fetchFanfictionsRequest]: () => true,
  [fetchFanfictionsSuccess]: () => false,
  [fetchFanfictionsFailure]: () => false,
}, false);

const fanfictionsError = handleActions({
  [fetchFanfictionsRequest]: () => null,
  [fetchFanfictionsFailure]: (_state, action) => action.payload,
}, null);

const fanfiction = handleActions({
  [fetchFanfictionRequest]: () => [],
  [fetchFanfictionSuccess]: (_state, action) => action.payload,
}, []);

const fanfictionLoading = handleActions({
  [fetchFanfictionRequest]: () => true,
  [fetchFanfictionSuccess]: () => false,
  [fetchFanfictionFailure]: () => false,
}, false);

const fanfictionError = handleActions({
  [fetchFanfictionRequest]: () => null,
  [fetchFanfictionFailure]: (_state, action) => action.payload,
}, null);

const addFanfiction = handleActions({
  [fetchAddFanfictionRequest]: () => [],
  [fetchAddFanfictionSuccess]: (_state, action) => {
    return action.payload
  },
}, null);

const addFanfictionLoading = handleActions({
  [fetchAddFanfictionRequest]: () => true,
  [fetchAddFanfictionSuccess]: () => false,
  [fetchAddFanfictionFailure]: () => false,
}, false);

const addFanfictionError = handleActions({
  [fetchAddFanfictionRequest]: () => null,
  [fetchAddFanfictionFailure]: (_state, action) => action.payload,
}, null);

const editFanfiction = handleActions({
  [fetchEditFanfictionRequest]: () => [],
  [fetchEditFanfictionSuccess]: (_state, action) => action.payload,
}, []);

const editFanfictionLoading = handleActions({
  [fetchEditFanfictionRequest]: () => true,
  [fetchEditFanfictionSuccess]: () => false,
  [fetchEditFanfictionFailure]: () => false,
}, false);

const editFanfictionError = handleActions({
  [fetchEditFanfictionRequest]: () => null,
  [fetchEditFanfictionFailure]: (_state, action) => action.payload,
}, null);

const changeFanfiction = handleActions({
  [fetchChangeFanfictionRequest]: () => [],
  [fetchChangeFanfictionSuccess]: (_state, action) => action.payload,
}, false);

const changeFanfictionLoading = handleActions({
  [fetchChangeFanfictionRequest]: () => true,
  [fetchChangeFanfictionSuccess]: () => false,
  [fetchChangeFanfictionFailure]: () => false,
}, false);

const changeFanfictionError = handleActions({
  [fetchChangeFanfictionRequest]: () => null,
  [fetchChangeFanfictionFailure]: (_state, action) => action.payload,
}, null);


const deleteFanfiction = handleActions({
  [fetchDeleteFanfictionRequest]: () => {
    return []
  },
  [fetchDeleteFanfictionSuccess]: (_state, action) => action.payload,
}, []);

const deleteFanfictionLoading = handleActions({
  [fetchDeleteFanfictionRequest]: () => true,
  [fetchDeleteFanfictionSuccess]: () => false,
  [fetchDeleteFanfictionFailure]: () => false,
}, false);

const deleteFanfictionError = handleActions({
  [fetchDeleteFanfictionRequest]: () => null,
  [fetchDeleteFanfictionFailure]: (_state, action) => action.payload,
}, null);

const addLink = handleActions({
  [fetchAddFanfictionSuccess]: (_state) => {
    return true
  }
}, false);

const userFanfictions = handleActions({
  [fetchUserFanfictionsRequest]: () => [],
  [fetchUserFanfictionsSuccess]: (_state, action) => action.payload,
  [filterTimeLaterFanfictions]: (_state, action) => {
    let arr = [..._state];

    _state = arr.sort((a, b) => a.dateNumber > b.dateNumber ? 1 : -1);

    return _state

  },
  [fetchDeleteFanfictionSuccess]: (_state, action) => 
  {
    if(!_state) {
      return _state
    }

    return _state.filter((item)=> {
      if(item.id == action.payload.id){
        return false
      }
      return true
    })
  },
  [filterTimeEarlyFanfictions]: (_state, action) => {
    let arr = [..._state];
    return arr.sort((a, b) => a.dateNumber < b.dateNumber ? 1 : -1);

  },
  [filterGenreFanfictions]: (_state, action) => {
    let arrCahpters = [..._state];
    arrCahpters = arrCahpters.map((element, i) => {

      if (element.genre !== action.payload) {
        element.hide = true
      } else {
        element.hide = false
      }
      return element
    });

    return arrCahpters
  },
  [filterResetFanfictions]: (_state, action) => {
    let arrCahpters = [..._state];

    arrCahpters = arrCahpters.map((element, i) => {
      element.hide = false

      return element
    });

    return arrCahpters
  },
}, null);

const userFanfictionsLoading = handleActions({
  [fetchUserFanfictionsRequest]: () => true,
  [fetchUserFanfictionsSuccess]: () => false,
  [fetchUserFanfictionsFailure]: () => false,
}, false);

const userFanfictionsError = handleActions({
  [fetchUserFanfictionsRequest]: () => null,
  [fetchUserFanfictionsFailure]: (_state, action) => action.payload,
}, null);


const rating = handleActions({
  [fetchRatingRequest]: () => [],
  [fetchRatingSuccess]: (_state, action) => action.payload,
}, []);

const ratingLoading = handleActions({
  [fetchRatingRequest]: () => true,
  [fetchRatingSuccess]: () => false,
  [fetchRatingFailure]: () => false,
}, false);

const ratingError = handleActions({
  [fetchRatingRequest]: () => null,
  [fetchRatingFailure]: (_state, action) => action.payload,
}, null);


export default combineReducers({
  comments,
  commentsLoading,
  commentsError,
  
  rating,
  ratingLoading,
  ratingError,

  fanfictions,
  fanfictionsLoading,
  fanfictionsError,

  fanfiction,
  fanfictionLoading,
  fanfictionError,

  addFanfiction,
  addFanfictionLoading,
  addFanfictionError,

  editFanfiction,
  editFanfictionLoading,
  editFanfictionError,

  deleteFanfiction,
  deleteFanfictionLoading,
  deleteFanfictionError,
  addLink,

  userFanfictions,
  userFanfictionsLoading,
  userFanfictionsError,

  changeFanfiction,
  changeFanfictionLoading,
  changeFanfictionError
});