import React from "react";
import BookItem from "./BookItem";

class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: []
        }
    }

    async updateBooks(){
        const url="http://localhost:9000/books";
        fetch(url)
            .then(res => res.json())
            .then((data)=>{
                this.setState({books:data});
            })
            .catch(console.log)
    }


    componentDidMount() {
        this.interval = setInterval(() => this.updateBooks(), 1000);
        this.updateBooks();
    }

    deleteBook(bookId) {
        const url="http://localhost:9000/books/"+bookId;
        fetch(url,{method:'DELETE'})
            .catch(console.log)
    };



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