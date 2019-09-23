import axios from "axios";

const API_URL="http://localhost:9000";

class UserService{

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
        });
    }
}

export default new UserService();