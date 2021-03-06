import axios from "axios";
import {executeLogout} from "./reducers/loginReducer";

export function setupInterceptors(store){
    axios.interceptors.request.use(
        (config)=>{
            console.log("Authorized token: ");
            console.log(store.getState().currentUserReducer.token);
            config.headers.authorization=store.getState().currentUserReducer.token;
            return config;
        }
    );

    axios.interceptors.response.use(
        (response)=> {
            return response;
        },
        (error)=>{
            if (403 === error.response.status) {
                console.log("unauthorised, loggint out...");
                store.dispatch(executeLogout());
            }
            return Promise.reject(error);
        }
    )
}
