import UserService from "../../services/UserService";
import AuthenticationService from "../../services/AuthenticationService";

const FETCH_USER_STARTED="FETCH_USER_STARTED";
const FETCH_USER_SUCCESS="FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE="FETCH_USER_FAILURE";

const UPDATE_USER_STARTED="UPDATE_USER_STARTED";
const UPDATE_USER_SUCCESS="UPDATE_USER_SUCCESS";
const UPDATE_USER_FAILURE="UPDATE_USER_FAILURE";

const OPEN_MODAL="OPEN_MODAL";
const CLOSE_MODAL="CLOSE_MODAL";

const initialState={
    user:{},
    loading:false,
    error:null,
    isModalOpened: false
}

function homePageReducer(state=initialState, action){
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
                isModalOpened: false
            }
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case OPEN_MODAL:
            return{
                ...state,
                isModalOpened: true
            }
        case CLOSE_MODAL:
            return{
                ...state,
                isModalOpened: false
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

export function openModal(){
    return {type:OPEN_MODAL};
}

export function closeModal(){
    return {type:CLOSE_MODAL};
}

export function fetchUser(){
        return (dispatch)=>{
            dispatch(fetchUserStarted());
            UserService.getUserInfo(AuthenticationService.getCurrentUser().id)
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
    return (dispatch)=>{
        let user={
            id:AuthenticationService.getCurrentUser().id,
            username:AuthenticationService.getCurrentUser().username,
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

export default homePageReducer;