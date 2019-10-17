import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import currentUserReducer from "./reducers/currentUserReducer";

const reducers=combineReducers({
    homePage:currentUserReducer
});

const store=createStore(
    reducers,
    applyMiddleware(thunk)
    );

export default store;