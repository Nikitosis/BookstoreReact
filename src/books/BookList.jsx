import React from "react";
import BookItem from "./BookItem";
import BooksService from "../services/BooksService";
import AuthenticationService from "../services/AuthenticationService";
import Book from "../models/Book";
import styles from "./BookList.module.css";

class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            isLoading:false
        }
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
        BooksService.getAllBooks()
            .then((res)=>{
                let books=res.data.map((book)=> new Book(book.id,book.name,book.taken));
                this.setState({
                    books:books,
                    isLoading:false
                })
            })
            .catch(()=>{
                this.setState({
                    isLoading:true
                });
                console.log("Can't fetch books");
            })
    }

    takeBook=(bookId)=>{
        BooksService.takeBookByUserId(AuthenticationService.getCurrentUser().id,bookId)
            .then(()=>{
                this.fetchBooks();
            })
            .catch(()=>{
            console.log("Cannot take book");
        })
    }

    render() {
        return (
            <div className="container">
                <div className={`${styles.cardList} row`}>
                    {
                        this.state.books
                        .filter((book)=> book.taken==false)
                        .map((book)=>(
                                <BookItem key={book.id} book={book} takeBook={this.takeBook}/>
                                )
                        )
                    }
                </div>
            </div>
        );
    }
}
export default BookList;