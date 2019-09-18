import axios from "axios";

const API_URL="http://localhost:9000";

class UserService{

    getUserInfo(userId){
        return axios.get(`${API_URL}/users/${userId}`)
    }
}

export default new UserService();