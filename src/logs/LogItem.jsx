import React from "react";

class LogItem extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.log.id}</td>
                <td>{this.props.log.userId}</td>
                <td>{this.props.log.bookId}</td>
                <td>{this.props.log.date}</td>
                <td>{this.props.log.action}</td>
            </tr>
        );
    }
}

export default LogItem;