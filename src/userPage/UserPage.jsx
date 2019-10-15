import React from "react";
import UserService from "../services/UserService";
import {ClipLoader} from "react-spinners";
import styles from "./UserPage.module.css"
import {withRouter} from "react-router-dom";

class UserPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            curUser:null
        }
    }

    componentDidMount() {
        UserService.getUserInfo(this.props.match.params.userId)
            .then(res=> {
                    const user=res.data;
                    this.setState({
                        curUser:user
                    })
                }
            )
            .catch((e)=>{
                console.log("Cannot load user details"+e);
            })
    }

    openBooksPage=()=>{
        this.props.history.push("/users/"+this.props.match.params.userId+"/books");
    }

    render() {
        if(this.state.curUser==null){
            return <ClipLoader loading={true}/>;
        }
        const imgUrl="/userImage.png";

        return (
            <div className={`${styles.content} container`}>
                <div className="row">
                    <div className={`${styles.card} row col-md-11 shadow-lg p-0`}>
                        <div className={`${styles.profilePhoto} col-md-4`} style={{backgroundImage: "url("+imgUrl+")"}}></div>
                        <div className={`${styles.profile__description} col-md-8 row`}>
                            <p className={`${styles.profile__name} col-md-12`}>{this.state.curUser.fName} {this.state.curUser.lName}</p>
                            <p className="col-md-3">Country: </p>
                            <p className="col-md-9">{this.state.curUser.country}</p>

                            <p className="col-md-3">City: </p>
                            <p className="col-md-9">{this.state.curUser.city}</p>

                        </div>
                    </div>
                    <div className="col-md-1">
                        <button className={`${styles.profile__openBooksButton} btn btn-primary btn-block shadow-lg`} onClick={this.openBooksPage}>
                            <i className="fa fa-book"></i>
                        </button>
                    </div>
                </div>

            </div>

        );
    }
}

export default withRouter(UserPage);