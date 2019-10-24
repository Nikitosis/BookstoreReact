import React from "react";
import {withRouter} from "react-router-dom";
import styles from "./UserItem.module.css";

class UserItem extends React.Component{
    constructor(props){
        super(props);
    }

    onRowClick=()=>{
        this.props.history.push("/users/"+this.props.user.id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td><h5>
                    <span className={`${styles.clickable}`} onClick={this.onRowClick}>{this.props.user.fName} {this.props.user.lName}</span>
                </h5></td>
            </tr>
        );
    }
};

export default withRouter(UserItem);