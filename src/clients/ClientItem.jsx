import React from "react";
import UpdateClientModal from "./ClientDialog/UpdateClientModal";

class ClientItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            updateModalShow:false
        }
    }

    setUpdateModalShow(isShown) {
        this.setState({
            updateModalShow: isShown
        })
    };



    render() {
        return (
            <tr>
                <td>{this.props.client.id}</td>
                <td>{this.props.client.fName}</td>
                <td>{this.props.client.lName}</td>
                <td><button className="btn btn-danger" onClick={()=>this.props.deleteClient(this.props.client.id)}>Delete</button></td>
                <td><button className="btn btn-primary" onClick={()=>this.setUpdateModalShow(true)}>Change</button></td>
                <UpdateClientModal show={this.state.updateModalShow}
                                   onSave={this.props.updateClient}
                                   onClose={()=>this.setUpdateModalShow(false)}
                                   clientId={this.props.client.id}
                                   firstName={this.props.client.fName}
                                   lastName={this.props.client.lName}/>
            </tr>
        );
    }

};

export default ClientItem;