import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import currentUserReducer from "./reducers/currentUserReducer";
import loginReducer from "./reducers/loginReducer";

const reducers=combineReducers({
    currentUserReducer:currentUserReducer,
    loginReducer:loginReducer
});

const store=createStore(
    reducers,
    applyMiddleware(thunk)
    );

export default store;