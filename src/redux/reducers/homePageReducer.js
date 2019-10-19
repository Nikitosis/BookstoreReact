import {UPDATE_USER_SUCCESS} from "./currentUserReducer";
import {LOGOUT_USER} from "./loginReducer";

const OPEN_MODAL="OPEN_MODAL";
const CLOSE_MODAL="CLOSE_MODAL";


const initialState={
    isModalOpened: false
}

function homePageReducer(state=initialState,action){
    switch (action.type) {
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
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                isModalOpened: false
            }
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
}

export function openModal(){
    return {type:OPEN_MODAL};
}

export function closeModal(){
    return {type:CLOSE_MODAL};
}

export default homePageReducer;
