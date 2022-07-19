import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/index';


class PasswordChange extends Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordRetype: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { oldPassword, newPassword, newPasswordRetype } = this.state;

        if (oldPassword && newPassword && newPasswordRetype && newPassword === newPasswordRetype) {
            this.props.changePassword(oldPassword, newPassword);
        }
    }

    componentDidMount() {
        this.props.resetErrors();
    }

    render() {
        //TODO: michael: on success password change show message and clear fields
        const { oldPassword, newPassword, newPasswordRetype, submitted } = this.state;
        const { submitting, errors, successMessage } = this.props;

        return (
            <div className="row">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 mt-5">
                    <form name="form" onSubmit={this.handleSubmit}>
                        {errors['__common'] !== undefined &&
                            <div className="mb-3">{errors['__common']}</div>
                        }
                        {successMessage &&
                            <div className="mb-3">{successMessage}</div>
                        }
                        <div className={'form-group' + (submitted && !oldPassword ? ' has-error' : '')}>
                            <input type="password" className="form-control" name="oldPassword" placeholder="Old password"
                                   value={oldPassword} onChange={this.handleChange} />
                            {submitted && !oldPassword &&
                                <div>Please type in old password</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !newPassword ? ' has-error' : '')}>
                            <input type="password" className="form-control" name="newPassword" placeholder="New password"
                                   value={newPassword} onChange={this.handleChange} />
                            {submitted && !newPassword &&
                                <div>Please type in new password</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !newPasswordRetype ? ' has-error' : '')}>
                            <input type="password" className="form-control" name="newPasswordRetype" placeholder="Repeat new password"
                                   value={newPasswordRetype} onChange={this.handleChange} />
                            {submitted && !newPasswordRetype &&
                                <div>Please retype in new password</div>
                            }
                            {submitted && newPasswordRetype !== newPassword &&
                                <div>Passwords do not match</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary pl-5 pr-5" disabled={submitting}>Change</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { submitting, errors, successMessage } = state.userSettings;
    return {
        submitting,
        errors,
        successMessage
    };
}

function mapDispatchToProps(dispatch) {
    return({
        changePassword: (oldPassword, newPassword) => {
            dispatch(userActions.changePassword(oldPassword, newPassword))
        },
        resetErrors: () => {
            dispatch(userActions.resetErrors())
        }
    })
}

const connectedPasswordChange = connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
export { connectedPasswordChange as PasswordChange };