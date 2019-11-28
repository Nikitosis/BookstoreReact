import AuthenticationService from "../services/AuthenticationAPI";
import axios from "axios";
import {fetchUser, fetchUserFailure, fetchUserSuccess} from "./currentUserReducer";
import UserService from "../services/UserAPI";

const LOGIN_USER_STARTED="LOGIN_USER_STARTED";
export const LOGIN_USER_SUCCESS="LOGIN_USER_SUCCESS";
const LOGIN_USER_FAILED="LOGIN_USER_FAILED";
export const LOGOUT_USER="LOGOUT_USER";

export const LOGIN_TOKEN_STARTED="LOGIN_TOKEN_STARTED";

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

export function executeLogout(){
    return {type:LOGOUT_USER};
}

function loginTokenStarted(token){
    return {type:LOGIN_TOKEN_STARTED,payload:token};
}

export function executeTokenLogin(token){
    return (dispatch)=>{
        dispatch(loginTokenStarted(token));
        debugger;
        UserService.getMyInfo()
            .then(res=> {
                    debugger;
                    const user=res.data;
                    dispatch(loginUserSuccess(user,token))
                }
            )
            .catch((e)=>{
                debugger;
                dispatch(loginUserFailed());
            })
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