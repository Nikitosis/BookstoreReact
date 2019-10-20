import UserService from "../services/UserAPI";
import {executeLogin} from "./loginReducer";

const USERNAME_ALREADY_EXISTS="USERNAME_ALREADY_EXISTS";
const USERNAME_NOT_VALID="USERNAME_NOT_VALID";
const PASSWORD_NOT_VALID="PASSWORD_NOT_VALID";
const REPEAT_PASSWORD_NOT_VALID="REPEAT_PASSWORD_NOT_VALID";
const REGISTRATION_STARTED="REGISTRATION_STARTED";
const REGISTRATION_SUCCESS="REGISTRATION_SUCCESS";


const initialState={
    usernameErrorMessage:null,
    passwordErrorMessage:null,
    repeatPasswordErrorMessage:null
}

function registrationPageReducer(state=initialState,action){
    switch(action.type){
        case USERNAME_ALREADY_EXISTS:
            return {
                ...state,
                usernameErrorMessage:"Username already exists"
            }
        case USERNAME_NOT_VALID:
            return{
                ...state,
                usernameErrorMessage: "Username have to be at least 6 characters long and contain only letters"
            }
        case PASSWORD_NOT_VALID:
            return{
                ...state,
                passwordErrorMessage: "Password have to be at least 6 characters long"
            }
        case REPEAT_PASSWORD_NOT_VALID:
            return{
                ...state,
                repeatPasswordErrorMessage: "Repeated password is not equal to original one"
            }
        case REGISTRATION_STARTED:
            return{
                ...state,
                usernameErrorMessage: null,
                passwordErrorMessage: null,
                repeatPasswordErrorMessage: null
            }
        case REGISTRATION_SUCCESS:
            return{
                ...state
            }
        default:
            return state;
    }
}

function usernameNotValid(){
    return {type:USERNAME_NOT_VALID};
}

function usernameAlreadyExists(){
    return {type:USERNAME_ALREADY_EXISTS};
}

function passwordNotValid(){
    return {type:PASSWORD_NOT_VALID};
}

function repeatPasswordNotValid(){
    return {type:REPEAT_PASSWORD_NOT_VALID};
}

function registrationSuccess(){
    return {type:REGISTRATION_SUCCESS};
}

function registrationStarted(){
    return {type:REGISTRATION_STARTED};
}

export function executeRegistration(fName,lName,username,password,repeatPassword){
    return (dispatch)=>{
        dispatch(registrationStarted());
        let isValid=true;
        if(!username || !username.match(/\w{6,}/i)){
            isValid=false;
            dispatch(usernameNotValid());
        }

        if(!password || !password.match(/.{6,}/)){
            isValid=false;
            dispatch(passwordNotValid());
        }

        if(!repeatPassword || repeatPassword!==password){
            isValid=false;
            dispatch(repeatPasswordNotValid());
        }
        debugger;
        if(isValid){
            UserService.createUser({
                fName,
                lName,
                username,
                password
            })
                .then((response)=>{
                    dispatch(registrationSuccess());
                    dispatch(executeLogin(username,password));
                })
                .catch((error)=>{
                    dispatch(usernameAlreadyExists());
                })
        }
    }
}

export default registrationPageReducer;