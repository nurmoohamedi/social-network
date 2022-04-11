import React from "react";
import {connect} from "react-redux";
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "../components/Login/Login";


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Navigate to="/login"/>
            }
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToProps)(RedirectComponent);
}

export default withAuthRedirect;
