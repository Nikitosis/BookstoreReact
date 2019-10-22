import React from "react";
import UserItem from "./UserItem";
import {fetchUsers} from "../redux/reducers/userListPageReducer";
import connect from "react-redux/lib/connect/connect";

class UserList extends React.Component{

    componentDidMount() {
        this.props.fetchUsers();
        this.timer=setInterval(()=>this.props.fetchUsers(),5000);
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
                    {this.props.users.map((user)=>(
                        <UserItem key={user.id} user={user}/>

                    ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        users:state.userListPageReducer.users
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchUsers:()=>dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList);