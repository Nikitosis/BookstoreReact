import UserService from "../services/UserAPI";

const FETCH_USERS_STARTED="FETCH_USERS_STARTED";
const FETCH_USERS_FAILURE="FETCH_USERS_FAILURE";
const FETCH_USERS_SUCCESS="FETCH_USERS_SUCCESS";

let initialState={
    users:[]
}

function userListPageReducer(state=initialState,action){
    switch(action.type){
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users:action.payload
            }
        default:
            return state;
    }
}

function fetchUsersStartedAC(){
    return {type:FETCH_USERS_STARTED};
}

function fetchUsersFailureAC(){
    return {type:FETCH_USERS_FAILURE};
}

function fetchUsersSuccessAC(users){
    return {type:FETCH_USERS_SUCCESS,payload:users};
}

export function fetchUsers(){
    return (dispatch)=>{
        dispatch(fetchUsersStartedAC());
        UserService.getAll()
            .then((res)=>{
                let users=res.data.map((user)=> {
                    return {
                        id:user.id,
                        username:user.username,
                        fName:user.fName,
                        lName:user.lName,
                        roles:user.roles
                    }
                });
                dispatch(fetchUsersSuccessAC(users));
            })
            .catch(()=>{
                fetchUsersFailureAC();
            })
    }
}

export default userListPageReducer;