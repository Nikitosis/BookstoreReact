import {Dropdown} from "react-bootstrap";
import React from "react";
import connect from "react-redux/lib/connect/connect";
import UserInfo from "./UserInfo";
import styles from "./UserInfoButton.module.css"
import {NavLink} from "react-router-dom";
import {executeLogout} from "../../../redux/reducers/loginReducer";


const UserInfoButton=(props)=>{
    const onHomeClicked=()=>{

    }

    return (
        <Dropdown>
            <Dropdown.Toggle as={UserInfo}  className="btn-block" style={{backgroundColor:"white",border:"none",color:"black"}}>
                ...
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Header><em className={styles.money}>{props.curUser.money} $</em></Dropdown.Header>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={props.executeLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function mapStateToProps(state){
    return {
        curUser:state.currentUserReducer.user
    }
}

function mapDispatchToProps(dispatch){
    return{
        executeLogout:()=>dispatch(executeLogout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfoButton);