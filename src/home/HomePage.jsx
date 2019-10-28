import React from "react";
import {ClipLoader} from "react-spinners";
import styles from "./HomePage.module.css";
import EditProfile from "./EditProfile";
import connect from "react-redux/lib/connect/connect";
import {
    depositMoney,
    fetchUser,
    updateUser,
} from "../redux/reducers/currentUserReducer";
import {closeDepositModal, closeEditModal, openDepositModal, openEditModal} from "../redux/reducers/homePageReducer";
import DepositModal from "./DepositModal";

class HomePage extends React.Component{
    componentDidMount() {
        this.props.fetchUser();
        this.timer=setInterval(()=>this.props.fetchUser(),5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer=null;
    }

    render() {
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
                        <button className={`${styles.profile__editButton} btn btn-primary btn-block shadow-lg`} onClick={this.props.openEditModal}>
                            <i className="fa fa-edit"></i>
                        </button>
                        <button className={`${styles.profile__depositButton} btn btn-success btn-block shadow-lg`} onClick={this.props.openDepositModal}>
                            <i className="fa fa-dollar"></i>
                        </button>
                    </div>
                </div>

                <EditProfile curUser={this.props.curUser} onSave={this.props.updateUser} onClose={this.props.closeEditModal} show={this.props.isEditModalOpened}/>
                <DepositModal onSave={this.props.depositMoney} onClose={this.props.closeDepositModal} show={this.props.isDepositModalOpened}/>
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        curUser: state.currentUserReducer.user,
        isLoading:state.currentUserReducer.isLoading,
        isEditModalOpened:state.homePageReducer.isEditModalOpened,
        isDepositModalOpened:state.homePageReducer.isDepositModalOpened,
        error:state.currentUserReducer.error
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchUser: ()=>dispatch(fetchUser()),
        updateUser:(firstName,lastName,country,city,gender,email,phone,avatar)=>dispatch(updateUser(firstName,lastName,country,city,gender,email,phone,avatar)),
        openEditModal:()=>dispatch(openEditModal()),
        closeEditModal:()=>dispatch(closeEditModal()),
        depositMoney:(money)=>dispatch(depositMoney(money)),
        closeDepositModal:()=>dispatch(closeDepositModal()),
        openDepositModal:()=>dispatch(openDepositModal())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)