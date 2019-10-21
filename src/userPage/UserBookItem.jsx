import React from "react";
import PrivateComponent from "../utils/PrivateComponent";
import styles from "./BookItem.module.css";

const UserBookItem=({book})=>{
    let imgUrl=book.photoLink!=null ? book.photoLink : "/bookImage.png";

    return (
        <div className={`${styles.cardWrapper} col-md-4`}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title">{book.name}</h4>
                    <div className={`${styles.bookPhoto}`} style={{backgroundImage: "url("+imgUrl+")"}}></div>
                    <p className="card-text">Some book description. Will be added later on</p>
                    <p className={`${styles.price}`}>Price: <em>{book.price}$</em></p>
                </div>
            </div>
        </div>
    );
};

export default UserBookItem;