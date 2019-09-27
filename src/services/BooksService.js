import axios from "axios";
import AuthenticationService from "./AuthenticationService";
import {LIBRARY_URL} from "../utils/UrlConstraints";

const API_URL=LIBRARY_URL;

class BooksService{
    getAllBooks(){
        return axios.get(`${API_URL}/books`)
    }
    getBooksByUserId(userId){
        return axios.get(`${API_URL}/users/${userId}/books`)

    }
    returnBookByUserId(userId,bookId){
        return axios.delete(`${API_URL}/users/${userId}/books/${bookId}`)
    }
    takeBookByUserId(userId,bookId){
        return axios.put(`${API_URL}/users/${userId}/books/${bookId}`)
    }
}

export default new BooksService();