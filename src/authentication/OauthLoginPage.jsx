import React from 'react';
import {Redirect} from "react-router-dom";
import connect from "react-redux/lib/connect/connect";
import {executeTokenLogin, setAuthToken} from "../redux/reducers/loginReducer";
class OauthLoginPage extends React.Component{

    componentDidMount() {
        console.log(this.props.match.params.token);
        this.props.executeTokenLogin(this.props.match.params.token);
    }

    render() {
        return <Redirect to={{ pathname: '/login'}} />
        //return (<div></div>)
    }
}

function mapDispatchToProps(dispatch){
    return{
        executeTokenLogin:(token)=>dispatch(executeTokenLogin(token))
    }
}

export default connect(null,mapDispatchToProps)(OauthLoginPage);