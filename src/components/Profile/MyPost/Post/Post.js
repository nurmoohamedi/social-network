import classes from "./Post.module.css";
import user from "./../../../../assets/img/user.png";
import like from "./../../../../assets/img/like.png";
import delete_icon from "./../../../../assets/img/delete.png";

const Post = (props) => {

    let onDeletePost = (e) => {
        e.preventDefault()
        props.deletePost();
    }
    let onLikeClick = (e) =>{
        e.preventDefault()
        props.like();
    }

    return (
        <div className={classes.post}>
            {/*<div className={classes.post__img}>*/}
            {/*    <img src="" alt=""/>*/}
            {/*</div>*/}
            <div className={classes.post__info}>
                <div className={classes.post__img}>
                    <img src={props.profileImage || user} width={50} alt=""/>
                </div>
                <div className={classes.post__like}>
                    <img src={like} width={30} onClick={onLikeClick } />
                    <p>{props.post.likesCount}</p>
                </div>
            </div>
            <div className={classes.post__message}>{props.post.message}</div>
            <img src={delete_icon} width={30} onClick={onDeletePost} className={classes.post__btn} />
        </div>
    );
}

export default Post;