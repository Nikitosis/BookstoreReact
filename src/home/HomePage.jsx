import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import UserService from "../services/UserService";
import {ClipLoader} from "react-spinners";

class HomePage extends React.Component{

    state={
        curUser:null
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


    render() {
        if(this.state.curUser==null){
            return <ClipLoader loading={true}/>;
        }

        return (
            <div>
                <h1>Welcome, {this.state.curUser.username}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">First name:</div>
                        {this.state.curUser && <div className="col-md-8">{this.state.curUser.fName}</div>}
                        <div className="col-md-4">Last name:</div>
                        {this.state.curUser && <div className="col-md-8">{this.state.curUser.lName}</div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;