import React from "react";

import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileStatus, getProfileUser, savePhoto, saveProfileData} from "../../redux/profile-reducer";
import {useMatch} from "react-router-dom";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";

// import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.userId;
        if (this.props.matchId) {
            userId = this.props.matchId;
            debugger
        }
        // if (!this.props.match){
        //     userId = 2;
        // }else
        //     userId = this.props.match.params.userId;
        this.props.getProfileUser(userId);
        this.props.getProfileStatus(userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return <Profile state={this.props.state} savePhoto={this.props.savePhoto} saveProfileData={this.props.saveProfileData}/>
    }
}

const mapStateToProps = (state) => ({
    state: state.profilePage,
    userId: state.auth.id
})
export const withRouter = (Component) =>{

    let RouterComponent = (props) => {

        const match = useMatch('/profile/:userId');
        // console.log(match)
        return <Component {...props} matchId={match?.params.userId}/>;

    }
    return RouterComponent;
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getProfileUser, getProfileStatus, savePhoto, saveProfileData})
)(ProfileContainer);

