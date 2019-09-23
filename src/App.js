import React from 'react';
import Header from "./mainComponents/Header";
import ClientList from "./clients/ClientList";
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

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <div className="App container-fluid">
                    <Header/>
                    <div className="content-wrapper">
                        <Route path="/books" component={BookList}/>
                        <PrivateRoute roles={["ROLE_USER","ROLE_ADMIN"]} path="/logout" component={LogoutPage}/>
                        <PrivateRoute roles={["ROLE_USER","ROLE_ADMIN"]} path="/myBooks" component={MyBooksList}/>
                        <PrivateRoute roles={["ROLE_USER","ROLE_ADMIN"]} path="/home" component={HomePage}/>
                        <PrivateRoute nonAuthorised={true} path="/login" component={LoginPage}/>
                        <PrivateRoute nonAuthorised={true} path="/registration" component={RegistrationPage}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
