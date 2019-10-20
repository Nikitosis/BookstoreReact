import axios from "axios";
import {LOGGER_URL} from "../../utils/UrlConstraints";

const API_URL=LOGGER_URL;

class LogAPI{
    getLogs(){
        return axios.get(`${API_URL}/actions`)
    }
}

export default new LogAPI();