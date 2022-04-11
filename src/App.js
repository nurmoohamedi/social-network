import './App.css';
import React, {Component} from "react";
import Sidebar from "./components/Nav/Nav";
import Home from "./components/Home/Home";

import {Route, Routes} from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";

import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {initialize} from "./redux/app-reducer";
import PreLoader from "./components/common/Preloader/PreLoader";
import withSuspense from "./hoc/withSuspense";

// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
// import MessagesContainer from "./components/Messages/MessagesContainer";
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initialize();
    }

    render() {

        if (!this.props.initialized){
            return <PreLoader />
        }

        return (
            <div className={"wrapper"}>
                <HeaderContainer/>
                <div className="container">
                    <Sidebar/>
                    <div className={"App"}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/profile" element={withSuspense(ProfileContainer)}/>
                            <Route path="/profile/:userId" element={withSuspense(ProfileContainer)}/>
                            <Route path="/messages" element={withSuspense(MessagesContainer)}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
export default compose(connect(mapStateToProps,{initialize}))(App);

// "@testing-library/jest-dom": "^5.16.1",
//     "@testing-library/react": "^12.1.2",
//     "@testing-library/user-event": "^13.5.0",
//     "web-vitals": "^2.1.2",