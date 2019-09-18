import axios from 'axios';
import User from "../models/User";

const API_URL="http://localhost:9004";

export const USER_NAME_SESSION_ATTRIBUTE="authenticatedUsername";
export const USER_ID_SESSION_ATTRIBUTE="authenticatedUserId";
export const USER_ROLES_SESSION_ATTRIBUTE="authenticatedUserRoles";

class AuthenticationService{

    constructor(props) {
        this.axiousInterceptor=null;
    }

    parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }


    executeAuthentication(username,password){
        return axios.get(`${API_URL}/authenticate`,{
            params:{
                "username":username,
                "password":password
            }
        })
    }

    registerSuccessfulLogin(username,token){
        this.setupAxiosInterceptors(token);
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE,username);
        sessionStorage.setItem(USER_ID_SESSION_ATTRIBUTE,this.parseJwt(token).userId);
        sessionStorage.setItem(USER_ROLES_SESSION_ATTRIBUTE,this.parseJwt(token).roles);
    }

    isUserLoggedIn(){
        let user=sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if(user==null)
            return false;
        return true;
    }

    getCurrentUser(){
        if(!this.isUserLoggedIn()){
            return null;
        }
        var user=new User(
            sessionStorage.getItem(USER_ID_SESSION_ATTRIBUTE),
            sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE),
            sessionStorage.getItem(USER_ROLES_SESSION_ATTRIBUTE)
        );
        return user;
    }

    //to always setup request headers with authorization token
    setupAxiosInterceptors(token){
        if(this.axiosInterceptor!=null) {
            axios.interceptors.request.eject(this.axiosInterceptor);
        }

        this.axiosInterceptor =axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn()){
                    console.log("Setting header auth: "+token);
                    config.headers.authorization=token;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService();