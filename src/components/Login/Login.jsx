import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../_actions/index';
import { Link } from 'react-router-dom';
import { Social } from './';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            code: '',
            submitted: false,
            codeSubmitted: false
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

        const { email, password, code } = this.state;
        const { codeRequired } = this.props;

        if (codeRequired === null) {
            this.setState({submitted: true});
        } else {
            this.setState({ codeSubmitted: true });
        }

        if (codeRequired === null && email && password) {
            this.props.login(email, password);
        } else if (codeRequired !== null && code) {
            this.props.login(email, password, code);
        }
    }

    componentWillMount() {
        this.props.resetErrors();
    }

    componentDidMount() {
        const { loginPredefinedData } = this.props;

        if (loginPredefinedData.email !== undefined) {
            this.setState({
                email: loginPredefinedData.email
            });
        }
    }

    render() {

        const { loggingIn, errors, loginPredefinedData, codeRequired } = this.props;
        const { email, password, code, submitted, codeSubmitted } = this.state;

        return (
            <div className="container-fluid main-container mt-5">
                <div className="row">
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 mx-auto mt-5">
                        <div className="text-center">
                            <h3 className="mb-3">Log in</h3>
                        </div>
                        <form name="form" onSubmit={this.handleSubmit}>
                            {errors['__common'] !== undefined &&
                                <div className="mb-3">{errors['__common']}</div>
                            }
                            {codeRequired === null &&
                                <div>
                                    {loginPredefinedData.message !== undefined &&
                                    <div className="mb-3">{loginPredefinedData.message}</div>
                                    }
                                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                        <input type="text" className="form-control" name="email" placeholder="Email"
                                               value={email} onChange={this.handleChange}/>
                                        {submitted && !email &&
                                            <div>Email is required</div>
                                        }
                                        {errors['email'] !== undefined &&
                                            <div>{errors['email']}</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                        <input type="password" className="form-control" name="password"
                                               placeholder="Password" value={password} onChange={this.handleChange}/>
                                        {submitted && !password &&
                                            <div>Password is required</div>
                                        }
                                    </div>
                                </div>
                            }
                            {codeRequired !== null &&
                                <div>
                                    <div className="mb-3">
                                        Please enter code from {codeRequired === 'GOOGLE' ? 'Google Auth app' : 'SMS sent to you'}
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="email" placeholder="Email"
                                               value={email} disabled={true} />
                                    </div>
                                    <div className={'form-group' + (codeSubmitted && !code ? ' has-error' : '')}>
                                        <input type="text" className="form-control" name="code"
                                               placeholder="Code" value={code} onChange={this.handleChange}/>
                                        {codeSubmitted && !code &&
                                            <div>Code is required</div>
                                        }
                                    </div>
                                </div>
                            }
                            <div className="form-group">
                                <button className="btn btn-primary pl-5 pr-5" disabled={loggingIn}>Log in</button>
                                <Link to="/password/request/reset" className="float-right">Reset password</Link>
                            </div>
                        </form>
                        <div className="text-center">
                            Or log in with
                        </div>
                        <div>
                            <Social />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, errors, loginPredefinedData, codeRequired } = state.authentication;
    return {
        loggingIn,
        errors,
        loginPredefinedData,
        codeRequired
    };
}

function mapDispatchToProps(dispatch) {
    return({
        login: (email, password, code = "") => {
            dispatch(authActions.login(email, password, code))
        },
        resetErrors: () => {
            dispatch(authActions.resetErrors())
        }
    })
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export { connectedLogin as Login };