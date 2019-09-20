import React from "react";

class MyBookItem extends React.Component{


    render() {
        return (
            <tr>
                <td>{this.props.book.id}</td>
                <td>{this.props.book.name}</td>
                <td><button className="btn btn-danger" onClick={()=>this.props.returnBook(this.props.book.id)}>Return book</button></td>
            </tr>
        );
    }
}

export default MyBookItem;