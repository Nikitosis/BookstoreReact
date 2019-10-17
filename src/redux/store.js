import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import homePageReducer from "./reducers/homePageReducer";

const reducers=combineReducers({
    homePage:homePageReducer
});

const store=createStore(
    reducers,
    applyMiddleware(thunk)
    );

export default store;