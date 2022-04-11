import React from "react";
import classes from "./Profile.module.css";
import {connect} from "react-redux";
import {onChangeStatus, saveProfileStatus} from "../../redux/profile-reducer";
class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        statusValue: ""
    }

    activeEditMode() {
        this.setState({
            editMode : true
        })
    }
    deActiveEditMode() {
        this.setState({
            editMode : false
        })
        this.props.saveProfileStatus(this.props.status)
    }

    onStatusChange(e) {
        // this.setState({
        //     statusValue: e.target.value
        // })
        this.props.onChangeStatus(e.target.value);
    }

    render() {
        return (
            <div className={classes.status}>
                {this.state.editMode
                    ?
                    <div>
                        <input type="text" value={this.props.status ? this.props.status : ""}
                               autoFocus={true} onBlur={this.deActiveEditMode.bind(this)}
                               onChange={event => this.onStatusChange(event)}/>
                    </div>
                    :
                    <div>
                        <span onDoubleClick={this.activeEditMode.bind(this)}>{!this.props.status?"You don't have any status!":this.props.status}</span>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.profilePage.profileStatus,
    }
}

export default connect(mapStateToProps,{onChangeStatus, saveProfileStatus})(ProfileStatus);