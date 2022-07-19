import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions';


class GoogleAuth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            code: '',
            password: '',
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
        const { code, password } = this.state;

        if (code && password) {
            this.props.changeGoogle2FAStatus(code, password);
            //TODO: michael: dispatch request here and when done with success clear fields and change submitted to false
        }
    }

    componentDidMount() {
        this.props.resetErrors();
    }

    render() {

        const { code, submitted, password } = this.state;
        const { submitting, errors, googleQRUrl, twoFactorAuth } = this.props;

        return (
            <div>
                {twoFactorAuth !== 'GOOGLE' &&
                    <div>
                        <p>
                            Use Google Authenticator to scan QR code and confirm 2-step authentication enabling by providing code from
                            app.
                        </p>
                        <img className="mx-auto" alt="2fa google qr code" src={googleQRUrl} />
                    </div>
                }
                <form name="form" onSubmit={this.handleSubmit} className="mt-3">
                    {errors['__common'] !== undefined &&
                        <div className="mb-3">{errors['__common']}</div>
                    }
                    <div className={'form-group' + (submitted && !code ? ' has-error' : '')}>
                        <input type="text" className="form-control" name="code" placeholder="Code"
                               value={code} onChange={this.handleChange} />
                        {submitted && !code &&
                            <div>Please type in Code from Google Auth app</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control" name="password" placeholder="Password"
                               value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div>Please type in password</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary pl-5 pr-5" disabled={submitting}>
                            {twoFactorAuth === 'GOOGLE' ? 'Disable' : 'Enable'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { submitting, errors, googleQRUrl, twoFactorAuth } = state.userSettings;
    return {
        submitting,
        errors,
        googleQRUrl,
        twoFactorAuth
    };
}

function mapDispatchToProps(dispatch) {
    return({
        changeGoogle2FAStatus: (code, password) => {
            dispatch(userActions.changeGoogle2FAStatus(code, password))
        },
        resetErrors: () => {
            dispatch(userActions.resetErrors())
        }
    })
}

const connectedGoogleAuth = connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
export { connectedGoogleAuth as GoogleAuth };