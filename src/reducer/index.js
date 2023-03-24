import { combineReducers } from 'redux';

import episode from './episode';
import favorite from './favorite';

export default combineReducers({
  episode,
  favorite,
});
