import BooksAPI from "../services/BooksAPI";

export const FETCH_BOOKS_USER_STARTED="FETCH_BOOKS_USER_STARTED";
export const FETCH_BOOKS_USER_FAILURE="FETCH_BOOKS_USER_FAILURE";
export const FETCH_BOOKS_USER_SUCCESS="FETCH_BOOKS_USER_SUCCESS";

const initialState={
    books:[],
    isError:false
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

export default userBooksReducer;