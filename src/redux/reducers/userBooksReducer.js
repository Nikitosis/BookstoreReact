import BooksAPI from "../services/BooksAPI";
import {Buffer} from "buffer";
import {showErrorNotification, showNotification, showSuccessNotification} from "../NotificationService";
import {fetchBooks} from "./booksReducer";

export const FETCH_BOOKS_USER_STARTED="FETCH_BOOKS_USER_STARTED";
export const FETCH_BOOKS_USER_FAILURE="FETCH_BOOKS_USER_FAILURE";
export const FETCH_BOOKS_USER_SUCCESS="FETCH_BOOKS_USER_SUCCESS";

export const RETURN_BOOK_STARTED="RETURN_BOOK_STARTED";
export const RETURN_BOOK_FAILURE="RETURN_BOOK_FAILURE";
export const RETURN_BOOK_SUCCESS="RETURN_BOOK_SUCCESS";

export const TAKE_BOOK_STARTED="TAKE_BOOK_STARTED";
export const TAKE_BOOK_FAILURE="TAKE_BOOK_FAILURE";
export const TAKE_BOOK_SUCCESS="TAKE_BOOK_SUCCESS";

export const DOWNLOAD_BOOK_STARTED="DOWNLOAD_BOOK_STARTED";
export const DOWNLOAD_BOOK_FINISHED="DOWNLOAD_BOOK_FINISHED";


const initialState={
    books:[],
    isError:false,
}

function userBooksReducer(state=initialState,action){
    switch(action.type){
        case FETCH_BOOKS_USER_SUCCESS:
            return {
                ...state,
                books:action.payload,
                isError:false
            }
        case FETCH_BOOKS_USER_FAILURE:
            return{
                ...state,
                isError: true
            }
        case FETCH_BOOKS_USER_STARTED:
            return{
                ...state
            }
        default:
            return state
    }
}

function fetchBooksStartedAC(){
    return {type:FETCH_BOOKS_USER_STARTED};
}

function fetchBooksFailureAC(){
    return {type:FETCH_BOOKS_USER_FAILURE};
}

function fetchBooksSuccessAC(books){
    return {type:FETCH_BOOKS_USER_SUCCESS,payload:books};
}

function returnBookStartedAC(){
    return {type:RETURN_BOOK_STARTED};
}

function returnBookFailureAC(){
    return {type:RETURN_BOOK_FAILURE};
}

function returnBookSuccessAC(){
    return {type:RETURN_BOOK_SUCCESS};
}

function takeBookStartedAC(){
    return {type:TAKE_BOOK_STARTED};
}

function takeBookFailureAC(){
    return {type:TAKE_BOOK_FAILURE};
}

function takeBookSuccessAC(){
    return {type:TAKE_BOOK_SUCCESS};
}

function downloadBookStartedAC(bookId){
    return {type:DOWNLOAD_BOOK_STARTED,payload:bookId};
}

function downloadBookFinishedAC(bookId){
    return {type:DOWNLOAD_BOOK_FINISHED,payload:bookId};
}


export function takeBook(bookId){
    return (dispatch,getState)=>{
        dispatch(takeBookStartedAC());

        BooksAPI.takeBookByUserId(getState().currentUserReducer.user.id,bookId)
            .then(response=>{
                dispatch(takeBookSuccessAC());
                dispatch(fetchBooks());

                showSuccessNotification("Book is taken");
            })
            .catch(e=>{
                dispatch(takeBookFailureAC())
                if(e.response.data.code===4){
                    showErrorNotification("Cannot take book. Book is already taken");
                }
                if(e.response.data.code===5){
                    showErrorNotification("Cannot take book. Not enough money");
                }
            })
    }
}

export function returnBook(bookId){
    return (dispatch,getState)=>{
        dispatch(returnBookStartedAC());

        BooksAPI.returnBookByUserId(getState().currentUserReducer.user.id,bookId)
            .then(response=>{
                dispatch(returnBookSuccessAC());
                dispatch(fetchBooks());

                showSuccessNotification("Book is returned");
            })
            .catch(e=>{
                dispatch(returnBookFailureAC())

                showErrorNotification("Cannot return book");
            })
    }
}

export function fetchBooksByUserId(userId){
    return (dispatch)=>{
        dispatch(fetchBooksStartedAC());
        BooksAPI.getBooksByUserId(userId)
            .then(response=>{
                let books=response.data;
                dispatch(fetchBooksSuccessAC(books));
            })
            .catch(e=>{
                dispatch(fetchBooksFailureAC());
            })
    }
}

const FileDownload = require('react-file-download');

function extractFileName(contentDispositionValue){
    var filename = "";
    if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(contentDispositionValue);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
    }
    return filename;
}

function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
}

export function downloadBookFile(bookId){
    return (dispatch,getState)=>{
        dispatch(downloadBookStartedAC(bookId))
        BooksAPI.getFileBook(getState().currentUserReducer.user.id,bookId)
            .then(response=>{
                let fileName=extractFileName(response.headers['content-disposition']);
                FileDownload(base64ToArrayBuffer(response.data),fileName);

                dispatch(downloadBookFinishedAC(bookId));
            })
            .catch(e=>{
                console.log(e);
                dispatch(downloadBookFinishedAC(bookId))

                showErrorNotification("Cannot download book");
            })
    }
}


export default userBooksReducer;