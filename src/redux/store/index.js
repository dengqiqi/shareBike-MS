import reducer from './../reducer'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
 
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(),
));

export default store;

