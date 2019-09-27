import axios from "axios";
import AuthenticationService from "./AuthenticationService";
import {LIBRARY_URL} from "../utils/UrlConstraints";

const API_URL=LIBRARY_URL;

class UserService{

    getAll(){
        return axios.get(`${API_URL}/users`)
    }

    getUserInfo(userId){
        return axios.get(`${API_URL}/users/${userId}`)
    }

    createUser(user){
        return axios.post(`${API_URL}/users`,
            user,
            {
                headers:{
                    'content-type': 'application/json'
                },
        })
    }

    updateUser(user){
        return axios.put(`${API_URL}/users`,
            user,
            {
                headers:{
                    'content-type': 'application/json'
                },
            })
    }
}

export default new UserService();