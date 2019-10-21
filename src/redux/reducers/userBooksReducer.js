import BooksAPI from "../services/BooksAPI";

const FETCH_BOOKS_USERPAGE_STARTED="FETCH_BOOKS_USERPAGE_STARTED";
const FETCH_BOOKS_USERPAGE_FAILURE="FETCH_BOOKS_USERPAGE_FAILURE";
const FETCH_BOOKS_USERPAGE_SUCCESS="FETCH_BOOKS_USERPAGE_SUCCESS";

const initialState={
    books:[],
    isError:false
}

function userBooksReducer(state=initialState,action){
    switch(action.type){
        case FETCH_BOOKS_USERPAGE_SUCCESS:
            return {
                ...state,
                books:action.payload,
                isError:false
            }
        case FETCH_BOOKS_USERPAGE_FAILURE:
            return{
                ...state,
                isError: true
            }
        default:
            return state
    }
}

function fetchBooksStartedAC(){
    return {type:FETCH_BOOKS_USERPAGE_STARTED};
}

function fetchBooksFailureAC(){
    return {type:FETCH_BOOKS_USERPAGE_FAILURE};
}

function fetchBooksSuccessAC(books){
    return {type:FETCH_BOOKS_USERPAGE_SUCCESS,payload:books};
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