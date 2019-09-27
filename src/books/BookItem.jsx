import React from "react";
import PrivateComponent from "../utils/PrivateComponent";
import styles from "./BookItem.module.css";

const BookItem=({book,takeBook,deleteBook})=>{
    return (
        <div className={`${styles.cardWrapper} col-md-4`}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title">{book.name}</h4>
                    <p className="card-text">Some book description. Will be added later on</p>
                    <div className="row">
                        <PrivateComponent roles={["ROLE_USER","ROLE_ADMIN"]}>
                            <button className={`${styles.control_button} btn btn-success col-md-5 mr-auto`} onClick={()=>takeBook(book.id)}>Take</button>
                        </PrivateComponent>
                        <PrivateComponent roles={["ROLE_ADMIN"]}>
                            <button className={`${styles.control_button} btn btn-danger col-md-5 ml-auto`} onClick={()=>deleteBook(book.id)}>Delete</button>
                        </PrivateComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookItem;