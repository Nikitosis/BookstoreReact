import BooksAPI from "../services/BooksAPI";
import {fetchBooksByUserId} from "./userBooksReducer";

export const FETCH_BOOKS_STARTED="FETCH_BOOKS_STARTED";
export const FETCH_BOOKS_FAILURE="FETCH_BOOKS_FAILURE";
export const FETCH_BOOKS_SUCCESS="FETCH_BOOKS_SUCCESS";

export const SAVE_BOOK_STARTED="SAVE_BOOK_STARTED";
export const SAVE_BOOK_FAILURE="SAVE_BOOK_FAILURE";
export const SAVE_BOOK_SUCCESS="SAVE_BOOK_SUCCESS";

export const DELETE_BOOK_STARTED="DELETE_BOOK_STARTED";
export const DELETE_BOOK_FAILURE="DELETE_BOOK_FAILURE";
export const DELETE_BOOK_SUCCESS="DELETE_BOOK_SUCCESS";



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

export function fetchBooks(){
    return (dispatch,getState)=>{
        dispatch(fetchBooksStartedAC());
        console.log("Fetch books");
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
        BooksAPI.saveBook(book,image,file)
            .then(response=>{
                dispatch(saveBookSuccessAC());
                dispatch(fetchBooks());
            })
            .catch(e=>{
                dispatch(saveBookFailureAC());
            })
    }
}

export function deleteBook(bookId){
    return (dispatch)=>{
        dispatch(deleteBookStartedAC());
        BooksAPI.deleteBook(bookId)
            .then(response=>{
                dispatch(deleteBookSuccessAC())
                dispatch(fetchBooks());
            })
            .catch(e=>{
                dispatch(deleteBookFailureAC())
            })
    }
}



export default booksReducer;