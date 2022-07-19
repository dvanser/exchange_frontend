import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class Main extends Component {

    componentDidMount() {
        if (this.props.queryParams !== undefined && this.props.queryParams !== undefined && this.props.queryParams.token !== undefined) {
            this.props.confirmEmail(this.props.queryParams.token);
        }

        this.props.resetErrors();
    }

    render() {

        const { successMessage, errors, loggedIn } = this.props;

        return (
            <div>
                {successMessage !== '' &&
                    <h3>{successMessage}</h3>
                }
                {errors['__common'] !== undefined &&
                    <h3>{errors['__common']}</h3>
                }
                {loggedIn &&
                    <div>Logged In</div>
                }
                This is main screen
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { successMessage, errors } = state.userSettings;
    const { loggedIn } = state.authentication;
    return {
        successMessage,
        errors,
        loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return({
        confirmEmail: (token) => {
            dispatch(userActions.confirmEmail(token))
        },
        resetErrors: () => {
            dispatch(userActions.resetErrors())
        }
    })
}

const connectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);
export { connectedMain as Main };