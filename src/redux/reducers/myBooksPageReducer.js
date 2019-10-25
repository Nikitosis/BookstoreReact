import BooksAPI from "../services/BooksAPI";
import {
    DOWNLOAD_BOOK_FINISHED,
    DOWNLOAD_BOOK_STARTED,
    FETCH_BOOKS_USER_STARTED,
    FETCH_BOOKS_USER_SUCCESS
} from "./userBooksReducer";
import {FETCH_BOOKS_FAILURE} from "./booksReducer";
import {LOGOUT_USER} from "./loginReducer";


const initialState={
    isLoading:false,
    downloadingBookIds:[]
}

function myBooksPageReducer(state=initialState,action){
    switch (action.type) {
        case FETCH_BOOKS_USER_STARTED:
            return{
                ...state,
                isLoading: true
            }
        case FETCH_BOOKS_USER_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case FETCH_BOOKS_FAILURE:
            return{
                ...state,
                isLoading: false
            }
        case DOWNLOAD_BOOK_STARTED:
            return {
                ...state,
                downloadingBookIds: state.downloadingBookIds.concat(action.payload)
            }
        case DOWNLOAD_BOOK_FINISHED:
            return {
                ...state,
                downloadingBookIds:state.downloadingBookIds.filter(val=>val!==action.payload)
            }
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
}

export default myBooksPageReducer;