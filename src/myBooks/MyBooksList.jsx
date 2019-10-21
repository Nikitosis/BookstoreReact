import React from "react";
import BooksService from "../redux/services/BooksAPI";
import AuthenticationService from "../redux/services/AuthenticationAPI";
import MyBookItem from "./MyBookItem";
import styles from "./BookList.module.css";
import connect from "react-redux/lib/connect/connect";
import {fetchBooks, downloadBookFile, returnBook} from "../redux/reducers/booksReducer";
import {fetchBooksByUserId} from "../redux/reducers/userBooksReducer";

class MyBooksList extends React.Component{

    componentDidMount() {
        this.props.fetchBooks(this.props.curUser.id);
        this.timer=setInterval(()=>this.props.fetchBooks(this.props.curUser.id),5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer=null;
    }

    returnBook=(bookId)=>{
        this.props.returnBook(bookId);
        this.props.fetchBooks(this.props.curUser.id);
    }


    render() {
        return (
            <div className="container">
                <div className={`${styles.cardList} row`}>
                    {
                        this.props.books
                            .map((book)=>(
                                    <MyBookItem key={book.id} book={book} returnBook={this.returnBook} downloadBook={this.props.downloadBook}/>
                                )
                            )
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        books:state.userBooksReducer.books,
        curUser:state.currentUserReducer.user
    }
}

function mapDispatchToProps(dispatch){
    return{
        returnBook:(bookId)=>dispatch(returnBook(bookId)),
        fetchBooks:(userId)=>dispatch(fetchBooksByUserId(userId)),
        downloadBook:(bookId)=>dispatch(downloadBookFile(bookId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyBooksList);