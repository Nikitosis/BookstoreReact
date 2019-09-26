import axios from "axios";
import AuthenticationService from "./AuthenticationService";

const API_URL="http://localhost:9000";

class BooksService{
    getAllBooks(){
        return axios.get(`${API_URL}/books`)
            .catch(reason => {
                if(reason.response.status==401){
                    console.log("unauthorised, loggint out...");
                    AuthenticationService.executeLogout();
                }
            })
    }
    getBooksByUserId(userId){
        return axios.get(`${API_URL}/users/${userId}/books`)
            .catch(reason => {
                if(reason.response.status==401){
                    console.log("unauthorised, loggint out...");
                    AuthenticationService.executeLogout();
                }
            })

    }
    returnBookByUserId(userId,bookId){
        return axios.delete(`${API_URL}/users/${userId}/books/${bookId}`)
            .catch(reason => {
                if(reason.response.status==401){
                    console.log("unauthorised, loggint out...");
                    AuthenticationService.executeLogout();
                }
            })
    }
    takeBookByUserId(userId,bookId){
        return axios.put(`${API_URL}/users/${userId}/books/${bookId}`)
            .catch(reason => {
                if(reason.response.status==401){
                    console.log("unauthorised, loggint out...");
                    AuthenticationService.executeLogout();
                }
            })
    }
}

export default new BooksService();