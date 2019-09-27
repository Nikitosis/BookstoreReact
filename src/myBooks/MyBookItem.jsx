import React from "react";
import PrivateComponent from "../utils/PrivateComponent";
import styles from "./BookItem.module.css";

const MyBookItem=({book,returnBook})=>{
        return (
            <div className={`${styles.cardWrapper} col-md-4`}>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title">{book.name}</h4>
                        <p className="card-text">Some book description. Will be added later on</p>
                        <PrivateComponent roles={["ROLE_USER","ROLE_ADMIN"]}>
                            <td><button className="btn btn-danger" onClick={()=>returnBook(book.id)}>Return book</button></td>
                        </PrivateComponent>
                    </div>
                </div>
            </div>
        );
    };

export default MyBookItem;