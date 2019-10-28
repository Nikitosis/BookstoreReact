import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";


class DepositModal extends React.Component{
    constructor(props){
        super(props);

        this.state={
            money:""
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!prevProps.show && this.props.show) {
            this.setState({
               money:""
            })
        }
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSave=()=>{
        this.props.onSave(this.state.money);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit money</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Amount</label>
                            <input type="number" className="form-control" placeholder="0.00" name="money" value={this.state.money} onChange={this.handleChange}/>
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

export default DepositModal;