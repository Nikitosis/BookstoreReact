import React from "react";
import {NavLink} from "react-router-dom";

class Header extends React.Component{
    render() {
        return(
            <div className="navbar navbar-expand-md  navbar-light bg-light">
                <ul className="navbar-nav m-auto">
                    <li className="nav-item"><NavLink to="/clients" className="nav-link">Clients</NavLink></li>
                    <li className="nav-item"><NavLink to="/books" className="nav-link">Books</NavLink></li>
                </ul>
            </div>
        )
    }


}

export default Header;