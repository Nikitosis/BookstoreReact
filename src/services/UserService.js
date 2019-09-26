import axios from "axios";
import AuthenticationService from "./AuthenticationService";

const API_URL="http://localhost:9000";

class UserService{

    getUserInfo(userId){
        return axios.get(`${API_URL}/users/${userId}`)
            .catch(reason => {
                if(reason.response.status==401){
                    console.log("unauthorised, loggint out...");
                    AuthenticationService.executeLogout();
                }
            })
    }

    createUser(user){
        return axios.post(`${API_URL}/users`,
            user,
            {
                headers:{
                    'content-type': 'application/json'
                },
        })
            .catch(reason => {
                if(reason.response.status==401){
                    console.log("unauthorised, loggint out...");
                    AuthenticationService.executeLogout();
                }
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
            .catch(reason => {
                if(reason.response.status==401){
                    console.log("unauthorised, loggint out...");
                    AuthenticationService.executeLogout();
                }
            })
    }
}

export default new UserService();