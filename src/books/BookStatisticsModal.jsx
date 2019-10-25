import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import React from "react";

const BookStatisticsModal=({show,onClose,statistics})=>{
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Book info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <ul className="list-group">
                   <li className="list-group-item d-flex justify-content-between align-items-center">
                       <span>Total taken times</span>
                       <span>{statistics.takenAmount}</span>
                   </li>
                   <li className="list-group-item d-flex justify-content-between align-items-center">
                       <span>Total returned times</span>
                       <span>{statistics.returnedAmount}</span>
                   </li>
                   <li className="list-group-item d-flex justify-content-between align-items-center">
                       <span>Total revenue</span>
                       <span>{statistics.totalPayments}</span>
                   </li>
               </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookStatisticsModal;