import React from "react";
import ClientItem from "./ClientItem";

class ClientList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients: []
        }
    }

    updateClients=async()=>{
        const url="http://localhost:9000/clients";
        fetch(url)
            .then(res => res.json())
            .then((data)=>{
                this.setState({clients:data});
            })
            .catch(console.log)
    }

    deleteClient=(clientId)=> {
        const url="http://localhost:9000/clients/"+clientId;
        fetch(url,{method:'DELETE'})
            .catch(console.log)
        this.updateClients();
    };

    componentDidMount() {
        this.interval = setInterval(() => this.updateClients(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    {this.state.clients.map((client)=>(
                    <ClientItem client={client} deleteClient={this.deleteClient}/>
                ))}
                </table>
            </div>
        );
    }
}
export default ClientList;