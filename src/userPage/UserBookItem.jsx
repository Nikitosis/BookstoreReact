import React from "react";
import PrivateComponent from "../utils/PrivateComponent";
import styles from "./BookItem.module.css";

const UserBookItem=({book})=>{
        return (
            <div className={`${styles.cardWrapper} col-md-4`}>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title">{book.name}</h4>
                        <p className="card-text">Some book description. Will be added later on</p>
                    </div>
                </div>
            </div>
        );
    };

export default UserBookItem;