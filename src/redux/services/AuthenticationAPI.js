import axios from 'axios';
import {AUTHORISER_URL} from "../../utils/UrlConstraints";

const API_URL=AUTHORISER_URL;

export const USER_NAME_SESSION_ATTRIBUTE="authenticatedUsername";
export const USER_ID_SESSION_ATTRIBUTE="authenticatedUserId";
export const USER_ROLES_SESSION_ATTRIBUTE="authenticatedUserRoles";

const LOCAL_STORAGE_TOKEN="token";

class AuthenticationAPI{
    executeAuthentication(username,password){
        return axios.get(`${API_URL}/authenticate`,{
            params:{
                "username":username,
                "password":password
            }
        })
    }
    executeEmailVerification(token){
        return axios.get(`${API_URL}/verify/${token}`);
    }
}

export default new AuthenticationAPI();