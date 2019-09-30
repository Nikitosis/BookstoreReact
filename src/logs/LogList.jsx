import React from "react";
import LogService from "../services/LogService";
import UserItem from "../users/UserItem";
import LogItem from "./LogItem";

class LogList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            logs:[]
        }
    }

    componentDidMount() {
        this.fetchLogs();
        this.timer=setInterval(()=>this.fetchLogs(),5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer=null;
    }

    fetchLogs=()=>{
        LogService.getLogs()
            .then(res=>{
                let logs=res.data.map((log)=>{
                    return{
                        id:log.id,
                        userId:log.userId,
                        bookId:log.bookId,
                        date:log.date,
                        action:log.action
                    }
                })
                this.setState({
                    logs:logs
                })
            })
            .catch(()=>{
                console.log("Cannot fatch logs");
            })
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <tbody>
                    {this.state.logs.map((log)=>(
                        <LogItem key={log.id} log={log}/>
                    ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default LogList;