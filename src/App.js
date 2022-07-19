import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_library';
import { PrivateRoute } from './components';
import {
    LoginScreen,
    MainScreen,
    SignUpScreen,
    OAuth2Screen,
    ProfileScreen,
    PasswordResetRequestScreen,
    PasswordResetScreen } from './screens';
import config from './config';
import { connect } from 'react-redux';
import {userActions} from "./_actions";


class App extends Component {

    componentDidMount() {
        if (!this.props.userSettings.synchronized) {
            this.props.loadSettings();
        }
    }

    render() {

        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={MainScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/signup" component={SignUpScreen} />
                    <Route exact path="/password/request/reset/" component={PasswordResetRequestScreen} />
                    <Route exact path="/password/reset/:token" component={PasswordResetScreen} />
                    <Route path={config.oauth2RedirectPath} component={OAuth2Screen} />
                    <PrivateRoute exact path="/profile/:tab?" component={ProfileScreen} />
                    <PrivateRoute exact path="/profile/email/confirm/:token" component={MainScreen} />
                </div>
            </Router>
        );
    }

}

function mapStateToProps(state) {
    const { userSettings } = state;
    return {
        userSettings
    };
}

function mapDispatchToProps(dispatch) {
    return({
        loadSettings: () => {
            dispatch(userActions.loadSettings())
        }
    })
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
