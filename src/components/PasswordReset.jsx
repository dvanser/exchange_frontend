import React, { Component } from 'react';
import { userActions } from '../_actions/index';
import { connect } from 'react-redux';


class PasswordReset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordRepeat: '',
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

        const { password, passwordRepeat } = this.state;

        this.setState({
            submitted: true
        });

        if (password && passwordRepeat && password === passwordRepeat) {
            this.props.passwordReset(password, this.props.queryParams.token);
        }
    }

    render() {

        const { submitted, password, passwordRepeat } = this.state;
        const { errors, successMessage, submitting } = this.props;

        return (
            <div className="container-fluid main-container mt-5">
                <div className="row">
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 mx-auto mt-5">
                        <div className="text-center">
                            <h3 className="mb-3">Reset password</h3>
                        </div>
                        <form name="form" onSubmit={this.handleSubmit}>
                            {errors['__common'] !== undefined &&
                                <div className="mb-3">{errors['__common']}</div>
                            }
                            {successMessage &&
                                <div className="mb-3">{successMessage}</div>
                            }
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <input type="password" className="form-control" name="password" placeholder="New password"
                                       value={password} onChange={this.handleChange}/>
                                {submitted && !password &&
                                    <div>Password is required</div>
                                }
                                {errors['newPassword'] !== undefined &&
                                    <div>{errors['newPassword']}</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !passwordRepeat ? ' has-error' : '')}>
                                <input type="password" className="form-control" name="passwordRepeat" placeholder="Repeat new password"
                                       value={passwordRepeat} onChange={this.handleChange} />
                                {submitted && !passwordRepeat &&
                                    <div>Please retype in new password</div>
                                }
                                {submitted && password !== passwordRepeat &&
                                    <div>Passwords do not match</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary pl-5 pr-5" disabled={submitting}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { errors, successMessage, submitting } = state.passwordReset;
    return {
        errors,
        successMessage,
        submitting
    };
}

function mapDispatchToProps(dispatch) {
    return({
        passwordReset: (password, token) => {
            dispatch(userActions.passwordReset(password, token))
        }
    })
}

const connectedPasswordReset = connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
export { connectedPasswordReset as PasswordReset };