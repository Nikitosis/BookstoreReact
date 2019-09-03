import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

class ClientDialog extends React.Component{

    firstNameChange =(e)=>{
        this.setState({fName: e.target.value});
    }
    lastNameChange=(e)=>{
        this.setState({lName: e.target.value});
    }

    handleSave=()=>{
        const client=this.state;
        this.props.onSave(client);
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

export default ClientDialog;