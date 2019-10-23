import UserService from "../services/UserAPI";
import AuthenticationService from "../services/AuthenticationAPI";
import {LOGIN_USER_SUCCESS, LOGOUT_USER} from "./loginReducer";

const FETCH_USER_STARTED="FETCH_USER_STARTED";
const FETCH_USER_SUCCESS="FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE="FETCH_USER_FAILURE";

const UPDATE_USER_STARTED="UPDATE_USER_STARTED";
export const UPDATE_USER_SUCCESS="UPDATE_USER_SUCCESS";
const UPDATE_USER_FAILURE="UPDATE_USER_FAILURE";

const initialState={
    user:null,
    loading:false,
    error:null,
    token:null,
}

function currentUserReducer(state=initialState, action){
    switch (action.type) {
        case FETCH_USER_STARTED:
            return {
                ...state,
                loading:true
            }
        case FETCH_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null,
                user: action.payload
            };
        case FETCH_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case UPDATE_USER_STARTED:
            return{
                ...state,
            }
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
            }
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case LOGIN_USER_SUCCESS:
            return{
                ...state,
                user:action.payload.user,
                token:action.payload.token
            }
        default:
            return state;
    }
}

export function fetchUserStarted(){
    return {type:FETCH_USER_STARTED};
}

export function fetchUserSuccess(user){
    return {type:FETCH_USER_SUCCESS,payload:user};
}

export function fetchUserFailure(error){
    return {type:FETCH_USER_FAILURE,payload:error};
}

export function updateUserStarted(){
    return {type:UPDATE_USER_STARTED};
}

export function updateUserSuccess(user){
    return {type:UPDATE_USER_SUCCESS,payload:user};
}

export function updateUserFailure(error) {
    return {type:UPDATE_USER_FAILURE,payload:error};
}

export function fetchUser(){
        return (dispatch,getState)=>{
            dispatch(fetchUserStarted());
            UserService.getUserInfo(getState().currentUserReducer.user.id)
                .then(res=> {
                    const user=res.data;
                    dispatch(fetchUserSuccess(user));
                    }
                )
                .catch((e)=>{
                    dispatch(fetchUserFailure(e));
                })
    };
}

export function updateUser(firstName,lastName,country,city,gender,email,phone,avatar){
    return (dispatch,getState)=>{
        let user={
            id:getState().currentUserReducer.user.id,
            username:getState().currentUserReducer.user.username,
            fName:firstName,
            lName:lastName,
            country:country,
            city:city,
            gender:gender,
            email:email,
            phone:phone
        }
        dispatch(updateUserStarted());
        UserService.updateUser(user,avatar)
            .then(res=>{
                const user=res.data;
                dispatch(updateUserSuccess(user));
            })
            .catch((e)=>{
                dispatch(updateUserFailure(e));
            })
    }
}

export default currentUserReducer;