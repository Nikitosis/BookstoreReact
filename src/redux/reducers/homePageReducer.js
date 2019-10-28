import {DEPOSIT_USER_SUCCESS, UPDATE_USER_SUCCESS} from "./currentUserReducer";
import {LOGOUT_USER} from "./loginReducer";

export const OPEN_HOME_EDIT_MODAL="OPEN_HOME_EDIT_MODAL";
export const CLOSE_HOME_EDIT_MODAL="CLOSE_HOME_EDIT_MODAL";

export const OPEN_HOME_DEPOSIT_MODAL="OPEN_HOME_DEPOSIT_MODAL";
export const CLOSE_HOME_DEPOSIT_MODAL="CLOSE_HOME_DEPOSIT_MODAL";


const initialState={
    isEditModalOpened: false,
    isDepositModalOpened: false,
}

function homePageReducer(state=initialState,action){
    switch (action.type) {
        case OPEN_HOME_EDIT_MODAL:
            return{
                ...state,
                isEditModalOpened: true
            }
        case CLOSE_HOME_EDIT_MODAL:
            return{
                ...state,
                isEditModalOpened: false
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
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                isEditModalOpened: false
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

export default homePageReducer;
