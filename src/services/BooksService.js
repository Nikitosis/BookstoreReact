import axios from "axios";

const API_URL="http://localhost:9000";

class BooksService{
    getAllBooks(){
        return axios.get(`${API_URL}/books`);
    }
}

export default new BooksService();