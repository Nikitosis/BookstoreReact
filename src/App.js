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

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <div className="App container-fluid">
                    <Header/>
                    <div className="content-wrapper">
                        /*<Route path="/clients" component={ClientList}/>
                        <Route path="/books" component={BookList}/>*/
                        <PrivateRoute path="/home" component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
