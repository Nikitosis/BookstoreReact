import React from 'react';
import Header from "./components/Header";
import ClientList from "./components/ClientList";
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
    render() {
        return (
            <div className="App">
                <Header/>
                <ClientList/>
            </div>
        );
    }
}

export default App;
