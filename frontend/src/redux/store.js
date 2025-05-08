import {legacy_createStore,applyMiddleware,combineReducers  } from 'redux';
import {thunk} from 'redux-thunk';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
        UserReducer
})

const store = legacy_createStore(rootReducer,applyMiddleware(thunk));

export default store;