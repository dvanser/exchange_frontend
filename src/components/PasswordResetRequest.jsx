import React, { Component } from 'react';
import { userActions } from '../_actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class PasswordResetRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
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

        const { email } = this.state;

        this.setState({
            submitted: true
        });

        if (email) {
            this.props.requestPasswordReset(email);
        }
    }

    componentDidMount() {
        this.props.resetReducer();
    }

    render() {

        const { submitted, email } = this.state;
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
                            {successMessage.length > 0 &&
                                <div className="mb-3">{successMessage}</div>
                            }
                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="email" placeholder="Email"
                                       value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                    <div>Email is required</div>
                                }
                                {errors['email'] !== undefined &&
                                    <div>{errors['email']}</div>
                                }
                            </div>
                            <div className="form-group">
                                {successMessage.length === 0 &&
                                    <button className="btn btn-primary pl-5 pr-5" disabled={submitting}>Submit</button>
                                }
                                <Link to="/login" className="float-right">Log in</Link>
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
        requestPasswordReset: (email) => {
            dispatch(userActions.requestPasswordReset(email))
        },
        resetReducer: () => {
            dispatch(userActions.resetPasswordResetMessages())
        }
    })
}

const connectedPasswordResetRequest = connect(mapStateToProps, mapDispatchToProps)(PasswordResetRequest);
export { connectedPasswordResetRequest as PasswordResetRequest };