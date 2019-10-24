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

function App(props){
    return (
        <BrowserRouter>
            <div className="App container-fluid">
                <Header/>
                <div className="content-wrapper">
                    <Route exact path="/books" component={BookList}/>
                    <PrivateRoute roles={["USER","ADMIN"]} exact path="/myBooks"  component={MyBooksList}/>
                    <PrivateRoute roles={["USER","ADMIN"]} exact path="/" component={HomePage}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users" component={UserList}/>
                    <PrivateRoute nonAuthorised={true} exact path="/login" component={LoginPage}/>
                    <Route exact path="/verifyEmail/:token" component={EmailVerificationPage}/>
                    <PrivateRoute nonAuthorised={true} exact path="/registration" component={RegistrationPage}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users/:userId" component={UserPage}/>
                    <PrivateRoute roles={["ADMIN"]} exact path="/users/:userId/books" component={UserBooksList}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
