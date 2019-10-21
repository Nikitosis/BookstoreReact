import BooksAPI from "../services/BooksAPI";
import UserAPI from "../services/UserAPI";

const FETCH_USER_USERPAGE_STARTED="FETCH_USER_USERPAGE_STARTED";
const FETCH_USER_USERPAGE_FAILED="FETCH_USER_USERPAGE_FAILED";
const FETCH_USER_USERPAGE_SUCCESS="FETCH_USER_USERPAGE_SUCCESS";

const initialState={
    user:null,
    isLoading:true,
    isError:false,
    books:[]
}

function userPageReducer(state=initialState,action){
    switch(action.type){
        case FETCH_USER_USERPAGE_STARTED:
            return{
                ...state,
                isLoading: true
            }
        case FETCH_USER_USERPAGE_FAILED:
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case FETCH_USER_USERPAGE_SUCCESS:
            return{
                ...state,
                user:action.payload,
                isLoading: false,
                isError: false
            }
        default:
            return state
    }
}

function fetchUserStartedAC(){
    return{type:FETCH_USER_USERPAGE_STARTED};
}

function fetchUserFailerAC(){
    return{type:FETCH_USER_USERPAGE_FAILED};
}

function fetchUserSuccessAC(user){
    return{type:FETCH_USER_USERPAGE_SUCCESS,payload:user};
}

export function fetchUserById(userId){
    return (dispatch)=>{
        dispatch(fetchUserStartedAC())

        UserAPI.getUserInfo(userId)
            .then(response=>{
                dispatch(fetchUserSuccessAC(response.data));
            })
            .catch(e=>{
                dispatch(fetchUserFailerAC());
            })
    }
}


export default userPageReducer;