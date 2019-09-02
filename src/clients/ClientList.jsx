import React from "react";
import ClientItem from "./ClientItem";

class ClientList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients: []
        }
    }

    async updateClients(){
        const url="http://localhost:9000/clients";
        fetch(url)
            .then(res => res.json())
            .then((data)=>{
                this.setState({clients:data});
            })
            .catch(console.log)
    }


    componentDidMount() {
        this.interval = setInterval(() => this.updateClients(), 1000);
        this.updateClients();
    }

    deleteClient(clientId) {
        const url="http://localhost:9000/clients/"+clientId;
        fetch(url,{method:'DELETE'})
            .catch(console.log)
    };



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