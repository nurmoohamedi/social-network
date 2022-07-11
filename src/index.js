import store from "./redux/redux-store";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter, BrowserRouter as Router} from 'react-router-dom'
import {Provider} from "react-redux";

export let reRenderEntireTree = (store) => {
    ReactDOM.render(
        <React.StrictMode>
            <HashRouter >
                {/*basename={process.env.PUBLIC_URL}*/}
                <Provider store={store}>
                    <App/>
                </Provider>
            </HashRouter>

        </React.StrictMode>,
        document.getElementById('root')
    );
}

reRenderEntireTree(store);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// reportWebVitals(console.log)

