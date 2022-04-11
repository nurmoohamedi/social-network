import classes from "./Profile.module.css";
import PreLoader from "../common/Preloader/PreLoader";
import ProfileStatus from "./ProfileStatus"
import userLogo from "../../assets/img/user.png"
import {React, useState} from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../utils/validators/FormValidator";


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    //&& props.toggle
    if (!props.profile) {
        return <PreLoader/>
    }

    const savePhoto = (e) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfileData(formData);
        setEditMode(false);
    }


    return (
        <section className={classes.profile}>
            <div className={classes.container}>
                <div className={classes.profile_wrap}>
                    <div className={classes.profile__user}>
                        <h1>My Profile</h1>
                        <div className={classes.profile__ava}>
                            <div className={classes.userPhoto}>
                                <img src={props.profile.photos.large || userLogo} alt=""/>
                                <input type="file" id={"file"} onChange={savePhoto}/>
                                <label htmlFor={"file"}>
                                    <span>Upload Avatar</span>
                                </label>
                            </div>

                            <p className={classes.profile__user_label}>Full Name</p>
                            <p className={classes.profile__user_text}>{props.profile.fullName}</p>
                            <p className={classes.profile__user_label}>Status</p>
                            <p className={classes.profile__user_text}><ProfileStatus/></p>
                        </div>
                    </div>
                    <div className={classes.profile__inner}>
                        {/*<h1>Profile Info</h1>*/}
                        {!editMode
                            ? <ProfileData profile={props.profile} switchEditMode={() => {
                                setEditMode(true)
                            }}/>
                            : <ProfileDataForm onSubmit={onSubmit} initialValues={props.profile}/>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}


const ProfileData = ({profile, switchEditMode}) => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className={classes.profile__inner_data}>
            <p className={classes.profile__user_label}>Full name: </p>
            <p className={classes.profile__user_text}>{profile.fullName}</p>
            <p className={classes.profile__user_label}>About Me: </p>
            <p className={classes.profile__user_text}>{profile.aboutMe}</p>
            <p className={classes.profile__user_label}>Looking For A Job: </p>
            <p className={classes.profile__user_text}>{profile.lookingForAJob ? "No,I appreciate to Dimych!" : "In Search"}</p>
            <p className={classes.profile__user_label}>My Skilss: </p>
            <p className={classes.profile__user_text}>{profile.lookingForAJobDescription}</p>
            <button className={classes.profile__button} onClick={() => setShowDetails(prevState => !prevState)}>{showDetails ? "Hide Details" : "Show Details"}</button>
            {
                showDetails && (
                    <div className={classes.show_details}>
                        <div>
                            <p className={classes.profile__user_label}>Contacts: </p>
                            {Object.keys(profile.contacts).map(key => {
                                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                            })}
                        </div>
                        <div>
                            <button className={classes.profile__button} onClick={switchEditMode}>Edit</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

let ProfileDataForm = ({initialValues, switchEditMode, handleSubmit}) => {
    return (
        <div className={classes.profile__inner_data_form}>
            <h1>Edit Proflie Info</h1>
            <form onSubmit={handleSubmit}>
                <p className={classes.profile__user_label}>Full Name: </p>
                <Field label={"Full Name"} name={"fullName"} component={Input} type={"text"}/>

                <p className={classes.profile__user_label}>About me: </p>
                <Field label={"About me"} name={"aboutMe"} component={Textarea}/>

                <p className={classes.profile__user_label}>Looking For a Job</p>
                <Field name={"lookingForAJob"} component={Input} type={"checkbox"}/>

                <p className={classes.profile__user_label}>My Skilss: </p>
                <Field label={"Description"} name={"lookingForAJobDescription"} component={Textarea}/>

                <div>
                    <p className={classes.profile__user_label}>Contacts: </p> {Object.keys(initialValues.contacts).map(key => {
                    return <div className={classes.contact}>
                        <p className={classes.profile__user_label}>{key}: </p>
                        <Field name={"contacts." + key} label={key} component={Input}/>
                    </div>
                })}
                </div>
                <button className={classes.profile__button}>Save</button>
            </form>
        </div>
    );
}
ProfileDataForm = reduxForm({form: 'ProfileDataForm'})(ProfileDataForm);

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.contact}>
            <p className={classes.profile__user_label}>{contactTitle}: </p>
            <a className={classes.profile__user_text} href={contactValue}>{contactValue}</a>
        </div>
    )
}

export default ProfileInfo;
