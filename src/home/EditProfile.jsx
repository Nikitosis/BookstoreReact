import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

class EditProfile extends React.Component{
    constructor(props){
        super(props);

        this.state={
            firstName:props.curUser.fName,
            lastName:props.curUser.lName,
            country:props.curUser.country,
            city:props.curUser.city,
            gender:props.curUser.gender,
            email:props.curUser.email,
            phone:props.curUser.phone,
            avatarPreviewUrl:props.curUser.avatarLink
        }
    }

    componentWillReceiveProps=(nextProps) =>{
        this.setState({
            firstName: nextProps.curUser.fName,
            lastName: nextProps.curUser.lName,
            country:nextProps.curUser.country,
            city:nextProps.curUser.city,
            gender:nextProps.curUser.gender,
            email:nextProps.curUser.email,
            phone:nextProps.curUser.phone,
            avatarPreviewUrl:nextProps.curUser.avatarLink
        })
    }

    handleChange=(event)=>{
        console.log(event);
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleChangeFile=(event)=>{
        this.setState({
            [event.target.name]:event.target.files[0],
            avatarPreviewUrl:URL.createObjectURL(event.target.files[0])
        })
    }

    handleSave=()=>{
        console.log(this.state);
        this.props.onSave(this.state.firstName,
            this.state.lastName,
            this.state.country,
            this.state.city,
            this.state.gender,
            this.state.email,
            this.state.phone,
            this.state.avatar);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div className="form-group">
                            <label className={"font-weight-bold"}>First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" name="firstName" defaultValue={this.state.firstName} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" name="lastName" defaultValue={this.state.lastName} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Last Name</label>
                            <input type="text" className="form-control" placeholder="Country" name="country" defaultValue={this.state.country} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Last Name</label>
                            <input type="text" className="form-control" placeholder="City" name="city" defaultValue={this.state.city} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <p className={"font-weight-bold"}>Gender: </p>
                            <label className={"radio-inline"}> <input type="radio" name="gender" value="MALE" onChange={this.handleChange} checked={this.state.gender==='MALE'}/>Male</label>
                            <br/>
                            <label className={"radio-inline"}> <input type="radio" name="gender" value="FEMALE" onChange={this.handleChange} checked={this.state.gender==='FEMALE'}/>Female</label>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Email: </label>
                            <input type="email" className="form-control" placeholder="example@gmail.com" name="email" defaultValue={this.state.email} onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label className={"font-weight-bold"}>Phone: </label>
                            <input type="tel" className={"form-control"} placeholder="+38012334123" pattern={"[+]{1}[0-9]{11,14}"} name="phone" defaultValue={this.state.phone} onChange={this.handleChange}/>
                        </div>

                        <div className={"form-group"}>
                            <p className={"font-weight-bold"}>Avatar: </p>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="avatar" name="avatar" accept="image/*" onChange={this.handleChangeFile}/>
                                <label className="custom-file-label" htmlFor="avatar">Choose file</label>
                            </div>
                            <img src={this.state.avatarPreviewUrl} className={"img-thumbnail"} alt=""/>
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