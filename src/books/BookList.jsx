import React from "react";
import BookItem from "./BookItem";
import BooksService from "../services/BooksService";
import AuthenticationService from "../services/AuthenticationService";
import Book from "../models/Book";
import styles from "./BookList.module.css";
import PrivateComponent from "../utils/PrivateComponent";
import CreateBookDialog from "./CreateBookDialog";

class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            isLoading:false,
            isCreateModalOpened:false
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

    openCreateModal=()=>{
        this.setState({
            isCreateModalOpened:true
        })
    }

    closeCreateModal=()=>{
        this.setState({
            isCreateModalOpened:false
        })
    }

    saveBook=(name)=>{
        let book=new Book(null, name ,null);
        BooksService.saveBook(book)
            .then(res=>{
                this.fetchBooks();
            })
        this.closeCreateModal();
    }

    deleteBook=(id)=>{
        BooksService.deleteBook(id)
            .then(()=>{
                this.fetchBooks();
            })
    }

    render() {
        return (
            <div className="container">

                <PrivateComponent roles={["ROLE_ADMIN"]}>
                    <div className={`${styles.controlButtons} row`}>
                        <button className={`${styles.controlButtons__button} btn btn-primary`} onClick={this.openCreateModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                    <CreateBookDialog onSave={this.saveBook} onClose={this.closeCreateModal} show={this.state.isCreateModalOpened}/>
                </PrivateComponent>

                <div className={`${styles.cardList} row`}>
                    {
                        this.state.books
                        .filter((book)=> book.taken===false)
                        .map((book)=>(
                                <BookItem key={book.id} book={book} takeBook={this.takeBook} deleteBook={this.deleteBook}/>
                                )
                        )
                    }
                </div>
            </div>
        );
    }
}
export default BookList;