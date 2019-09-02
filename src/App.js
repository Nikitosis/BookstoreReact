import React from 'react';
import Header from "./mainComponents/Header";
import ClientList from "./clients/ClientList";
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import BookList from "./books/BookList";

class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <div className="App container-fluid">
                    <Header/>
                    <div className="content-wrapper">
                        <Route path="/clients" component={ClientList}/>
                        <Route path="/books" component={BookList}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
