import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import currentUserReducer from "./reducers/currentUserReducer";
import loginReducer from "./reducers/loginReducer";
import {loadState, saveState} from "./localStoreManager";
import throttle from 'lodash/throttle';
import homePageReducer from "./reducers/homePageReducer";
import registrationPageReducer from "./reducers/registrationPageReducer";
import booksReducer from "./reducers/booksReducer";
import booksPageReducer from "./reducers/booksPageReducer";

const reducers=combineReducers({
    currentUserReducer,
    loginReducer,
    homePageReducer,
    registrationPageReducer,
    booksReducer,
    booksPageReducer,
});
const persistedState=loadState();
const store=createStore(
    reducers,
    persistedState,
    applyMiddleware(thunk)
    );

//save state to localstorage every second
store.subscribe(throttle(()=>{
    saveState(store.getState());
    },
    1000));

export default store;