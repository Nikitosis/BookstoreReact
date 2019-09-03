import React from "react";
import ClientItem from "./ClientItem";
import ClientDialog from "./ClientDialog/ClientDialog";
import Button from "react-bootstrap/Button";

class ClientList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            modalShow: false
        };

        this.getClients();
    }

    setModalShow=(isShown)=>{
        console.log("Setting modalShow to"+isShown);
        this.setState({
            modalShow: isShown
        });
    };

    getClients=async()=>{
        const url="http://localhost:9000/clients";
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
        console.log(JSON.stringify(client));

        fetch(url,{
            method:"POST",
            body:JSON.stringify(client),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(this.getClients)
            .then(()=>this.setModalShow(false))
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
                <table className="table table-striped">
                    {this.state.clients.map((client)=>(
                    <ClientItem client={client} deleteClient={this.deleteClient}/>
                ))}
                </table>

                <Button variant="success" onClick={()=>this.setModalShow(true)}>
                    New client
                </Button>
                <ClientDialog title="New client"
                              show={this.state.modalShow}
                              onSave={this.saveClient}
                              onClose={()=>this.setModalShow(false)}/>
            </div>
        );
    }
}
export default ClientList;