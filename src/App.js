import React from 'react';
import Header from "./mainComponents/Header/Header";
import UserList from "./users/UserList";
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import BookList from "./books/BookList";
import LoginPage from "./authentication/LoginPage";
import HomePage from "./home/HomePage";
import AuthenticationService from "./redux/services/AuthenticationAPI";
import MyBooksList from "./myBooks/MyBooksList";
import RegistrationPage from "./authentication/RegistrationPage";
import UserPage from "./userPage/UserPage";
import UserBooksList from "./userPage/UserBooksList";
import PrivateRoute from "./utils/PrivateRoute";
import connect from "react-redux/lib/connect/connect";
import EmailVerificationPage from "./authentication/EmailVerificationPage";
import OauthLoginPage from "./authentication/OauthLoginPage";

function App(props){
    return (
        <BrowserRouter>
            <div className="App container-fluid d-flex flex-column">
                <Header/>
                <div className="content-wrapper flex-grow-1">
                    <Route exact path="/books" component={BookList}/>
                    <PrivateRoute roles={["USER","ADMIN"]} exact path="/myBooks"  component={MyBooksList} currentUser={props.currentUser} isLogged={props.isLogged}/>
                    <PrivateRoute roles={["USER","ADMIN"]} exact path="/" component={HomePage} currentUser={props.currentUser} isLogged={props.isLogged}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users" component={UserList} currentUser={props.currentUser} isLogged={props.isLogged}/>
                    <PrivateRoute nonAuthorised={true} exact path="/login" component={LoginPage} currentUser={props.currentUser} isLogged={props.isLogged}/>
                    <Route exact path="/verifyEmail/:token" component={EmailVerificationPage} currentUser={props.currentUser} isLogged={props.isLogged}/>
                    <Route exact path="/oauthLogin" component={OauthLoginPage}/>
                    <PrivateRoute nonAuthorised={true} exact path="/registration" component={RegistrationPage} currentUser={props.currentUser} isLogged={props.isLogged}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users/:userId" component={UserPage} currentUser={props.currentUser} isLogged={props.isLogged}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users/:userId/books" component={UserBooksList} currentUser={props.currentUser} isLogged={props.isLogged}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

function mapStateToProps(state){
    return{
        currentUser:state.currentUserReducer.user,
        isLogged:state.loginReducer.isLogged,
    }
}

export default connect(mapStateToProps)(App);
