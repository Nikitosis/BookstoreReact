import React from "react";

const BookItem=({book,deleteBook})=>{
    return (
        <tr>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td><button className="btn btn-danger" onClick={()=>deleteBook(book.id)}>Delete</button></td>
        </tr>
    );
};

export default BookItem;