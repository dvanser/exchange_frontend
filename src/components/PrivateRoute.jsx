import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../_library/store';
import config from '../config';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        store.getState().authentication.user === undefined && !localStorage.getItem(config.accessTokenName)
            ? <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            : <Component {...props} />
    )} />
)