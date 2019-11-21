import CountryAPI from "../services/CountryAPI";

const FETCH_COUNTRIES_STARTED="FETCH_COUNTRIES_STARTED";
const FETCH_COUNTRIES_SUCCEED="FETCH_COUNTRIES_SUCCEED";
const FETCH_COUNTRIES_FAILURE="FETCH_COUNTRIES_FAILURE";

const initialState={
    countries:[]
}

function countryReducer(state=initialState,action){
    switch(action.type){
        case FETCH_COUNTRIES_SUCCEED:
            return {
                ...state,
                countries:action.payload
            }
        default:
            return state;
    }
}

function fetchCountriesStartedAC(){
    return {type:FETCH_COUNTRIES_STARTED};
}

function fetchCountriesFailureAC(){
    return {type:FETCH_COUNTRIES_FAILURE};
}

function fetchCountriesSucceedAC(countries){
    return {type:FETCH_COUNTRIES_SUCCEED,payload:countries};
}


export function fetchCountries(){
    return (dispatch,getState)=>{
        dispatch(fetchCountriesStartedAC());
        CountryAPI.getCountries()
            .then(res=>{
                const countries=res.data;
                dispatch(fetchCountriesSucceedAC(countries))
            })
            .catch(error=>{
                dispatch(fetchCountriesFailureAC())
            })
    }
}

export default countryReducer;