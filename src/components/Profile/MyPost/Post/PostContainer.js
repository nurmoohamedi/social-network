import {deletePostAction, likeAction} from "../../../../redux/profile-reducer";
import store from './../../../../redux/redux-store';
import Post from "./Post";

const PostContainer = (props) => {


    let deletePost = () => {
        store.dispatch(deletePostAction(props.post.id))
    }
    let like = () =>{
        store.dispatch(likeAction(props.post.id, props.post.likesCount++))
    }

    // let mappedPosts = props.state.posts.map(post => <Post post={post}  />)

    return <Post post={props.post} deletePost={deletePost} like={like} profileImage={props.profileImage}/>;
}

export default PostContainer;