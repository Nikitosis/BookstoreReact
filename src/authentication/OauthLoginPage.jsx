import React from 'react';
import {Redirect} from "react-router-dom";
import connect from "react-redux/lib/connect/connect";
import {executeTokenLogin, setAuthToken} from "../redux/reducers/loginReducer";
class OauthLoginPage extends React.Component{

    componentDidMount() {
        this.props.executeTokenLogin(this.getQueryToken());
    }

    getQueryToken=()=>{
        const queryString = require('query-string');
        var parsedQueryParams = queryString.parse(this.props.location.search);
        return parsedQueryParams.token;
    }

    render() {
        return <Redirect to={{ pathname: '/'}} />
    }
}

function mapDispatchToProps(dispatch){
    return{
        executeTokenLogin:(token)=>dispatch(executeTokenLogin(token))
    }
}

export default connect(null,mapDispatchToProps)(OauthLoginPage);