import React from "react";
import {NavLink} from "react-router-dom";
import PrivateComponent from "../utils/PrivateComponent";

class Header extends React.Component{
    render() {
        return(
            <div className="navbar navbar-expand-md  navbar-light bg-light">
                <ul className="navbar-nav m-auto">
                    <PrivateComponent>
                        <li className="nav-item"><NavLink to="/logout" className="nav-link">Logout</NavLink></li>
                    </PrivateComponent>
                    <PrivateComponent roles={["ROLE_USER"]}>
                        <li className="nav-item"><NavLink to="/myBooks" className="nav-link">My books</NavLink></li>
                    </PrivateComponent>
                    <li className="nav-item"><NavLink to="/clients" className="nav-link">Clients</NavLink></li>
                    <li className="nav-item"><NavLink to="/books" className="nav-link">Books</NavLink></li>
                </ul>
            </div>
        )
    }


}

export default Header;