import React from "react";
import {addMessage} from "../../redux/messages-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state) => {
    return {
        state: state.messagesPage
    }
}

export default compose(
    connect(mapStateToProps, {addMessage}),
    withAuthRedirect
)(Messages);