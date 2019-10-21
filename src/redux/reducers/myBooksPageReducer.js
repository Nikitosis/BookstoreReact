import {FETCH_BOOKS_FAILURE, FETCH_BOOKS_STARTED, FETCH_BOOKS_SUCCESS} from "./booksReducer";

const initialState={
    isLoading:false
}

function myBooksPageReducer(state=initialState,action){
    switch (action.type) {
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
        default:
            return state;
    }
}

export default myBooksPageReducer;