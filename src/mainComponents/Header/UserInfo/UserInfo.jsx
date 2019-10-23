import React from "react";
import connect from "react-redux/lib/connect/connect";
import styles from "./UserInfo.module.css";
import {Dropdown} from "react-bootstrap";
import PrivateComponent from "../../../utils/PrivateComponent";
import {executeLogout} from "../../../redux/reducers/loginReducer";
import {fetchUser} from "../../../redux/reducers/currentUserReducer";


const UserInfo=(props)=>{
    const imgUrl=props.curUser.avatarLink==null ? "/userImage.png" : props.curUser.avatarLink;

    function handleClick(e){
        e.preventDefault();
        props.fetchUser();
        props.onClick(e);
    }

    return (
        <div className={`${styles.wrapper} row`} onClick={handleClick}>
            <div className={`${styles.userImg} col-md-3`} style={{backgroundImage: "url("+imgUrl+")"}}></div>
            <div className="col-md-8 d-flex align-items-center">{props.curUser.fName}</div>
        </div>
    );

}

function mapStateToProps(state){
    return {
        curUser:state.currentUserReducer.user
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchUser:()=>dispatch(fetchUser())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserInfo);
