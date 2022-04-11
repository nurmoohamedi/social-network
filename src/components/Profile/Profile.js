import MyPostContainer from "./MyPost/MyPostContainer";
import ProfileInfo from "./ProfileInfo";
import userLogo from "../../assets/img/user.png";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.state.profile}
                         toggle={props.state.toggleIsFetching}
                         status={props.state.profileStatus}
                         savePhoto={props.savePhoto}
                         saveProfileData={props.saveProfileData}
            />
            <MyPostContainer />
        </div>
    );
}

export default Profile;