import React from "react";
import {ClipLoader} from "react-spinners";
import styles from "./UserPage.module.css"
import {withRouter} from "react-router-dom";
import connect from "react-redux/lib/connect/connect";
import {fetchUserById} from "../redux/reducers/userPageReducer";
import EditProfile from "../home/EditProfile";

class UserPage extends React.Component{
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId);
    }

    openBooksPage=()=>{
        this.props.history.push("/users/"+this.props.match.params.userId+"/books");
    }

    render() {
        if(this.props.isError){
            return <div className="alert alert-warning">Cannot load user</div>
        }

        if(this.props.isLoading){
            return <ClipLoader loading={true}/>;
        }
        const imgUrl=this.props.curUser.avatarLink==null ? "/userImage.png" : this.props.curUser.avatarLink;

        return (
            <div className={`${styles.content} container`}>
                <div className="row">
                    <div className={`${styles.card} row col-md-11 shadow-lg p-0`}>
                        <div className={`${styles.profilePhoto} col-md-4`} style={{backgroundImage: "url("+imgUrl+")"}}></div>
                        <div className={`${styles.profile__description} col-md-8 row`}>
                            <p className={`${styles.profile__name} col-md-12`}>{this.props.curUser.fName} {this.props.curUser.lName}</p>
                            <p className="col-md-3">Country: </p>
                            <p className="col-md-9">{this.props.curUser.country}</p>

                            <p className="col-md-3">City: </p>
                            <p className="col-md-9">{this.props.curUser.city}</p>

                            <p className="col-md-3">Gender: </p>
                            <p className="col-md-9">{this.props.curUser.gender}</p>

                            <p className="col-md-3">Email: </p>
                            <p className="col-md-7">{this.props.curUser.email}</p>
                            {this.props.curUser.emailVerified &&
                            <p className={"col-md-2 small text-success"}>Verified</p>
                            }
                            {!this.props.curUser.emailVerified &&
                            <p className={"col-md-2 small text-danger"}>Not verified</p>
                            }

                            <p className="col-md-3">Phone: </p>
                            <p className="col-md-9">{this.props.curUser.phone}</p>

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
function mapStateToProps(state){
    return{
        curUser:state.userPageReducer.user,
        isLoading:state.userPageReducer.isLoading,
        isError:state.userPageReducer.isError
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchUser:(userId)=>dispatch(fetchUserById(userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserPage));