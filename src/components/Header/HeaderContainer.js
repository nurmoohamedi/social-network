import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getUserData, logout} from "../../redux/auth-reducer";
import login from "../Login/Login";

class HeaderContainer extends React.Component{

    componentDidMount() {
        this.props.getUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({state: state.auth})

export default connect(mapStateToProps, {getUserData, login, logout})(HeaderContainer);