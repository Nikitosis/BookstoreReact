import {DEPOSIT_USER_SUCCESS, UPDATE_USER_SUCCESS} from "./currentUserReducer";
import {LOGOUT_USER} from "./loginReducer";
import {UPDATE_BOOK_STARTED} from "./booksReducer";

export const OPEN_HOME_EDIT_MODAL="OPEN_HOME_EDIT_MODAL";
export const CLOSE_HOME_EDIT_MODAL="CLOSE_HOME_EDIT_MODAL";

export const OPEN_HOME_DEPOSIT_MODAL="OPEN_HOME_DEPOSIT_MODAL";
export const CLOSE_HOME_DEPOSIT_MODAL="CLOSE_HOME_DEPOSIT_MODAL";

const EDIT_USER_EMAIL_ALREADY_EXISTS="EDIT_USER_EMAIL_ALREADY_EXISTS";
const EDIT_USER_EMAIL_NOT_VALID="EDIT_USER_EMAIL_NOT_VALID";


const initialState={
    isEditModalOpened: false,
    isDepositModalOpened: false,
    emailErrorMessage:null
}

function homePageReducer(state=initialState,action){
    switch (action.type) {
        case OPEN_HOME_EDIT_MODAL:
            return{
                ...state,
                isEditModalOpened: true,
                emailErrorMessage: null
            }
        case CLOSE_HOME_EDIT_MODAL:
            return{
                ...state,
                isEditModalOpened: false,
                emailErrorMessage: null
            }
        case OPEN_HOME_DEPOSIT_MODAL:
            return{
                ...state,
                isDepositModalOpened: true
            }
        case CLOSE_HOME_DEPOSIT_MODAL:
            return{
                ...state,
                isDepositModalOpened:false
            }
        case UPDATE_BOOK_STARTED:
            return{
                ...state,
                emailErrorMessage: null
            }
        case EDIT_USER_EMAIL_ALREADY_EXISTS:
            return{
                ...state,
                emailErrorMessage: "Email already in use"
            }
        case EDIT_USER_EMAIL_NOT_VALID:
            return{
                ...state,
                emailErrorMessage: "Email not valid"
            }
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                isEditModalOpened: false,
                emailErrorMessage: null
            }
        case DEPOSIT_USER_SUCCESS:
            return{
                ...state,
                isDepositModalOpened: false
            }
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
}

export function openEditModal(){
    return {type:OPEN_HOME_EDIT_MODAL};
}

export function closeEditModal(){
    return {type:CLOSE_HOME_EDIT_MODAL};
}

export function openDepositModal(){
    return {type:OPEN_HOME_DEPOSIT_MODAL};
}

export function closeDepositModal() {
    return {type:CLOSE_HOME_DEPOSIT_MODAL};
}

export function emailAlreadyExistsAC(){
    return {type:EDIT_USER_EMAIL_ALREADY_EXISTS};
}

export function emailNotValidAC(){
    return {type:EDIT_USER_EMAIL_NOT_VALID};
}

export default homePageReducer;
