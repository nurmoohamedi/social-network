import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {changeCurrentPage, followThunk, getUsersThunk, setMoreUsers, unfollowThunk} from "../../redux/users-reducer";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersThunk(this.props.state.currentPage, this.props.state.userCount);
    }

    componentWillUnmount() {
        this.props.changeCurrentPage(1);
    }

    onCurrentPageClick = (page) => {
        debugger
        this.props.changeCurrentPage(page);

        this.props.getUsersThunk(page, this.props.state.userCount);

    }

    moreUsers = () => {
        let page = this.props.state.currentPage + 1;
        this.props.toggleIsFetching(true);

        this.props.getUsersThunk(this.props.state.currentPage, this.props.state.userCount);

        // getUsers(this.props.state.currentPage,this.props.state.userCount )
        //     .then(data => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setState(data.items);
        //         this.props.setTotalUsersCount(data.totalCount);
        //     });
    }

    render() {
        return (
            <>
                {/*{this.props.state.isFetching*/}
                {/*    ? <PreLoader/> :*/}
                    <Users
                        state={this.props.state}
                        moreUsers={this.moreUsers}
                        onCurrentPageClick={this.onCurrentPageClick}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                    />
                {/*}*/}
            </>)
    }

}

const mapStateToProps = (state) => {
    return {
        state: state.usersPage
    }
}

export default compose(
    connect(mapStateToProps,
        {
            follow: followThunk, unfollow: unfollowThunk,
            setMoreUsers: setMoreUsers, changeCurrentPage: changeCurrentPage,
            getUsersThunk
        }
    ),
    withAuthRedirect
)(UsersContainer);
