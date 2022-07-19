import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../_actions';


class SignUp extends Component {

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

        this.setState({ submitted: true });
        const { email } = this.state;

        if (email) {
            this.props.signUp(email);
        }
    }

    componentWillMount() {
        this.props.resetErrors();
    }

    render() {

        const { signingUp, errors } = this.props;
        const { email, submitted } = this.state;

        return(
            <div className="container-fluid main-container mt-5">
                <div className="row">
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 mx-auto mt-5">
                        <div className="text-center">
                            <h3 className="mb-3">Sign up</h3>
                        </div>
                        <form name="form" onSubmit={this.handleSubmit}>
                            {errors['__common'] !== undefined &&
                            <div className="mb-3">{errors['__common']}</div>
                            }
                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                <div>Email is required</div>
                                }
                                {errors['email'] !== undefined &&
                                <div>{errors['email']}</div>
                                }
                            </div>
                            <div className="form-group mt-4">
                                <button className="btn btn-primary pl-5 pr-5" disabled={signingUp}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { signingUp, errors } = state.authentication;
    return {
        signingUp,
        errors
    };
}

function mapDispatchToProps(dispatch) {
    return({
        signUp: (email) => {
            dispatch(authActions.signUp(email))
        },
        resetErrors: () => {
            dispatch(authActions.resetErrors())
        }
    })
}

const connectedSignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);
export { connectedSignUp as SignUp };
