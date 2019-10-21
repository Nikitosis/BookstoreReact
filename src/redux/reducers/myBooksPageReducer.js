import BooksAPI from "../services/BooksAPI";
import {FETCH_BOOKS_USER_STARTED, FETCH_BOOKS_USER_SUCCESS} from "./userBooksReducer";
import {FETCH_BOOKS_FAILURE} from "./booksReducer";


const initialState={
    isLoading:false
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
        default:
            return state;
    }
}

export default myBooksPageReducer;