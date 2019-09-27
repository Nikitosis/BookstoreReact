import React from "react";
import BookItem from "../books/BookItem";
import BooksService from "../services/BooksService";
import AuthenticationService from "../services/AuthenticationService";
import MyBookItem from "./MyBookItem";
import {ClipLoader} from "react-spinners";
import styles from "./BookList.module.css";

class MyBooksList extends React.Component{
    state={
        books:[],
        isLoading:false
    }

    componentDidMount() {
        this.fetchBooks();
        this.timer=setInterval(()=>this.fetchBooks(),5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer=null;
    }

    fetchBooks=()=>{
        BooksService.getBooksByUserId(AuthenticationService.getCurrentUser().id)
            .then((res)=>{
                const books=res.data;
                this.setState({
                    books:books,
                    isLoading:false
                })
            })
            .catch(()=>{
                console.log("Cannot load books")
                this.setState({
                    isLoading:true
                });
            })
    }

    returnBook=(bookId)=>{
        BooksService.returnBookByUserId(AuthenticationService.getCurrentUser().id,bookId)
            .then((res)=>{
                console.log("Book returned: "+bookId);
                this.fetchBooks();
            })
            .catch(()=>{
                console.log("Cannot return book");
            })
    }


    render() {
        return (
            <div className="container">
                <div className={`${styles.cardList} row`}>
                    {
                        this.state.books
                            .map((book)=>(
                                    <MyBookItem key={book.id} book={book} returnBook={this.returnBook}/>
                                )
                            )
                    }
                </div>
            </div>
        );
    }
}

export default MyBooksList;