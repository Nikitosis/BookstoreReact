import React from "react";
import PrivateComponent from "../utils/PrivateComponent";
import styles from "./BookItem.module.css";

const BookItem=({book,takeBook,deleteBook})=>{
    let imgUrl=book.photoLink!=null ? book.photoLink : "/bookImage.png";

    return (
        <div className={`${styles.cardWrapper} col-md-4`}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title">{book.name}</h4>
                    <div className={`${styles.bookPhoto}`} style={{backgroundImage: "url("+imgUrl+")"}}></div>
                    <p className="card-text">{book.description}</p>
                    <p className={`${styles.price}`}>Price: <em>{book.price}$</em></p>
                    <div className="row">
                        <PrivateComponent roles={["USER","ADMIN"]}>
                            <button className={`${styles.control_button} btn btn-success col-md-5 mr-auto`} onClick={()=>takeBook(book.id)}>Take</button>
                        </PrivateComponent>
                        <PrivateComponent roles={["ADMIN"]}>
                            <button className={`${styles.control_button} btn btn-danger col-md-5 ml-auto`} onClick={()=>deleteBook(book.id)}>Delete</button>
                        </PrivateComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookItem;