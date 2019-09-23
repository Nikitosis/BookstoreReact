import React from "react";
import PrivateComponent from "../utils/PrivateComponent";

const BookItem=({book,takeBook})=>{
    return (
        <tr>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <PrivateComponent roles={["ROLE_USER","ROLE_ADMIN"]}>
                <td><button className="btn btn-success" onClick={()=>takeBook(book.id)}>Take</button></td>
            </PrivateComponent>
        </tr>
    );
};

export default BookItem;