import {
    FETCH_BOOKS_FAILURE,
    FETCH_BOOKS_STARTED,
    FETCH_BOOKS_SUCCESS,
    SAVE_BOOK_SUCCESS,
    UPDATE_BOOK_SUCCESS
} from "./booksReducer";

const OPEN_BOOKS_CREATE_MODAL="OPEN_BOOKS_CREATE_MODAL";
const CLOSE_BOOKS_CREATE_MODAL="CLOSE_BOOKS_CREATE_MODAL";

const OPEN_BOOKS_EDIT_MODAL="OPEN_BOOKS_EDIT_MODAL";
const CLOSE_BOOKS_EDIT_MODAL="CLOSE_BOOKS_EDIT_MODAL";

const initialState={
    isCreateModalOpened:false,
    isEditModalOpened:false,
    isLoading:false,
    curBook:{}
}

function booksPageReducer(state=initialState,action){
    switch(action.type){
        case OPEN_BOOKS_CREATE_MODAL:
            return{
                ...state,
                isCreateModalOpened: true
            }
        case CLOSE_BOOKS_CREATE_MODAL:
            return{
                ...state,
                isCreateModalOpened:false
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
                isCreateModalOpened: false
            }
        case OPEN_BOOKS_EDIT_MODAL:
            return{
                ...state,
                isEditModalOpened:true,
                curBook:action.payload
            }
        case CLOSE_BOOKS_EDIT_MODAL:
            return{
                ...state,
                isEditModalOpened: false
            }
        case UPDATE_BOOK_SUCCESS:{
            return{
                ...state,
                isEditModalOpened: false
            }
        }
        default:
            return state;
    }
}

export function openCreateModalAC() {
    return {type: OPEN_BOOKS_CREATE_MODAL};
}

export function closeCreateModalAc(){
    return {type:CLOSE_BOOKS_CREATE_MODAL};
}

export function openEditModalAC(curBook){
    return {type:OPEN_BOOKS_EDIT_MODAL,payload:curBook}
}

export function closeEditModalAC(){
    return {type:CLOSE_BOOKS_EDIT_MODAL}
}

export default booksPageReducer;