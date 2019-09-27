import React from "react";

class UserItem extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td><h5>{this.props.user.fName} {this.props.user.lName}</h5></td>
            </tr>
        );
    }
};

export default UserItem;