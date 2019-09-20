import axios from "axios";

const API_URL="http://localhost:9000";

class BooksService{
    getAllBooks(){
        return axios.get(`${API_URL}/books`);
    }
    getBooksByUserId(userId){
        return axios.get(`${API_URL}/users/${userId}/books`);
    }
    returnBookByUserId(userId,bookId){
        return axios.delete(`${API_URL}/users/${userId}/books`,{
            params:{
                "bookId":bookId
            }
        })
    }
    takeBookByUserId(userId,bookId){
        return axios.put(`${API_URL}/users/${userId}/books`,{},{
            params:{
                "bookId":bookId
            }
        })
    }
}

export default new BooksService();