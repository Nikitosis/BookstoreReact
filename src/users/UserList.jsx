import React from "react";
import UserItem from "./UserItem";
import UserService from "../services/UserService";

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
        this.timer=setInterval(()=>this.fetchUsers(),5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
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