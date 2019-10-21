import React from "react";
import PrivateComponent from "../utils/PrivateComponent";
import styles from "./BookItem.module.css";

const MyBookItem=({book,returnBook,downloadBook})=>{
    let imgUrl=book.photoLink!=null ? book.photoLink : "/bookImage.png";

    return (
        <div className={`${styles.cardWrapper} col-md-4`}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title">{book.name}</h4>
                    <div className={`${styles.bookPhoto}`} style={{backgroundImage: "url("+imgUrl+")"}}></div>
                    <p className="card-text">Some book description. Will be added later on</p>
                    <p className={`${styles.price}`}>Price: <em>{book.price}$</em></p>
                    <div className="row">
                        <PrivateComponent roles={["USER","ADMIN"]}>
                            <button className="btn btn-danger mr-auto" onClick={()=>returnBook(book.id)}>Return book</button>
                        </PrivateComponent>
                        <PrivateComponent roles={["USER","ADMIN"]}>
                            <button className="btn btn-success ml-auto" onClick={()=>downloadBook(book.id)}>Download</button>
                        </PrivateComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookItem;