import classes from "./Messages.module.css";

import MessageItem from "./Dialog/MessageItem";
import Dialog from "./MessageItem/Dialog";
import React from "react";
import {Field, reduxForm} from "redux-form";

let MessageForm = (props) => {
    return (
        <div>
            <form className={classes.messages__form} onSubmit={props.handleSubmit}>
                <Field name={'text'} component={'input'} type="text" placeholder={"Insert your message..."}/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

MessageForm = reduxForm({form: 'message'})(MessageForm)

const Messages = (props) => {
    let mappedMessages = props.state.message.map(message => <MessageItem state={message}/>)
    let mappedDialogs = props.state.dialog.map(dialog => <Dialog dialog={dialog}/>)

    const addMessage = (formData) => {
        props.addMessage(formData.text)
    }

    return (
        <div className={classes.messages}>
            <div className={classes.messages__items}>
                {mappedMessages}
            </div>
            <div className={classes.messages__dialogs}>

                {mappedDialogs}

                <MessageForm onSubmit={addMessage}/>
            </div>
        </div>
    );
}

export default Messages;