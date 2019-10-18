import React from "react";
import {NavLink} from "react-router-dom";
import PrivateComponent from "../utils/PrivateComponent";

class Header extends React.Component{
    render() {
        return(
            <div className="navbar navbar-expand-md  navbar-light bg-light">
                <ul className="navbar-nav m-auto">
                    <PrivateComponent roles={["USER","ADMIN"]}>
                        <li className="nav-item"><NavLink to="/logout" className="nav-link">Logout</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent roles={["USER","ADMIN"]}>
                        <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent roles={["USER","ADMIN"]}>
                        <li className="nav-item"><NavLink to="/myBooks" className="nav-link">My books</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent roles={["ADMIN"]}>
                        <li className="nav-item"><NavLink to="/users" className="nav-link">Users</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent roles={["ADMIN"]}>
                        <li className="nav-item"><NavLink to="/logs" className="nav-link">Logs</NavLink></li>
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