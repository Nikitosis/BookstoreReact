import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

class UpdateClientModal extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            id: props.clientId,
            firstName: props.firstName,
            lastName: props.lastName
        };
    }

    firstNameChange =(e)=>{
        this.setState({firstName: e.target.value});
    }

    lastNameChange=(e)=>{
        this.setState({lastName: e.target.value});
    }

    handleSave=()=>{
        const client={
            id: this.state.id,
            fName: this.state.firstName,
            lName: this.state.lastName
        };
        this.props.onSave(client);
        this.props.onClose();
    }


    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" defaultValue={this.state.firstName} onChange={(e)=>this.firstNameChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" defaultValue={this.state.lastName} onChange={(e)=>this.lastNameChange(e)}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UpdateClientModal;