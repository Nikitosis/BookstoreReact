import React from "react";
import BookItem from "./BookItem";
import styles from "./BookList.module.css";
import PrivateComponent from "../utils/PrivateComponent";
import {
    closeCreateModalAC, closeEditModalAC,
    closeModalAc, closeStatisticsModalAC,
    openCreateModalAC,
    openEditModalAC,
    openModalAC, showBookStatistics
} from "../redux/reducers/booksPageReducer";
import connect from "react-redux/lib/connect/connect";
import {deleteBook, fetchBooks, saveBook, updateBook} from "../redux/reducers/booksReducer";
import {takeBook} from "../redux/reducers/userBooksReducer";
import BookStatisticsModal from "./BookStatisticsModal";
import BookModal from "./BookModal";

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

    openEdit=(book)=>{
        this.props.openEditModal(book);
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

    updateBook=(name,isbn,price,description,image,file)=>{
        let book={
            id:this.props.curBook.id,
            name:name,
            isbn:isbn,
            price:price,
            description:description
        }
        this.props.updateBook(book,image,file);
    }

    deleteBook=(id)=>{
        this.props.deleteBook(id);
    }

    showBookStatistics=(bookId)=>{
        this.props.showBookStatistics(bookId);
    }

    render() {
        let booksAmount=this.props.books.length;

        return (
            <div className={`${styles.mainWrapper} container d-flex flex-column`}>

                <PrivateComponent roles={["ADMIN"]}>
                    <div className={`${styles.controlButtons} row`}>
                        <button className={`${styles.controlButtons__button} btn btn-primary`} onClick={this.props.openCreateModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </PrivateComponent>

                {booksAmount > 0 &&
                    <div className={`${styles.cardList} row`}>
                        {
                            this.props.books
                                .map((book) => (
                                        <BookItem key={book.id} book={book} takeBook={this.takeBook}
                                                  deleteBook={this.deleteBook}
                                                  openEdit={() => this.openEdit(book)} isTaken={book.taken}
                                                  showBookStatistics={this.showBookStatistics}/>
                                    )
                                )
                        }
                    </div>
                }

                {booksAmount==0 &&
                    <div className={`${styles.noBooksDiv} flex-grow-1`}></div>
                }

                <BookModal onSave={this.saveBook} onClose={this.props.closeCreateModal} show={this.props.isCreateModalOpened}/>
                <BookModal onSave={this.updateBook} onClose={this.props.closeEditModal} show={this.props.isEditModalOpened} book={this.props.curBook}/>
                <BookStatisticsModal onClose={this.props.closeStatisticsModal} show={this.props.isStatisticsModalOpened} statistics={this.props.statistics}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        books:state.booksReducer.books,
        isCreateModalOpened: state.booksPageReducer.isCreateModalOpened,
        isEditModalOpened:state.booksPageReducer.isEditModalOpened,
        isStatisticsModalOpened:state.booksPageReducer.isStatisticsModalOpened,
        statistics:state.booksPageReducer.curBookStatistics,
        curBook:state.booksPageReducer.curBook
    }
}

function mapDispatchToProps(dispatch){
    return{
        openCreateModal:()=>dispatch(openCreateModalAC()),
        closeCreateModal:()=>dispatch(closeCreateModalAC()),
        openEditModal:(book)=>dispatch(openEditModalAC(book)),
        closeEditModal:(book)=>dispatch(closeEditModalAC(book)),
        closeStatisticsModal:()=>dispatch(closeStatisticsModalAC()),
        fetchBooks:()=>dispatch(fetchBooks()),
        takeBook:(bookId)=>dispatch(takeBook(bookId)),
        saveBook:(book,image,file)=>dispatch(saveBook(book,image,file)),
        deleteBook:(bookId)=>dispatch(deleteBook(bookId)),
        updateBook:(book,image,file)=>dispatch(updateBook(book,image,file)),
        showBookStatistics:(bookId)=>dispatch(showBookStatistics(bookId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookList);