import axios from "axios";
import {LIBRARY_URL} from "../../utils/UrlConstraints";

const API_URL=LIBRARY_URL;

class BooksAPI{
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

    getFileBook(userId,bookId){
        return axios.get(`${API_URL}/users/${userId}/books/${bookId}`)
    }

    saveBook(book,image,file){
        let bookInfoJson=JSON.stringify(book);
        let bookInfo=new Blob([bookInfoJson],{
            type:'application/json'
        });
        let formData=new FormData();
        formData.append('bookInfo',bookInfo);
        formData.append("image",image);
        formData.append("file",file);

        return axios.post(`${API_URL}/books`,
            formData,
            {
                headers:{
                    'content-type': 'multipart/form-data'
                }
            })
    }

    deleteBook(id){
        return axios.delete(`${API_URL}/books/${id}`)
    }
}

export default new BooksAPI();