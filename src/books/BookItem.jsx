import React from "react";
import PrivateComponent from "../utils/PrivateComponent";
import styles from "./BookItem.module.css";
import {Dropdown} from "react-bootstrap";

const CustomButton=(props)=>{
    function handleClick(e){
        e.preventDefault();
        props.onClick(e);
    }
    return (
        <button className={"btn btn-block"} onClick={handleClick}><i className="fa fa-ellipsis-h"></i></button>
    );
}

const BookItem=({book,takeBook,deleteBook,openEdit,isTaken,showBookStatistics})=>{
    let imgUrl=book.photoLink!=null ? book.photoLink : "/bookImage.png";

    return (
        <div className={`${styles.cardWrapper} col-md-4`}>
            <div className={`card shadow-sm ${isTaken ? styles.takenCard : ""}`}>
                <div className="card-body">
                    <h4 className="card-title">{book.name}</h4>
                    <div className={`${styles.bookPhoto}`} style={{backgroundImage: "url("+imgUrl+")"}}></div>
                    <p className="card-text">{book.description}</p>
                    <p className={`${styles.price}`}>Price: <em>{book.price}$</em></p>
                    <Dropdown>
                        <Dropdown.Toggle as={CustomButton} className="btn-block" style={{backgroundColor:"white",border:"none",color:"black"}}>
                            ...
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <PrivateComponent roles={["USER","ADMIN"]}>
                                <Dropdown.Item onClick={()=>takeBook(book.id)}>Take</Dropdown.Item>
                            </PrivateComponent>
                            <PrivateComponent roles={["ADMIN"]}>
                                <Dropdown.Item onClick={()=>deleteBook(book.id)}>Delete</Dropdown.Item>
                            </PrivateComponent>
                            <PrivateComponent roles={["ADMIN"]}>
                                <Dropdown.Item onClick={openEdit}>Edit</Dropdown.Item>
                            </PrivateComponent>
                            <PrivateComponent roles={["ADMIN"]}>
                                <Dropdown.Item onClick={()=>showBookStatistics(book.id)}>Statistics</Dropdown.Item>
                            </PrivateComponent>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default BookItem;