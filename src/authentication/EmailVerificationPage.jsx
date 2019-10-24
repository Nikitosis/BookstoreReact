import React from "react";
import {executeEmailVerification} from "../redux/reducers/EmailVerificationPageReducer";
import connect from "react-redux/lib/connect/connect";

class EmailVerificationPage extends React.Component{


    componentDidMount() {
        this.props.verifyEmail(this.props.match.params.token);
    }

    render() {
        return (
            <h2>
                {this.props.message}
            </h2>
        );
    }
}

function mapStateToProps(state){
    return {
        message:state.EmailVerificationPageReducer.message
    }
}

function mapDispatchToProps(dispatch){
    return{
        verifyEmail:(token)=>dispatch(executeEmailVerification(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmailVerificationPage);