import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes.header__logo}>
                <NavLink to={"/"}>ACME</NavLink>
            </div>
            <div className={classes.header__nav}>
                {props.state.isAuth
                    ? <div>
                        <h4>{props.state.login}</h4>
                        <button onClick={props.logout}>Logout</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;