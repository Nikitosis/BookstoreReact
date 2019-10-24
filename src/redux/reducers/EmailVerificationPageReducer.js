import AuthenticationAPI from "../services/AuthenticationAPI";

const VERIFICATION_EMAIL_STARTED="VERIFICATION_EMAIL_STARTED";
const VERIFICATION_EMAIL_FAILURE="VERIFICATION_EMAIL_FAILURE";
const VERIFICATION_EMAIL_SUCCESS="VERIFICATION_EMAIL_SUCCESS";


const initialState={
    message:null
}

function EmailVerificationPageReducer(state=initialState,action){
    switch(action.type){
        case VERIFICATION_EMAIL_STARTED:
            return {
                ...state,
                message: null
            };
        case VERIFICATION_EMAIL_FAILURE:
            return{
                ...state,
                message: "Invalid verification link"
            };
        case VERIFICATION_EMAIL_SUCCESS:
            return{
                ...state,
                message: "Successfully verified"
            };
        default:
            return state;
    }
}

function verificationEmailStartedAC(){
    return {type:VERIFICATION_EMAIL_STARTED};
}

function verificationEmailFailureAC(){
    return {type:VERIFICATION_EMAIL_FAILURE};
}

function verificationEmailSuccessAC(){
    return {type:VERIFICATION_EMAIL_SUCCESS};
}

export function executeEmailVerification(token){
    return (dispatch)=>{
        dispatch(verificationEmailStartedAC());
        AuthenticationAPI.executeEmailVerification(token)
            .then((response)=>{
                dispatch(verificationEmailSuccessAC());
            })
            .catch(e=>{
                dispatch(verificationEmailFailureAC());
            })
    }
}

export default EmailVerificationPageReducer;