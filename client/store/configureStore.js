import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
const middleware = (process.env.NODE_ENV === 'development') ?
applyMiddleware(thunkMiddleware, loggerMiddleware) :
applyMiddleware(thunkMiddleware);
const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    middleware
  );
export default configureStore;
