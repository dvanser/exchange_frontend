import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions';


class Sms extends Component {

    constructor(props) {

        super(props);

        this.state = {
            submitted: false,
            smsSent: false,
            phone: '',
            smsCode: '',
            password: ''
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
        const { phone, smsCode, password } = this.state;
        const { smsSent } = this.props;

        if (!smsSent && phone) {
            this.props.changePhoneNumber(phone);
        } else if (smsSent && smsCode && password) {
            this.props.verifyPhoneNumber(smsCode, password);
        }
    }

    componentDidMount() {

        const { phoneNumber } = this.props;

        this.setState({
            phone: phoneNumber
        });

        this.props.resetErrors();
    }

    render() {

        const { phone, smsCode, submitted, password } = this.state;
        const { submitting, errors, twoFactorAuth, smsSent, successMessage } = this.props;

        return (
            <div>
                <div>
                    {twoFactorAuth !== 'SMS' &&
                        <div>
                            <p>To enable 2-step Auth use your phone!</p>
                        </div>
                    }
                    {twoFactorAuth === 'SMS' &&
                        <div>
                            <p>To disable 2-step Auth use your phone!</p>
                        </div>
                    }
                </div>
                <form name="form" onSubmit={this.handleSubmit}>
                    {errors['__common'] !== undefined &&
                        <div className="mb-3">{errors['__common']}</div>
                    }
                    {successMessage.length > 0 &&
                        <div className="mb-3">{successMessage}</div>
                    }
                    <div className={'form-group' + (submitted && !smsSent && !phone ? ' has-error' : '')}>
                        <input type="text" className="form-control" name="phone" placeholder="Phone number"
                               value={phone} onChange={this.handleChange} />
                        {submitted && !smsSent && !phone &&
                            <div>Please type in phone number</div>
                        }
                        {smsSent &&
                            <input type="text" className="form-control mt-3" name="smsCode" placeholder="Code from SMS"
                                value={smsCode} onChange={this.handleChange} />
                        }
                        {submitted && smsSent && !smsCode &&
                            <div>Please type in code from SMS</div>
                        }
                        {smsSent &&
                            <input type="password" className="form-control mt-3" name="password" placeholder="Password"
                               value={password} onChange={this.handleChange} />
                        }
                        {submitted && smsSent && !password &&
                            <div>Please type in password</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary pl-5 pr-5" disabled={submitting}>
                            {!smsSent && "Change"}
                            {smsSent && "Verify"}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { submitting, errors, phoneNumber, twoFactorAuth, smsSent, successMessage } = state.userSettings;
    return {
        submitting,
        errors,
        phoneNumber,
        twoFactorAuth,
        smsSent,
        successMessage
    };
}

function mapDispatchToProps(dispatch) {
    return({
        changePhoneNumber: (phone) => {
            dispatch(userActions.changePhoneNumber(phone))
        },
        verifyPhoneNumber: (smsCode, password) => {
            dispatch(userActions.verifyPhoneNumber(smsCode, password))
        },
        resetErrors: () => {
            dispatch(userActions.resetErrors())
        }
    })
}

const connectedSms = connect(mapStateToProps, mapDispatchToProps)(Sms);
export { connectedSms as Sms };