import axios from 'axios';
import {AUTHORISER_URL} from "../utils/UrlConstraints";

const API_URL=AUTHORISER_URL;

export const USER_NAME_SESSION_ATTRIBUTE="authenticatedUsername";
export const USER_ID_SESSION_ATTRIBUTE="authenticatedUserId";
export const USER_ROLES_SESSION_ATTRIBUTE="authenticatedUserRoles";

const LOCAL_STORAGE_TOKEN="token";

class AuthenticationService{

    constructor(props) {
        this.axiousRequestInterceptor=null;
        this.axiousResponseInterceptor=null;
        if(localStorage.getItem("token")){
            this.registerSuccessfulLogin(localStorage.getItem(LOCAL_STORAGE_TOKEN))
        }
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

    executeLogout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE);
        sessionStorage.removeItem(USER_ID_SESSION_ATTRIBUTE);
        sessionStorage.removeItem(USER_ROLES_SESSION_ATTRIBUTE);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        axios.interceptors.request.eject(this.axiousRequestInterceptor);
        axios.interceptors.response.eject(this.axiousResponseInterceptor);
        window.location.reload(true);
    }

    registerSuccessfulLogin(token){
        this.setupAxiosInterceptors(token);
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE,this.parseJwt(token).sub);
        sessionStorage.setItem(USER_ID_SESSION_ATTRIBUTE,this.parseJwt(token).userId);
        sessionStorage.setItem(USER_ROLES_SESSION_ATTRIBUTE,this.parseJwt(token).roles);
        localStorage.setItem(LOCAL_STORAGE_TOKEN,token);
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
        var user= {
            id: sessionStorage.getItem(USER_ID_SESSION_ATTRIBUTE),
            username: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE),
            roles: sessionStorage.getItem(USER_ROLES_SESSION_ATTRIBUTE)
        }
        return user;
    }

    //to always setup request headers with authorization token
    setupAxiosInterceptors(token){
        if(this.axiousRequestInterceptor!=null) {
            axios.interceptors.request.eject(this.axiousRequestInterceptor);
        }

        if(this.axiousResponseInterceptor!=null){
            axios.interceptors.response.eject(this.axiousResponseInterceptor);
        }

        this.axiousRequestInterceptor =axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn()){
                    console.log("Setting header auth: "+token);
                    config.headers.authorization=token;
                }
                return config;
            }
        )

        this.axiousResponseInterceptor=axios.interceptors.response.use(
            (response)=> {
                return response;
            },
                (error)=>{
                    console.log("Response status" + error.response.status);
                    if (401 === error.response.status) {
                        console.log("unauthorised, loggint out...");
                        this.executeLogout();
                    }
                }
        )

    }
}

export default new AuthenticationService();