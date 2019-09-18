import React from "react";
import AuthenticationService from "../services/AuthenticationService";

class HomePage extends React.Component{


    render() {
        return (
            <div>
                <h1>Welcome, {AuthenticationService.getCurrentUser().username}</h1>
            </div>
        );
    }
}

export default HomePage;