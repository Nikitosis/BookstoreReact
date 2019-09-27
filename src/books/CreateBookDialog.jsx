import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import AuthenticationService from "../services/AuthenticationService";

class CreateBookDialog extends React.Component{
    constructor(props){
        super(props);

        this.state={
            name:""
        }
    }

    // componentWillReceiveProps=(nextProps) =>{
    //     this.setState({
    //         firstName: nextProps.curUser.fName,
    //         lastName: nextProps.curUser.lName
    //     })
    // }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSave=()=>{
        this.props.onSave(this.state.name);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Book name" name="name" onChange={this.handleChange}/>
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

export default CreateBookDialog;