import React from "react";
import BooksService from "../services/BooksService";
import styles from "./BookList.module.css";
import UserBookItem from "./UserBookItem";

class UserBooksList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            books:[],
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
        BooksService.getBooksByUserId(this.props.match.params.userId)
            .then((res)=>{
                const books=res.data;
                this.setState({
                    books:books,
                    isLoading:false
                })
            })
            .catch(()=>{
                console.log("Cannot load books")
                this.setState({
                    isLoading:true
                });
            })
    }

    render() {
        return (
            <div className="container">
                <div className={`${styles.cardList} row`}>
                    {
                        this.state.books
                            .map((book)=>(
                                    <UserBookItem key={book.id} book={book}/>
                                )
                            )
                    }
                </div>
            </div>
        );
    }
}

export default UserBooksList;