import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import AuthenticationService from "../services/AuthenticationService";

class EditProfile extends React.Component{
    constructor(props){
        super(props);

        this.state={
            firstName:props.curUser.fName,
            lastName:props.curUser.lName
        }
    }

    componentWillReceiveProps=(nextProps) =>{
        this.setState({
            firstName: nextProps.curUser.fName,
            lastName: nextProps.curUser.lName
        })
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSave=()=>{
        this.props.onSave(this.state.firstName,this.state.lastName);
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
                            <input type="text" className="form-control" placeholder="First Name" name="firstName" defaultValue={this.state.firstName} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" name="lastName" defaultValue={this.state.lastName} onChange={this.handleChange}/>
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

export default EditProfile;