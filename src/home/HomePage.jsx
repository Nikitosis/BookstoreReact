import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import UserService from "../services/UserService";
import {ClipLoader} from "react-spinners";
import styles from "./HomePage.module.css";
import User from "../models/User";
import EditProfile from "./EditProfile";

class HomePage extends React.Component{

    state={
        curUser:null,
        isModalOpened:false
    }

    componentDidMount() {
        UserService.getUserInfo(AuthenticationService.getCurrentUser().id)
            .then(res=> {
                    const user=res.data;
                    this.setState({
                        curUser:user
                    })
                }
            )
            .catch(()=>{
                console.log("Cannot load user details");
            })
    }

    updateUser=(firstName,lastName)=>{
        let user={
            id:AuthenticationService.getCurrentUser().id,
            fName:firstName,
            lName:lastName
        }
        UserService.updateUser(user)
            .then(res=>{
                const user=res.data;
                this.setState({
                    curUser:user
                })
            })
            .catch((e)=>{
                console.log("Cannot update user");
            })
        this.closeModal();
    }

    closeModal=()=>{
        this.setState({
            isModalOpened:false
        })
    }

    openModal=()=>{
        this.setState({
            isModalOpened:true
        })
    }


    render() {
        if(this.state.curUser==null){
            return <ClipLoader loading={true}/>;
        }
        const imgUrl="https://cutt.ly/dwM90Np";

        return (
            <div className={`${styles.content} container`}>
                <div className="row">
                    <div className={`${styles.card} row col-md-11 shadow-lg p-0`}>
                        <div className={`${styles.profilePhoto} col-md-4`} style={{backgroundImage: "url("+imgUrl+")"}}></div>
                        <div className={`${styles.profile__description} col-md-8 row`}>
                            <p className={`${styles.profile__name} col-md-12`}>{this.state.curUser.fName} {this.state.curUser.lName}</p>
                            <p className="col-md-3">Country: </p>
                            <p className="col-md-9">United stetes</p>

                            <p className="col-md-3">City: </p>
                            <p className="col-md-9">Arizena</p>

                            <p className="col-md-3">Description: </p>
                            <p className="col-md-9">My name is Name and last name is Surname</p>

                        </div>
                    </div>
                    <div className="col-md-1">
                        <button className={`${styles.profile__editButton} btn btn-primary btn-block shadow-lg`} onClick={this.openModal}>
                            <i className="fa fa-edit"></i>
                        </button>
                    </div>
                </div>

                <EditProfile curUser={this.state.curUser} onSave={this.updateUser} onClose={this.closeModal} show={this.state.isModalOpened}/>
            </div>

        );
    }
}

export default HomePage;