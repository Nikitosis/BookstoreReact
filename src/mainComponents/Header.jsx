import React from "react";
import {NavLink} from "react-router-dom";
import PrivateComponent from "../utils/PrivateComponent";

class Header extends React.Component{
    render() {
        return(
            <div className="navbar navbar-expand-md  navbar-light bg-light">
                <ul className="navbar-nav m-auto">
                    <PrivateComponent roles={["ROLE_USER","ROLE_ADMIN"]}>
                        <li className="nav-item"><NavLink to="/logout" className="nav-link">Logout</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent roles={["ROLE_USER","ROLE_ADMIN"]}>
                        <li className="nav-item"><NavLink to="/home" className="nav-link">Home</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent roles={["ROLE_USER","ROLE_ADMIN"]}>
                        <li className="nav-item"><NavLink to="/myBooks" className="nav-link">My books</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent roles={["ROLE_ADMIN"]}>
                        <li className="nav-item"><NavLink to="/users" className="nav-link">Users</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent nonAuthorised={true}>
                        <li className="nav-item"><NavLink to="/registration" className="nav-link">Register</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent nonAuthorised={true}>
                        <li className="nav-item"><NavLink to="/login" className="nav-link">Login</NavLink></li>
                    </PrivateComponent>
                    <li className="nav-item"><NavLink to="/books" className="nav-link">Books</NavLink></li>
                </ul>
            </div>
        )
    }


}

export default Header;