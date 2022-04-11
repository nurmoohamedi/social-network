import classes from "./../Messages.module.css";
import {NavLink} from "react-router-dom";


const MessageItem = (props) => {

    let path = "/messages/" + props.state.id;
    return (
        <div className={classes.message}>
            <NavLink to={path}>{props.state.name}</NavLink>
        </div>
    )

}

export default MessageItem;