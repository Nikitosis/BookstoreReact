import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import BooksService from "../services/BooksService";
class LoginPage extends React.Component{

    constructor(props){
        super(props)

        this.state={
            username:"",
            password:"",
            hasLoginFailed:false
        }
    }

    onInputChange =(event)=>{
        this.setState({
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked=()=>{
        AuthenticationService.executeAuthentication(this.state.username,this.state.password)
            .then((response)=>{
                console.log("Authenticated");
                AuthenticationService.registerSuccessfulLogin(this.state.username,response.headers.authorization);
                this.props.history.push("/home");
            })
            .catch(()=>{
                console.log("Not Authenticated");
            })
    }

    getBooksClicked=()=>{
        BooksService.getAllBooks()
            .then((result)=>{
                console.log(result);
            })
    }

    render() {
        return (
          <div className="container">
              <div className="row">
                  <div className="col-md-6 m-auto">
                      {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                      <input type="text" name="username" placeholder="username" className="form-control" value={this.state.username} onChange={this.onInputChange}/>
                      <input type="text" name="password" placeholder="password" className="form-control" value={this.state.password} onChange={this.onInputChange}/>
                      <button className="btn btn-primary btn-block" name="loginButton" onClick={this.loginClicked}>Sign in</button>
                      <button className="btn btn-primary btn-block" name="loginButton" onClick={this.getBooksClicked}>get books</button>
                  </div>
              </div>
          </div>
        );
    }
}

export default LoginPage;