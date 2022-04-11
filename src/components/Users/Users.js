import React from "react";
import styles from "./Users.module.css"
import userLogo from "../../assets/img/user.png"
import {NavLink} from "react-router-dom";
import PreLoader from "../common/Preloader/PreLoader";
import Paginator from "../common/Paginator/Paginator";

const Users = (props) => {

    return (
        <div>
            <Paginator
                onCurrentPageClick={props.onCurrentPageClick}
                totalItemsCount={props.state.totalUserCount}
                pageSize={props.state.userCount}
                currentPage={props.state.currentPage}
            />
            {
                props.state.isFetching ? <PreLoader/>
                    :
                    <div className={styles.users}>
                        {
                            props.state.users.map(user =>
                                <div className={styles.user}>
                                    <div className={styles.user__img}>
                                        <NavLink to={"/profile/" + user.id}>
                                            {user.photos.small ? <img src={user.photos.small}/> : <img src={userLogo}/>}
                                        </NavLink>
                                    </div>
                                    <div className={styles.user__info}>
                                        <h3>{user.name}</h3>
                                        <p>{user.status}</p>

                                    </div>
                                    <div className={styles.user__follow}>
                                        <h3>{user.fullName}</h3>
                                        {user.isFollowed
                                            ? <button onClick={() => {

                                                props.unfollow(user.id)

                                            }}>Unfollow</button>
                                            : <button onClick={() => {

                                                props.follow(user.id)

                                            }}>Follow</button>}
                                    </div>
                                </div>)
                        }

                        {/*<div className={styles.pagination}><a onClick={ props.moreUsers } className={"btn"}>More Users</a></div>*/}

                    </div>
            }
        </div>
    )
}

export default Users;