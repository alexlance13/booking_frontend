import { combineReducers } from 'redux';
import authReducer from './auth';
import offerReducer from './offer';

export default combineReducers({
  offer: offerReducer,
  auth: authReducer,
});
