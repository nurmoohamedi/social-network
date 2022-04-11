import classes from "./Nav.module.css";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return(
    <nav className={classes.sidebar}>
        <div className={classes.sidebar__fixed}>
            <div><NavLink to="/profile" >Profile</NavLink></div>
            <div><NavLink to="/messages" >Messages</NavLink></div>
            <div><NavLink to="/users">Users</NavLink></div>
            {/*<div><NavLink to="#header">Top</NavLink></div>*/}
        </div>
    </nav>
    )
}

export default Sidebar;