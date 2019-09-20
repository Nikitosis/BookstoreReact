import React from "react";

const BookItem=({book,takeBook})=>{
    return (
        <tr>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td><button className="btn btn-success" onClick={()=>takeBook(book.id)}>Take</button></td>
        </tr>
    );
};

export default BookItem;