import {
    FETCH_BOOKS_FAILURE,
    FETCH_BOOKS_STARTED,
    FETCH_BOOKS_SUCCESS, SAVE_BOOK_STARTED,
    SAVE_BOOK_SUCCESS, UPDATE_BOOK_STARTED,
    UPDATE_BOOK_SUCCESS
} from "./booksReducer";
import {TAKE_BOOK_FAILURE} from "./userBooksReducer";
import {LOGOUT_USER} from "./loginReducer";

const OPEN_BOOKS_CREATE_MODAL="OPEN_BOOKS_CREATE_MODAL";
const CLOSE_BOOKS_CREATE_MODAL="CLOSE_BOOKS_CREATE_MODAL";

const OPEN_BOOKS_EDIT_MODAL="OPEN_BOOKS_EDIT_MODAL";
const CLOSE_BOOKS_EDIT_MODAL="CLOSE_BOOKS_EDIT_MODAL";

export const WRONG_BOOK_NAME_ERROR="WRONG_BOOK_NAME_ERROR";
export const WRONG_BOOK_PRICE_ERROR="WRONG_BOOK_PRICE_ERROR";
export const WRONG_BOOK_FILE_ERROR="WRONG_BOOK_FILE_ERROR";
export const WRONG_BOOK_IMAGE_ERROR="WRONG_BOOK_IMAGE_ERROR";

const initialState={
    isCreateModalOpened:false,
    isEditModalOpened:false,
    isLoading:false,
    curBook:{},
    nameErrorMessage:null,
    priceErrorMessage:null,
    fileErrorMessage:null,
    imageErrorMessage:null,
    takeBookErrorMessage:null,
}

function booksPageReducer(state=initialState,action){
    switch(action.type){
        case OPEN_BOOKS_CREATE_MODAL:
            return{
                ...state,
                isCreateModalOpened: true,
                nameErrorMessage:null,
                priceErrorMessage:null,
                fileErrorMessage:null,
                imageErrorMessage:null,
                takeBookErrorMessage:null,
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
        case SAVE_BOOK_STARTED:
            return{
                ...state,
                nameErrorMessage:null,
                priceErrorMessage:null,
                fileErrorMessage:null,
                imageErrorMessage:null
            }
        case SAVE_BOOK_SUCCESS:
            return{
                ...state,
                isCreateModalOpened: false,
                nameErrorMessage:null,
                priceErrorMessage:null,
                fileErrorMessage:null,
                imageErrorMessage:null
            }
        case OPEN_BOOKS_EDIT_MODAL:
            return{
                ...state,
                isEditModalOpened:true,
                curBook:action.payload,
                nameErrorMessage:null,
                priceErrorMessage:null,
                fileErrorMessage:null,
                imageErrorMessage:null,
                takeBookErrorMessage:null,
            }
        case CLOSE_BOOKS_EDIT_MODAL:
            return{
                ...state,
                isEditModalOpened: false,
            }
        case UPDATE_BOOK_STARTED:
            return{
                ...state,
                nameErrorMessage:null,
                priceErrorMessage:null,
                fileErrorMessage:null,
                imageErrorMessage:null
            }
        case UPDATE_BOOK_SUCCESS:
            return{
                ...state,
                isEditModalOpened: false,
                nameErrorMessage:null,
                priceErrorMessage:null,
                fileErrorMessage:null,
                imageErrorMessage:null
        }
        case WRONG_BOOK_NAME_ERROR:
            return{
                ...state,
                nameErrorMessage: "Wrong name."
            }
        case WRONG_BOOK_PRICE_ERROR:
            return{
                ...state,
                priceErrorMessage: "Wrong price."
            }
        case WRONG_BOOK_FILE_ERROR:
            return {
                ...state,
                fileErrorMessage: "Wrong file. File size has to be less than 300MB"
            }
        case WRONG_BOOK_IMAGE_ERROR:
            return{
                ...state,
                imageErrorMessage: "Wrong image. Image size has to be less than 25MB"
            }
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
}

export function wrongBookName(){
    return {type:WRONG_BOOK_NAME_ERROR};
}

export function wrongBookPrice(){
    return {type:WRONG_BOOK_PRICE_ERROR};
}

export function wrongBookFile(){
    return {type:WRONG_BOOK_FILE_ERROR};
}

export function wrongBookImage(){
    return {type:WRONG_BOOK_IMAGE_ERROR};
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