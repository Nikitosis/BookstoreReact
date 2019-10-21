import React from "react";
import BooksService from "../redux/services/BooksAPI";
import AuthenticationService from "../redux/services/AuthenticationAPI";
import MyBookItem from "./MyBookItem";
import styles from "./BookList.module.css";
import {fetchBooksByUserId, returnBook} from "../redux/reducers/booksReducer";
import connect from "react-redux/lib/connect/connect";

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
                                    <MyBookItem key={book.id} book={book} returnBook={this.returnBook}/>
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
        books:state.booksReducer.books,
        curUser:state.currentUserReducer.user
    }
}

function mapDispatchToProps(dispatch){
    return{
        returnBook:(bookId)=>dispatch(returnBook(bookId)),
        fetchBooks:(userId)=>dispatch(fetchBooksByUserId(userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyBooksList);