import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import QueryString from 'query-string';
import { authActions } from '../_actions';
import { connect } from 'react-redux';


class OAuth2 extends Component {

    render() {
        const parsedQueryString = QueryString.parse(this.props.queryParams);
        const token = parsedQueryString['token'];
        const oauth2Error = parsedQueryString['error'];

        if (token) {
            this.props.oauthLogin(token);
            return <div>Loading..</div>;
        } else {
            return <Redirect to={{
                pathname: '/login',
                state: {
                    from: this.props.location,
                    oauth2Error //TODO: michael: use this error on Login screen through this.props.location.state.error for displaying error to user
                }
            }}/>;
        }
    }

}

function mapDispatchToProps(dispatch) {
    return({
        oauthLogin: (token) => {
            dispatch(authActions.oauthLogin(token))
        }
    })
}

const connectedOAuth2 = connect(null, mapDispatchToProps)(OAuth2);
export { connectedOAuth2 as OAuth2 };