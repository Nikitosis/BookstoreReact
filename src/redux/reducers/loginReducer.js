import AuthenticationService from "../services/AuthenticationAPI";
import axios from "axios";

const LOGIN_USER_STARTED="LOGIN_USER_STARTED";
export const LOGIN_USER_SUCCESS="LOGIN_USER_SUCCESS";
const LOGIN_USER_FAILED="LOGIN_USER_FAILED";
export const LOGOUT_USER="LOGOUT_USER";

const initialState={
    isLoginFailed:false,
    isLoading:false,
    isLogged:false
}

export default function loginReducer(state=initialState, action){
    switch (action.type) {
        case LOGIN_USER_STARTED:
            return{
                ...state,
                isLoading: true,
                isLoginFailed: false,
                isLogged:false
            }
        case LOGIN_USER_SUCCESS:
            debugger;
            return{
                ...state,
                isLoading: false,
                isLoginFailed: false,
                isLogged:true,
            }
        case LOGIN_USER_FAILED:
            return{
                ...state,
                isLoading: false,
                isLoginFailed: true,
                isLogged:false,
            }
        case LOGOUT_USER:
            return initialState;

        default:
            return state;

    }
}

function loginUserStarted(){
    return {type:LOGIN_USER_STARTED};
}

function loginUserSuccess(user,token){
    return {type:LOGIN_USER_SUCCESS,payload:{user,token}};
}

function loginUserFailed(){
    return {type:LOGIN_USER_FAILED};
}

function logoutUser(){
    return {type:LOGOUT_USER};
}

export function executeLogout(){
    return (dispatch)=>{
        dispatch(logoutUser());
    }
}

export function executeLogin(username,password){
    return (dispatch)=> {
        dispatch(loginUserStarted());
        AuthenticationService.executeAuthentication(username, password)
            .then((response) => {
                let user=response.data;
                let token=response.headers.authorization;

                dispatch(loginUserSuccess(user,token));
            })
            .catch(() => {
                dispatch(loginUserFailed());
                console.log("Not Authenticated");
            })
    }
}