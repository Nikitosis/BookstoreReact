import React from "react";
import BookItem from "./BookItem";
import BooksService from "../services/BooksService";

class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: []
        }
        this.updateBooks();
    }

    updateBooks=()=>{
        const url="http://localhost:9000/books";

        this.setState({books:BooksService.getAllBooks()});
    }

    deleteBook=(bookId)=> {
        const url="http://localhost:9000/books/"+bookId;
        fetch(url,{method:'DELETE'})
            .catch(console.log)
        this.updateBooks();
    };

    componentDidMount() {
        this.interval = setInterval(() => this.updateBooks(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    {this.state.books.map((book)=>(
                    <BookItem book={book} deleteBook={this.deleteBook}/>
                ))}
                </table>
            </div>
        );
    }
}
export default BookList;