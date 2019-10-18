import React from "react";
import UserService from "../redux/services/UserService";

class RegistrationPage extends React.Component{

    constructor(props){
        super(props);

        this.state={
            username:"",
            password:"",
            fName:"",
            lName:"",
            repeatPassword:"",
            usernameHelp:"",
            passwordHelp:"",
            repeatPasswordHelp:"",
        }
    }

    onInputChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    onRegisterClick=()=>{
        let isValid=true;
        this.setState({
            usernameHelp:"",
            passwordHelp:"",
            repeatPasswordHelp:""
        })

        if(!this.state.username.match(/\w{6,}/i)){
            this.setState({
                usernameHelp:"Username have to be at least 6 characters long and contain only letters"
            })
            isValid=false;
        }

        if(!this.state.password.match(/.{6,}/)){
            this.setState({
                passwordHelp:"Password have to be at least 6 characters long"
            })
            isValid=false;
        }

        console.log(this.state.password+" "+this.state.repeatPassword);
        if(this.state.repeatPassword!==this.state.password){
            this.setState({
                repeatPasswordHelp:"Repeated password is not equal to original one"
            })
            isValid=false;
        }

        if(isValid){
            UserService.createUser({
                fName:this.state.fName,
                lName:this.state.lName,
                username:this.state.username,
                password:this.state.password
            })
                .then(()=>{
                    this.props.history.push("/login")
                })
                .catch(()=>{
                    console.log("Couldn't create user")
                })
        }

    }

    render() {
        const usernameValidation=this.state.usernameHelp==="" ? "" : "is-invalid";
        const passwordValidation=this.state.passwordHelp==="" ? "" : "is-invalid";
        const repeatPasswordValidation=this.state.repeatPasswordHelp==="" ? "" : "is-invalid";

        return (
            <div className="container">
                <form>
                    <div className="form-group row">
                        <label htmlFor={"inputUsername"} className="col-form-label col-md-2">Username</label>
                        <input type="text" className={`form-control col-md-3`} id={"inputFirstName"} name="fName" placeholder="First Name" onChange={this.onInputChange}/>
                        <div className="col-md-1"></div>
                        <input type="text" className="form-control col-md-3" id={"inputLastName"} name="lName" placeholder="Last Name" onChange={this.onInputChange}/>
                    </div>

                    <div className="form-group row">
                        <label htmlFor={"inputUsername"} className="col-form-label col-md-2">Username</label>
                        <input type="text" className={`form-control col-md-7 ${usernameValidation}`} id={"inputUsername"} name="username" placeholder="Username" onChange={this.onInputChange}/>
                        <small id="usernameHelp" className="text-danger col-md-3">
                            {this.state.usernameHelp}
                        </small>
                    </div>

                    <div className="form-group row">
                        <label htmlFor={"inputPassword"} className="col-form-label col-md-2">Password</label>
                        <input type="password" className={`form-control col-sm-7 ${passwordValidation}`} id={"inputPassword"} name="password" placeholder="Password" onChange={this.onInputChange}/>
                        <small id="passwordHelp" className="text-danger col-md-3">
                            {this.state.passwordHelp}
                        </small>
                    </div>

                    <div className="form-group row">
                        <label htmlFor={"inputRepeatPassword"} className="col-form-label col-md-2">Repeat password</label>
                        <input type="password" className={`form-control col-sm-7 ${repeatPasswordValidation}`} id={"inputRepeatPassword"} name="repeatPassword" placeholder="Repeat password" onChange={this.onInputChange}/>
                        <small id="repeatPasswordHelp" className="text-danger col-md-3">
                            {this.state.repeatPasswordHelp}
                        </small>
                    </div>
                </form>
                <div className="row">
                    <div className="col-md-5"></div>
                    <button className="btn btn-primary btn-block col-md-4 mr-auto" onClick={this.onRegisterClick}>Register</button>
                </div>
            </div>
        );
    }

}

export default RegistrationPage;