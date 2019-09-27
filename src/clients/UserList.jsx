import React from "react";
import UserItem from "./UserItem";
import Button from "react-bootstrap/Button";
import BooksService from "../services/BooksService";
import Book from "../models/Book";
import UserService from "../services/UserService";
import User from "../models/User";

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
        };
    }

    fetchUsers=()=>{
        UserService.getAll()
            .then((res)=>{
                let users=res.data.map((user)=> {
                    return {
                        id:user.id,
                        username:user.username,
                        fName:user.fName,
                        lName:user.lName,
                        roles:user.roles
                    }
                });
                this.setState({
                    users:users,
                })
            })
            .catch(()=>{
                console.log("Can't fetch users");
            })
    };

    componentDidMount() {
        this.fetchUsers();
        this.timer = setInterval(() => this.fetchUsers(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.timer=null;
    }

    render() {

        return (
            <div className="container">
                <table className="table table-striped">
                    <tbody>
                    {this.state.users.map((user)=>(
                        <UserItem key={user.id} user={user}/>

                    ))}
                    </tbody>
                </table>

            </div>
        );
    }
}
export default UserList;