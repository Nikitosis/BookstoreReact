import React from "react";
import styles from "./BookList.module.css";
import connect from "react-redux/lib/connect/connect";
import UserBookItem from "./UserBookItem";
import {fetchBooksByUserId} from "../redux/reducers/userBooksReducer";

class UserBooksList extends React.Component{

    componentDidMount() {
        this.props.fetchBooks(this.props.match.params.userId);
        this.timer=setInterval(()=>this.props.fetchBooks(this.props.match.params.userId),5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer=null;
    }


    render() {
        if(this.props.isError){
            return <div className="alert alert-warning">Cannot load user's books</div>
        }
        let booksAmount=this.props.books.length;

        return (
            <div className={`${styles.mainWrapper} container d-flex flex-column`}>
                {booksAmount > 0 &&
                    <div className={`${styles.cardList} row`}>
                        {
                            this.props.books
                                .map((book) => (
                                        <UserBookItem key={book.id} book={book}/>
                                    )
                                )
                        }
                    </div>
                }

                {booksAmount ==0 &&
                    <div className={`${styles.noBooksDiv} flex-grow-1`}></div>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        books:state.userBooksReducer.books,
        curUser:state.userPageReducer.user,
        isError:state.userBooksReducer.isError
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchBooks:(userId)=>dispatch(fetchBooksByUserId(userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserBooksList);