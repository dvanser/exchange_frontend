import React, { Component } from 'react';
import {userActions} from "../../_actions";
import { connect } from 'react-redux';


class Email extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            oldEmail: '',
            receiveUpdates: true,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            [event.target.name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });

        if (this.state.email) {
            this.props.changeEmail(this.state.email, this.state.receiveUpdates);
        }
    }

    componentDidMount() {
        const { email, newEmail } = this.props;

        if (newEmail.length > 0) {
            this.setState({email: newEmail, oldEmail: email});
        } else {
            this.setState({email});
        }

        this.props.resetErrors();

    }

    render() {

        const { email, oldEmail, submitted, receiveUpdates } = this.state;
        const { submitting, errors, newEmail, successMessage } = this.props;

        return (
            <div className="row">
                <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-4 mt-5">
                    {newEmail.length === 0 &&
                        <h3 className="mb-3">Email is verified!</h3>
                    }
                    {newEmail.length > 0 &&
                        <h3 className="mb-3">Email not verified!</h3>
                    }
                    <div className="mb-2">Change Email</div>
                    <form name="form" onSubmit={this.handleSubmit}>
                        {errors['__common'] !== undefined &&
                            <div className="mb-3">{errors['__common']}</div>
                        }
                        {successMessage &&
                            <div className="mb-3">{successMessage}</div>
                        }
                        {newEmail.length > 0 &&
                            <div>
                                <div className="mb-3">Old email:</div>
                                <div className='form-group'>
                                    <input type="text" className="form-control" name="oldEmail" placeholder="Email address"
                                           value={oldEmail} disabled={true} />
                                </div>
                                <div className="mb-3">New email:</div>
                            </div>
                        }
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <input type="text" className="form-control" name="email" placeholder="Email address" value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <div>Email is required</div>
                            }
                        </div>
                        <input className="mr-3" type="checkbox" name="receiveUpdates" checked={receiveUpdates} onChange={this.handleChange} />
                        <span>I want to receive updates to my email</span>
                        <div className="form-group mt-3">
                            <button className="btn btn-primary pl-5 pr-5" disabled={submitting}>Change</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { submitting, errors, newEmail, email, successMessage } = state.userSettings;
    return {
        submitting,
        errors,
        newEmail,
        email,
        successMessage
    };
}

function mapDispatchToProps(dispatch) {
    return({
        changeEmail: (email, receiveUpdates) => {
            dispatch(userActions.changeEmail(email, receiveUpdates))
        },
        resetErrors: () => {
            dispatch(userActions.resetErrors())
        }
    })
}

const connectedEmail = connect(mapStateToProps, mapDispatchToProps)(Email);
export { connectedEmail as Email };