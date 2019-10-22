import React from "react";
import BookItem from "./BookItem";
import styles from "./BookList.module.css";
import PrivateComponent from "../utils/PrivateComponent";
import CreateBookDialog from "./CreateBookDialog";
import {closeModalAc, openModalAC} from "../redux/reducers/booksPageReducer";
import connect from "react-redux/lib/connect/connect";
import {deleteBook, fetchBooks, saveBook} from "../redux/reducers/booksReducer";
import {takeBook} from "../redux/reducers/userBooksReducer";

class BookList extends React.Component{
    componentDidMount() {
        this.props.fetchBooks();
        this.timer=setInterval(()=>this.props.fetchBooks(),5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer=null;
    }

    takeBook=(bookId)=>{
        this.props.takeBook(bookId);
    }

    saveBook=(name,isbn,price,description,image,file)=>{
        let book={
            name:name,
            isbn:isbn,
            price:price,
            description:description
        }
        this.props.saveBook(book,image,file);
    }

    deleteBook=(id)=>{
        this.props.deleteBook(id);
    }

    render() {
        return (
            <div className="container">

                <PrivateComponent roles={["ADMIN"]}>
                    <div className={`${styles.controlButtons} row`}>
                        <button className={`${styles.controlButtons__button} btn btn-primary`} onClick={this.props.openCreateModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                    <CreateBookDialog onSave={this.saveBook} onClose={this.props.closeCreateModal} show={this.props.isCreateModalOpened} curBook={{}}/>
                </PrivateComponent>

                <div className={`${styles.cardList} row`}>
                    {
                        this.props.books
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

function mapStateToProps(state){
    return {
        books:state.booksReducer.books,
        isCreateModalOpened: state.booksPageReducer.isModalOpened
    }
}

function mapDispatchToProps(dispatch){
    return{
        openCreateModal:()=>dispatch(openModalAC()),
        closeCreateModal:()=>dispatch(closeModalAc()),
        fetchBooks:()=>dispatch(fetchBooks()),
        takeBook:(bookId)=>dispatch(takeBook(bookId)),
        saveBook:(book,image,file)=>dispatch(saveBook(book,image,file)),
        deleteBook:(bookId)=>dispatch(deleteBook(bookId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookList);