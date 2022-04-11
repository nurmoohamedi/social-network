import classes from "./MyPost.module.css";

import React from 'react'
import PostContainer from "./Post/PostContainer";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, Textarea} from "../../../utils/validators/FormValidator";

const maxLength15 = maxLengthCreator(15);

let AddPostForm = (props) => {
    return <div className={classes.add_form}>
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'postText'} label={'Enter your text...'}
            />
            <button>Post</button>
        </form>
    </div>;
}

const validate = (values) => {
    const errors = []
    if (!values.postText)
        errors.postText = 'Required!'
    else if (maxLength15(values))
        errors.postText = maxLength15(values);
    return errors;
}
AddPostForm = reduxForm({
    form: 'AddPostForm',
    validate
})(AddPostForm);

const MyPost = React.memo((props) => {
    // console.log("RENDER")
    let mappedPosts = props.state.posts.map(post => <PostContainer post={post} profileImage={props.state.profile?.photos.large}/>)

    let onPostClick = (values) => {
        props.addPost(values.postText);
    }

    return (
        <div className={classes.posts}>
            <div className={classes.container}>
                <h2>My Posts</h2>

                <AddPostForm onSubmit={onPostClick}/>

                <div className={classes.posts_items}>
                    {mappedPosts}
                </div>
            </div>
        </div>);
})

export default MyPost;