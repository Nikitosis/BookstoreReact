import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import connect from "react-redux/lib/connect/connect";
import {fetchCountries} from "../redux/reducers/countryReducer";
import Select from "react-select";

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
            avatarPreviewUrl:props.curUser.avatarLink,
            subscribedToNews:props.curUser.subscribedToNews
        }
    }

    componentDidMount() {
        this.props.fetchCountries();
        this.timer=setInterval(()=>this.props.fetchCountries(),50000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer=null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!prevProps.show && this.props.show) {
            this.setState({
                firstName: this.props.curUser.fName,
                lastName: this.props.curUser.lName,
                country: this.props.curUser.country,
                city: this.props.curUser.city,
                gender: this.props.curUser.gender,
                email: this.props.curUser.email,
                phone: this.props.curUser.phone,
                avatarPreviewUrl: this.props.curUser.avatarLink,
                subscribedToNews:this.props.curUser.subscribedToNews
            })
        }
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleCountryChange=(option)=>{
        this.setState({
            "country":option.value
        })
    }

    handleChangeImage=(event)=>{
        this.setState({
            avatar:event.target.files[0],
            avatarPreviewUrl:URL.createObjectURL(event.target.files[0])
        })
    }

    handleChangeSubscription=(event)=>{
        this.setState({
            subscribedToNews:!this.state.subscribedToNews
        })
}

    handleSave=()=>{
        this.props.onSave(this.state.firstName,
            this.state.lastName,
            this.state.country,
            this.state.city,
            this.state.gender,
            this.state.email,
            this.state.phone,
            this.state.avatar,
            this.state.subscribedToNews);
    }

    render() {
        let emailValidationStyle=this.props.emailErrorMessage==null? "":"is-invalid";

        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div className="form-group">
                            <label className={"font-weight-bold"}>First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Country</label>
                            <Select value={{value:this.state.country,label:this.state.country}}
                                    onChange={this.handleCountryChange}
                                    isSearchable={true}
                                    options={
                                        this.props.countries.map(country=>{
                                            return {value:country.name,label:country.name};
                                        })
                                    }
                            />
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>City</label>
                            <input type="text" className="form-control" placeholder="City" name="city" value={this.state.city} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <p className={"font-weight-bold"}>Gender: </p>
                            <label className={"radio-inline"}> <input type="radio" name="gender" value="MALE" onChange={this.handleChange} checked={this.state.gender==='MALE'}/>Male</label>
                            <br/>
                            <label className={"radio-inline"}> <input type="radio" name="gender" value="FEMALE" onChange={this.handleChange} checked={this.state.gender==='FEMALE'}/>Female</label>
                        </div>
                        <div className="form-group">
                            <label className={"font-weight-bold"}>Email: </label>
                            <input type="email" className={`${emailValidationStyle} form-control`} placeholder="example@gmail.com" name="email" value={this.state.email} onChange={this.handleChange}/>
                            <small className="text-danger">
                                {this.props.emailErrorMessage}
                            </small>
                        </div>

                        <div className="form-group">
                            <label className={"font-weight-bold"}>Phone: </label>
                            <input type="tel" className={"form-control"} placeholder="+38012334123" pattern={"[+]{1}[0-9]{11,14}"} name="phone" value={this.state.phone} onChange={this.handleChange}/>
                        </div>

                        <div className={"form-group"}>
                            <p className={"font-weight-bold"}>Avatar: </p>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="avatar" name="avatar" accept="image/*" onChange={this.handleChangeImage}/>
                                <label className="custom-file-label" htmlFor="avatar">Choose file</label>
                            </div>
                            {this.state.avatarPreviewUrl != null &&
                                <img src={this.state.avatarPreviewUrl} className={"img-thumbnail"} alt=""/>
                            }
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="isSubscribedCheckbox" name={"isSubscribedToNews"}
                                   checked={this.state.subscribedToNews} onChange={this.handleChangeSubscription}/>
                                <label className="custom-control-label" htmlFor="isSubscribedCheckbox">subscribe to news</label>
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

function mapStateToProps(state){
    return{
        emailErrorMessage: state.homePageReducer.emailErrorMessage,
        countries:state.countryReducer.countries
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchCountries:()=>dispatch(fetchCountries())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);