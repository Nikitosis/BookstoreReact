import {FETCH_BOOKS_FAILURE, FETCH_BOOKS_STARTED, FETCH_BOOKS_SUCCESS, SAVE_BOOK_SUCCESS} from "./booksReducer";

const OPEN_BOOKS_CREATE_MODAL="OPEN_BOOKS_CREATE_MODAL";
const CLOSE_BOOKS_CREATE_MODAL="CLOSE_BOOKS_CREATE_MODAL";


const initialState={
    isModalOpened:false,
    isLoading:false,
}

function booksPageReducer(state=initialState,action){
    switch(action.type){
        case OPEN_BOOKS_CREATE_MODAL:
            return{
                ...state,
                isModalOpened: true
            }
        case CLOSE_BOOKS_CREATE_MODAL:
            return{
                ...state,
                isModalOpened:false
            }
        case FETCH_BOOKS_STARTED:
            return{
                ...state,
                isLoading: true
            }
        case FETCH_BOOKS_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case FETCH_BOOKS_FAILURE:
            return{
                ...state,
                isLoading: false
            }
        case SAVE_BOOK_SUCCESS:
            return{
                ...state,
                isModalOpened: false
            }
        default:
            return state;
    }
}

export function openModalAC() {
    return {type: OPEN_BOOKS_CREATE_MODAL};
}

export function closeModalAc(){
    return {type:CLOSE_BOOKS_CREATE_MODAL};
}

export default booksPageReducer;