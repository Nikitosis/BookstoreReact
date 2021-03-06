import BooksAPI from "../services/BooksAPI";
import {wrongBookName, wrongBookPrice} from "./booksPageReducer";
import Noty from "noty";
import {showErrorNotification, showNotification, showSuccessNotification} from "../NotificationService";

export const FETCH_BOOKS_STARTED="FETCH_BOOKS_STARTED";
export const FETCH_BOOKS_FAILURE="FETCH_BOOKS_FAILURE";
export const FETCH_BOOKS_SUCCESS="FETCH_BOOKS_SUCCESS";

export const SAVE_BOOK_STARTED="SAVE_BOOK_STARTED";
export const SAVE_BOOK_FAILURE="SAVE_BOOK_FAILURE";
export const SAVE_BOOK_SUCCESS="SAVE_BOOK_SUCCESS";

export const DELETE_BOOK_STARTED="DELETE_BOOK_STARTED";
export const DELETE_BOOK_FAILURE="DELETE_BOOK_FAILURE";
export const DELETE_BOOK_SUCCESS="DELETE_BOOK_SUCCESS";

export const UPDATE_BOOK_STARTED="UPDATE_BOOK_STARTED";
export const UPDATE_BOOK_FAILURE="UPDATE_BOOK_FAILURE";
export const UPDATE_BOOK_SUCCESS="UPDATE_BOOK_SUCCESS";




const initialState={
    books:[]
}

function booksReducer(state=initialState,action){
    switch(action.type){
        case FETCH_BOOKS_SUCCESS:
            return{
                ...state,
                books:action.payload
            }
        default:
            return state;
    }
}

function fetchBooksStartedAC(){
    return {type:FETCH_BOOKS_STARTED};
}

function fetchBooksFailure(){
    return {type:FETCH_BOOKS_FAILURE};
}

function fetchBooksSuccess(books){
    return {type:FETCH_BOOKS_SUCCESS,payload:books};
}

function saveBookStartedAC(){
    return {type:SAVE_BOOK_STARTED};
}

function saveBookFailureAC(){
    return {type:SAVE_BOOK_FAILURE};
}

function saveBookSuccessAC(){
    return {type:SAVE_BOOK_SUCCESS};
}

function deleteBookStartedAC(){
    return {type:DELETE_BOOK_STARTED};
}

function deleteBookFailureAC(){
    return {type:DELETE_BOOK_FAILURE};
}

function deleteBookSuccessAC(){
    return {type:DELETE_BOOK_SUCCESS};
}

function updateBookStartedAC(){
    return {type:UPDATE_BOOK_STARTED};
}

function updateBookFailureAC(){
    return {type:UPDATE_BOOK_FAILURE};
}

function updateBookSuccessAC(){
    return {type:UPDATE_BOOK_SUCCESS};
}

function executeBookValidation(book,dispatch){
    let isValid=true;
    if(book.name==null || book.name===""){
        isValid=false;
        dispatch(wrongBookName());
    }
    if(book.price==null || book.price===""){
        isValid=false;
        dispatch(wrongBookPrice());
    }

    return isValid;
}

export function fetchBooks(){
    return (dispatch,getState)=>{
        dispatch(fetchBooksStartedAC());
        BooksAPI.getAllBooks()
            .then(response=>{
                let books=response.data;
                dispatch(fetchBooksSuccess(books));
            })
            .catch(e=>{
                dispatch(fetchBooksFailure());
            })
    }
}

export function saveBook(book,image,file){
    return (dispatch)=>{
        dispatch(saveBookStartedAC());

        let isValid=executeBookValidation(book,dispatch);
        if(isValid) {

            BooksAPI.saveBook(book, image, file)
                .then(response => {
                    dispatch(saveBookSuccessAC());
                    dispatch(fetchBooks());
                    //show notification
                    showSuccessNotification("Successfully added book");

                })
                .catch(e => {
                    dispatch(saveBookFailureAC());

                    showErrorNotification("Cannot save book");
                })

        }
    }
}

export function updateBook(book,image,file){
    return (dispatch)=>{
        dispatch(updateBookStartedAC());

        let isValid=executeBookValidation(book,dispatch);

        if(isValid) {
            BooksAPI.updateBook(book, image, file)
                .then(response => {
                    dispatch(updateBookSuccessAC());
                    dispatch(fetchBooks());

                    showSuccessNotification("Successfully updated book");
                })
                .catch(e => {
                    dispatch(updateBookFailureAC());

                    showErrorNotification("Cannot update book");
                })
        }
    }
}

export function deleteBook(bookId){
    return (dispatch)=>{
        dispatch(deleteBookStartedAC());
        BooksAPI.deleteBook(bookId)
            .then(response=>{
                dispatch(deleteBookSuccessAC())
                dispatch(fetchBooks());

                showSuccessNotification("Successfully deleted book");
            })
            .catch(e=>{
                dispatch(deleteBookFailureAC())

                showErrorNotification("Cannot delete book");
            })
    }
}



export default booksReducer;