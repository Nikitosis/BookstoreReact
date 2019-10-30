import React from "react";
import {executeRegistration} from "../redux/reducers/registrationPageReducer";
import connect from "react-redux/lib/connect/connect";

class RegistrationPage extends React.Component{

    constructor(props){
        super(props);
    }

    onInputChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    onRegisterClick=()=>{
        this.props.executeRegistration(
            this.state.fName,
            this.state.lName,
            this.state.username,
            this.state.password,
            this.state.repeatPassword
        )
    }

    render() {
        const usernameValidation=this.props.usernameErrorMessage===null ? "" : "is-invalid";
        const passwordValidation=this.props.passwordErrorMessage===null ? "" : "is-invalid";
        const repeatPasswordValidation=this.props.repeatPasswordErrorMessage===null ? "" : "is-invalid";

        return (
            <div className="container">
                <form>
                    <div className="form-group row">
                        <input type="text" className={`form-control col-md-3`} id={"inputFirstName"} name="fName" placeholder="First Name" onChange={this.onInputChange}/>
                        <div className="col-md-1"></div>
                        <input type="text" className="form-control col-md-3" id={"inputLastName"} name="lName" placeholder="Last Name" onChange={this.onInputChange}/>
                    </div>

                    <div className="form-group row">
                        <label htmlFor={"inputUsername"} className="col-form-label col-md-2">Username</label>
                        <input type="text" className={`form-control col-md-7 ${usernameValidation}`} id={"inputUsername"} name="username" placeholder="Username" onChange={this.onInputChange}/>
                        <small id="usernameHelp" className="text-danger col-md-3">
                            {this.props.usernameErrorMessage}
                        </small>
                    </div>

                    <div className="form-group row">
                        <label htmlFor={"inputPassword"} className="col-form-label col-md-2">Password</label>
                        <input type="password" className={`form-control col-sm-7 ${passwordValidation}`} id={"inputPassword"} name="password" placeholder="Password" onChange={this.onInputChange}/>
                        <small id="passwordHelp" className="text-danger col-md-3">
                            {this.props.passwordErrorMessage}
                        </small>
                    </div>

                    <div className="form-group row">
                        <label htmlFor={"inputRepeatPassword"} className="col-form-label col-md-2">Repeat password</label>
                        <input type="password" className={`form-control col-sm-7 ${repeatPasswordValidation}`} id={"inputRepeatPassword"} name="repeatPassword" placeholder="Repeat password" onChange={this.onInputChange}/>
                        <small id="repeatPasswordHelp" className="text-danger col-md-3">
                            {this.props.repeatPasswordErrorMessage}
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

function mapStateToProps(state){
    return{
        usernameErrorMessage:state.registrationPageReducer.usernameErrorMessage,
        passwordErrorMessage:state.registrationPageReducer.passwordErrorMessage,
        repeatPasswordErrorMessage:state.registrationPageReducer.repeatPasswordErrorMessage
    }
}

function mapDispathToProps(dispatch){
    return{
        executeRegistration:(fName,lName,username,password,repeatPassword)=>dispatch(executeRegistration(fName,lName,username,password,repeatPassword))
    }
}

export default connect(mapStateToProps,mapDispathToProps)(RegistrationPage);