import React from 'react';
import Header from "./mainComponents/Header";
import UserList from "./users/UserList";
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import BookList from "./books/BookList";
import LoginPage from "./authentication/LoginPage";
import HomePage from "./home/HomePage";
import {PrivateRoute} from "./utils/PrivateRoute";
import AuthenticationService from "./services/AuthenticationService";
import MyBooksList from "./myBooks/MyBooksList";
import LogoutPage from "./authentication/LogoutPage";
import RegistrationPage from "./authentication/RegistrationPage";
import LogList from "./logs/LogList";
import UserPage from "./userPage/UserPage";
import UserBooksList from "./userPage/UserBooksList";

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <div className="App container-fluid">
                    <Header/>
                    <div className="content-wrapper">
                        <Route exact path="/books" component={BookList}/>
                        <PrivateRoute roles={["ROLE_USER","ROLE_ADMIN"]} exact path="/logout" component={LogoutPage}/>
                        <PrivateRoute roles={["ROLE_USER","ROLE_ADMIN"]} exact path="/myBooks" component={MyBooksList}/>
                        <PrivateRoute roles={["ROLE_USER","ROLE_ADMIN"]} exact path="/home" component={HomePage}/>
                        <PrivateRoute roles={["ROLE_ADMIN"]} exact path="/users" component={UserList}/>
                        <PrivateRoute roles={["ROLE_ADMIN"]} exact path="/logs" component={LogList}/>
                        <PrivateRoute nonAuthorised={true} exact path="/login" component={LoginPage}/>
                        <PrivateRoute nonAuthorised={true} exact path="/registration" component={RegistrationPage}/>
                        <PrivateRoute roles={["ROLE_ADMIN"]} exact path="/users/:userId" component={UserPage}/>
                        <PrivateRoute roles={["ROLE_ADMIN"]} exact path="/users/:userId/books" component={UserBooksList}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
