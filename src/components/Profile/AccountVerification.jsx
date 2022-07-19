import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';


class AccountVerification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            firstName: '',
            lastName: '',
            accountVerificationStatus: ''
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
        const { firstName, lastName } = this.state;

        if (firstName && lastName) {
            this.props.getVerificationUrl(firstName, lastName);
        }
    }

    componentDidMount() {
        const { firstName, lastName, accountVerificationStatus } = this.props;

        this.setState({
            firstName,
            lastName,
            accountVerificationStatus
        });

        this.props.resetErrors();
    }

    render() {

        const { submitted, firstName, lastName, accountVerificationStatus } = this.state;
        const { submitting, errors } = this.props;

        return (
            <div className="row">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 mt-5">
                    <div className="form-group">
                        {(['IN_PROGRESS', 'DECLINED'].indexOf(accountVerificationStatus) !== -1) &&
                            <div>
                                {accountVerificationStatus === 'IN_PROGRESS' &&
                                    <h3>Account verification in progress</h3>
                                }
                                {accountVerificationStatus === 'DECLINED' &&
                                    <h3>Account cannot be verified</h3>
                                }
                                <div className="form-group">
                                    <label htmlFor="person-first-name" className="col-form-label"><b>First name</b></label>
                                    <input id="person-first-name" type="text" className="form-control-plaintext" name="firstName" placeholder="First name" value={firstName} readonly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="person-last-name" className="col-form-label"><b>Last name</b></label>
                                    <input id="person-last-name" type="text" className="form-control-plaintext" name="lastName" placeholder="Last name" value={lastName} readonly />
                                </div>
                            </div>
                        }
                        {(['NOT_VERIFIED', 'RESUBMIT_REQUIRED', 'EXPIRED', 'ABANDONED', 'DECLINED_CAN_RETRY'].
                            indexOf(accountVerificationStatus) !== -1) &&
                            <div>
                                {accountVerificationStatus === 'NOT_VERIFIED' &&
                                    <h3>Account not verified!</h3>
                                }
                                {(['RESUBMIT_REQUIRED', 'EXPIRED', 'ABANDONED', 'DECLINED_CAN_RETRY'].indexOf(accountVerificationStatus) !== -1) &&
                                    <h3>Account not verified! Resubmit required!</h3>
                                }
                                <form name="form" onSubmit={this.handleSubmit}>
                                    {errors['__common'] !== undefined &&
                                        <div className="mb-3">{errors['__common']}</div>
                                    }
                                    <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
                                        <input type="text" className="form-control" name="firstName" placeholder="First name" value={firstName}
                                               onChange={this.handleChange} />
                                        {submitted && !firstName &&
                                            <div>First name is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                                        <input type="text" className="form-control" name="lastName" placeholder="Last name" value={lastName}
                                               onChange={this.handleChange} />
                                        {submitted && !lastName &&
                                            <div>Last name is required</div>
                                        }
                                    </div>
                                    <div className="form-group mt-3">
                                        <button className="btn btn-primary pl-5 pr-5" disabled={submitting}>Verify account</button>
                                    </div>
                                </form>
                            </div>
                        }
                        {accountVerificationStatus === 'VERIFIED' &&
                            <div>
                                Account verified
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { submitting, errors, firstName, lastName, accountVerificationStatus } = state.userSettings;
    return {
        submitting,
        errors,
        firstName,
        lastName,
        accountVerificationStatus
    };
}

function mapDispatchToProps(dispatch) {
    return({
        getVerificationUrl: (firstName, lastName) => {
            dispatch(userActions.getVerificationUrl(firstName, lastName))
        },
        resetErrors: () => {
            dispatch(userActions.resetErrors())
        }
    })
}

const connectedAccountVerification = connect(mapStateToProps, mapDispatchToProps)(AccountVerification);
export { connectedAccountVerification as AccountVerification };