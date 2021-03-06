import React from "react";
import MyBookItem from "./MyBookItem";
import styles from "./BookList.module.css";
import connect from "react-redux/lib/connect/connect";
import {downloadBookFile, fetchBooksByUserId, returnBook} from "../redux/reducers/userBooksReducer";
import {fetchBooks} from "../redux/reducers/booksReducer";

class MyBooksList extends React.Component{

    componentDidMount() {
        this.props.fetchBooks();
        this.timer=setInterval(()=>this.props.fetchBooks(),5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer=null;
    }

    returnBook=(bookId)=>{
        this.props.returnBook(bookId);
    }


    render() {
        let booksAmount=this.props.books.filter((book) => book.taken).length;

        return (
            <div className={`${styles.mainWrapper} container d-flex flex-column`}>
                {booksAmount > 0 &&
                    <div className={`${styles.cardList} row`}>
                        {
                            this.props.books
                                .filter((book) => book.taken)
                                .map((book) => (
                                        <MyBookItem key={book.id} book={book} returnBook={this.returnBook}
                                                    downloadBook={this.props.downloadBook}
                                                    isDownloading={this.props.downloadingBookIds.some(id => id === book.id)}/>
                                    )
                                )
                        }
                    </div>
                }

                {booksAmount==0 &&
                    <div className={`${styles.noBooksDiv} flex-grow-1`}></div>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        books:state.booksReducer.books,
        curUser:state.currentUserReducer.user,
        downloadingBookIds: state.myBooksPageReducer.downloadingBookIds
    }
}

function mapDispatchToProps(dispatch){
    return{
        returnBook:(bookId)=>dispatch(returnBook(bookId)),
        fetchBooks:()=>dispatch(fetchBooks()),
        downloadBook:(bookId)=>dispatch(downloadBookFile(bookId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyBooksList);