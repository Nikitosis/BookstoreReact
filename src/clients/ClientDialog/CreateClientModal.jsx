import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

class CreateClientModal extends React.Component{

    firstNameChange =(e)=>{
        this.setState({firstName: e.target.value});
    }

    lastNameChange=(e)=>{
        this.setState({lastName: e.target.value});
    }

    handleSave=()=>{
        const client={
            fName:this.state.firstName,
            lName:this.state.lastName
        };
        this.props.onSave(client);
    }


    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" onChange={(e)=>this.firstNameChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" onChange={(e)=>this.lastNameChange(e)}/>
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

export default CreateClientModal;