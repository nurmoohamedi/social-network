import classes from "./../Messages.module.css";


const Dialog = (props) => {
    return (
        <div className={classes.dialog__item}>
            {props.dialog.message}
        </div>
    )
}

export default Dialog;