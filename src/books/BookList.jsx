import React from "react";
import BookItem from "./BookItem";
import BooksService from "../services/BooksService";
import AuthenticationService from "../services/AuthenticationService";
import Book from "../models/Book";

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
                <table className="table table-striped">
                    <tbody>
                        {
                            this.state.books
                            .filter((book)=> book.taken==false)
                            .map((book)=>(
                                    <BookItem key={book.id} book={book} takeBook={this.takeBook}/>
                                    )
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default BookList;