import axios from 'axios';

const API_URL="http://localhost:9004";

export const USER_NAME_SESSION_ATTRIBUTE="authenticatedUser";

class AuthenticationService{

    constructor(props) {
        this.axiousInterceptor=null;

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
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE,username);
        this.setupAxiosInterceptors(token);
    }

    isUserLoggedIn(){
        let user=sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if(user==null)
            return false;
        return true;
    }

    //to always setup request headers with authorization token
    setupAxiosInterceptors(token){
        console.log(this.isUserLoggedIn());

        console.log(this.axiosInterceptor);

        this.axiosInterceptor =axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn()){
                    console.log("Setting header auth: "+token);
                    config.headers.authorization=token;
                }
                return config;
            }
        )

        if(this.axiousInterceptor!=null) {
            axios.interceptors.request.eject(this.axiosInterceptor);
            console.log("eject");
        }
    }
}

export default new AuthenticationService();