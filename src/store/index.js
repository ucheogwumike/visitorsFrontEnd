import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"

import rootReducer from "./reducers"
import rootSaga from "./sagas"
import {thunk} from 'redux-thunk';

// import jwtDecode from 'jwt-decode';
import {jwtDecode} from 'jwt-decode';

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
}

const setToken= (store)=>{
  return (next)=>(action)=>{
    if (localStorage.getItem('authUser')) {
      const token = JSON.parse(localStorage.getItem('authUser')).access_token;
      if (isTokenExpired(token)) {
        localStorage.removeItem('authUser');
        // history('/login')
        if(window.location !== 'login'){
          console.log('redux palava')
           
        }
       
        //return dispatch(logout())
       
      } 
      // else {
      //   setUser(JSON.parse(localStorage.getItem('user')));
      // }
    } else {
      if(window.location !== 'login'){
        console.log('redux issues')
          next(action) 
        //return window.location = '/login'
     }
    
    }
    console.log(typeof(next()))
    return next()
  }
  

} 

const loggerMiddleware = (store) => (next) => (action) => {
  if (localStorage.getItem('authUser')) {
    const token = JSON.parse(localStorage.getItem('authUser')).access_token;
    if (isTokenExpired(token)) {
      localStorage.removeItem('authUser');
      // history('/login')
      if(window.location !== 'login'){
        console.log('redux palava')
         
      }
     
    
     
    } 
  }
  next(action);
};

const tokenMiddleware = setToken()
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware,sagaMiddleware),
  )
sagaMiddleware.run(rootSaga)

export default store
