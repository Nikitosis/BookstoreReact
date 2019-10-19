import React from 'react';
import Header from "./mainComponents/Header";
import UserList from "./users/UserList";
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import BookList from "./books/BookList";
import LoginPage from "./authentication/LoginPage";
import HomePage from "./home/HomePage";
import AuthenticationService from "./redux/services/AuthenticationService";
import MyBooksList from "./myBooks/MyBooksList";
import LogoutPage from "./authentication/LogoutPage";
import RegistrationPage from "./authentication/RegistrationPage";
import LogList from "./logs/LogList";
import UserPage from "./userPage/UserPage";
import UserBooksList from "./userPage/UserBooksList";
import PrivateRoute from "./utils/PrivateRoute";
import connect from "react-redux/lib/connect/connect";

function App(props){
    return (
        <BrowserRouter>
            <div className="App container-fluid">
                <Header/>
                <div className="content-wrapper">
                    <Route exact path="/books" currentUser={props.currentUser} component={BookList}/>
                    <PrivateRoute roles={["USER","ADMIN"]} exact path="/logout" currentUser={props.currentUser} component={LogoutPage}/>
                    <PrivateRoute roles={["USER","ADMIN"]} exact path="/myBooks" currentUser={props.currentUser} component={MyBooksList}/>
                    <PrivateRoute roles={["USER","ADMIN"]} exact path="/" currentUser={props.currentUser} component={HomePage}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users" currentUser={props.currentUser} component={UserList}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/logs" currentUser={props.currentUser} component={LogList}/>
                    <PrivateRoute nonAuthorised={true} exact path="/login" currentUser={props.currentUser} component={LoginPage}/>
                    <PrivateRoute nonAuthorised={true} exact path="/registration" currentUser={props.currentUser} component={RegistrationPage}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users/:userId" currentUser={props.currentUser} component={UserPage}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users/:userId/books" currentUser={props.currentUser} component={UserBooksList}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

function mapStateToProps(state){
    debugger;
    return{
        currentUser:state.currentUserReducer.user
    }
}

export default connect(mapStateToProps)(App);
