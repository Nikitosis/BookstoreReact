import React from "react";
import ClientItem from "./ClientItem";
import CreateClientModal from "./ClientDialog/CreateClientModal";
import Button from "react-bootstrap/Button";

class ClientList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            createModalShow: false,
            updateModalShow: false,
            editedClient:{}
        };

        this.getClients();
    }

    setCreateModalShow=(isShown)=>{
        console.log("Setting createModalShow to"+isShown);
        this.setState({
            createModalShow: isShown
        });
    };

    getClients=async()=>{
        const url="http://localhost:9000/clients";
        console.log("getting clients");
        fetch(url)
            .then(res => res.json())
            .then((data)=>{
                this.setState({clients:data});
            })
            .catch(console.log)
    };

    deleteClient=(clientId)=> {
        const url="http://localhost:9000/clients/"+clientId;
        fetch(url,{method:'DELETE'})
            .then(this.getClients)
            .catch(console.log);
    };

    saveClient=(client)=>{
        const url="http://localhost:9000/clients";

        fetch(url,{
            method:"POST",
            body:JSON.stringify(client),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(this.getClients)
            .then(()=>this.setCreateModalShow(false))
    };

    updateClient=(client)=>{
        const url="http://localhost:9000/clients";
        console.log(JSON.stringify(client));
        fetch(url,{
            method:"PUT",
            body:JSON.stringify(client),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(this.getClients)
    };


    componentDidMount() {
        this.interval = setInterval(() => this.getClients(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        return (
            <div className="container">
                <Button variant="success" onClick={()=>this.setCreateModalShow(true)}>
                    New client
                </Button>

                <table className="table table-striped">
                    <tbody>
                    {this.state.clients.map((client)=>(
                    <ClientItem client={client} deleteClient={this.deleteClient} updateClient={this.updateClient}/>

                    ))}
                    </tbody>
                </table>

                <CreateClientModal show={this.state.createModalShow}
                                   onSave={this.saveClient}
                                   onClose={()=>this.setCreateModalShow(false)}/>


            </div>
        );
    }
}
export default ClientList;