import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import booksPageReducer from "../redux/reducers/booksPageReducer";
import connect from "react-redux/lib/connect/connect";


//if book is provided in props, then it initializes state with book's values, otherwise- with empty values
class BookDialog extends React.Component{
    constructor(props){
        super(props);

        this.state={
            name:"",
            isbn:"",
            price:"",
            description:"",
            imagePreviewUrl:"",
            filePreviewName:"",
            file:null,
            image:null
        }
    }

    setConditionalState(){
        if(this.props.book!=null){
            this.setbookState();
        }
        else{
            this.setDefaultState();
        }
    }

    setbookState(){
        this.setState(
            {
                name:this.props.book.name!=null ? this.props.book.name:"",
                isbn:this.props.book.isbn!=null ? this.props.book.isbn:"",
                price:this.props.book.price!=null ? this.props.book.price:"",
                description:this.props.book.description!=null ? this.props.book.description:"",
                imagePreviewUrl:this.props.book.photoLink!=null ? this.props.book.imagePreviewUrl:"",
                filePreviewName:"",
                file:null,
                image:null
            }
        )
    }

    setDefaultState(){
        this.setState(
            {
                name:"",
                isbn:"",
                price:"",
                description:"",
                imagePreviewUrl:"",
                filePreviewName:"",
                file:null,
                image:null
            }
        )
    }

    //clear form, when it opens
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!prevProps.show && this.props.show){
            this.setConditionalState();
        }
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleChangeImage=(event)=>{
        this.setState({
            [event.target.name]:event.target.files[0],
            imagePreviewUrl:URL.createObjectURL(event.target.files[0])
        })
    }

    handleChangeFile=(event)=>{
        this.setState({
            [event.target.name]:event.target.files[0],
            filePreviewName:event.target.files[0].name
        })
    }

    handleSave=()=>{
        this.props.onSave(
            this.state.name,
            this.state.isbn,
            this.state.price,
            this.state.description,
            this.state.image,
            this.state.file);
    }


    handleClose=()=>{
        this.props.onClose();
    }

    render() {
        let nameValidationStyle=this.props.nameErrorMessage==null ? "" : "is-invalid";
        let priceValidationStyle=this.props.priceErrorMessage==null ? "" : "is-invalid";

        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Name</label>
                            <input type="text" className={`form-control ${nameValidationStyle}`} placeholder="Book name" name="name" value={this.state.name} onChange={this.handleChange}/>
                            <small className="text-danger">
                                {this.props.nameErrorMessage}
                            </small>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>ISBN</label>
                            <input type="text" className="form-control" placeholder="ISBN" name="isbn" value={this.state.isbn} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Price</label>
                            <input type="number" className={`form-control ${priceValidationStyle}`} placeholder="0.00" name="price" value={this.state.price} onChange={this.handleChange}/>
                            <small className="text-danger">
                                {this.props.priceErrorMessage}
                            </small>
                        </div>

                        <div className="form-group">
                            <label className={"font-weight-bold"}>Description</label>
                            <textarea type="number" className="form-control" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} rows={3}></textarea>
                        </div>

                        <div className={"form-group"}>
                            <p className={"font-weight-bold"}>Document: </p>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="file" name="file"
                                       accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf"
                                       onChange={this.handleChangeFile}/>
                                <label className="custom-file-label" htmlFor="avatar">{this.state.filePreviewName || "Choose file"}</label>
                            </div>
                        </div>

                        <div className={"form-group"}>
                            <p className={"font-weight-bold"}>Image: </p>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="image" name="image" accept="image/*" onChange={this.handleChangeImage}/>
                                <label className="custom-file-label" htmlFor="image">Choose image</label>
                            </div>
                            {this.state.imagePreviewUrl &&
                            <img src={this.state.imagePreviewUrl} className={"img-thumbnail"} alt=""/>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
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

function mapStateToProps(state){
    return {
        nameErrorMessage:state.booksPageReducer.nameErrorMessage,
        priceErrorMessage:state.booksPageReducer.priceErrorMessage
    }
}

export default connect(mapStateToProps)(BookDialog);