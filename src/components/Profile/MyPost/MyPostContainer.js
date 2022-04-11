import React from 'react'
import {addPost, onChangePost} from "../../../redux/profile-reducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
}
const mapDispatchToProps = {
        addPost
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPost);