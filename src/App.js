import React from 'react';
import Header from "./mainComponents/Header";
import ClientList from "./clients/ClientList";
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import BookList from "./books/BookList";
import LoginPage from "./login/LoginPage";
import HomePage from "./home/HomePage";
import {PrivateRoute} from "./utils/PrivateRoute";
import AuthenticationService from "./services/AuthenticationService";
import MyBooksList from "./myBooks/MyBooksList";
import LogoutPage from "./login/LogoutPage";

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <div className="App container-fluid">
                    <Header/>
                    <div className="content-wrapper">
                        <Route path="/books" component={BookList}/>
                        <PrivateRoute path="/logout" component={LogoutPage}/>
                        <PrivateRoute path="/myBooks" component={MyBooksList}/>
                        <PrivateRoute path="/home" component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
