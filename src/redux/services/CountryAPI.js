import axios from "axios";
import {LIBRARY_URL} from "../../utils/UrlConstraints";

const API_URL=LIBRARY_URL;

class CountryAPI{
    getCountries(){
        return axios.get(`${API_URL}/countries`)
    }
}

export default new CountryAPI();