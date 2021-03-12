import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import {appSessionStorage} from './utils/storage/sessionStorage';

const middleware = [thunk];
const persistedState = appSessionStorage
                        .getItem('state')
                        ? appSessionStorage.getItem('state'):{};

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

 store.subscribe(()=>{
    appSessionStorage.setItem('state',store.getState());
 })

export default store;
