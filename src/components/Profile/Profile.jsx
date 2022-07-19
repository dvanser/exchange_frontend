import React, { Component } from 'react';
import { AccountVerification, Email, PasswordChange } from './';
import { TwoStepAuth } from './2FA';
import { history } from '../../_library';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/index';


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: null
        };

        this.updateTabHandle = this.updateTabHandle.bind(this);
    }

    componentDidMount() {

        const { synchronized } = this.props;

        if (!synchronized) {
            this.props.loadSettings();
        }

        if (this.props.match.params.tab !== undefined) {
            this.setState({tab: this.props.match.params.tab});
        } else if (synchronized) {

            if (this.props.authProvider === 'local') {
                this.setState({tab: 'password_change'});
            } else {
                this.setState({tab: 'account_verification'});
            }

        }
    }

    updateTabHandle(tab) {
        this.setState({tab});
        history.push('/profile/' + tab);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.match.params.tab !== this.props.match.params.tab) {

            let tab = nextProps.match.params.tab;

            if (tab === undefined) {
                tab = null;
            }

            this.setState({tab: tab});
        }

        return true;
    }

    render() {

        const { tab } = this.state;
        const { synchronized, authProvider } = this.props;

        return(
            <div className="container-fluid main-container mt-5">
                <div className="row position-fixed"><h3 className="ml-4">User</h3></div>
                <div className="row">
                    <div className="col-3 position-fixed mt-5">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                             aria-orientation="vertical">
                            {authProvider === 'local' &&
                                <span>
                                    <a onClick={() => {this.updateTabHandle('password_change')}}
                                       className={'nav-link ' + ((tab === null || tab === 'password_change') ? 'active' : '')}
                                       id="profile-password-change-tab" data-toggle="pill"
                                       href="#profile-password-change" role="tab" aria-controls="profile-password-change"
                                       aria-selected="true">
                                        Change Password
                                    </a>
                                    <a onClick={() => {this.updateTabHandle('2fa')}} className={'nav-link ' + ((tab === '2fa') ? 'active' : '')}
                                    id="profile-2fa-tab" data-toggle="pill"
                                    href="#profile-2fa" role="tab" aria-controls="profile-2fa"
                                    aria-selected="false">
                                    Two-Factor Authentication
                                    </a>
                                    <a onClick={() => {this.updateTabHandle('email')}}
                                    className={'nav-link ' + ((tab === 'email') ? 'active' : '')} id="profile-email-tab" data-toggle="pill"
                                    href="#profile-email" role="tab" aria-controls="profile-email"
                                    aria-selected="false">Email</a>
                                </span>
                            }
                            <a onClick={() => {this.updateTabHandle('account_verification')}}
                               className={'nav-link ' + (((tab === null && authProvider !== 'local') || tab === 'account_verification') ? 'active' : '')}
                               id="profile-account-verification-tab" data-toggle="pill"
                               href="#profile-account-verification" role="tab" aria-controls="profile-account-verification"
                               aria-selected="false">Account Verification</a>
                        </div>
                    </div>

                    <div className="col-12 col-md-9 offset-md-3">
                        <button className="btn btn-danger" onClick={this.props.removeUser}>Remove User(TEST)</button>
                        {!synchronized &&
                            <div className="tab-content" id="profile-tabContent">
                                Loading...
                            </div>
                        }
                        {synchronized &&
                            <div className="tab-content" id="profile-tabContent">
                                <div
                                    className={((tab === null && authProvider === 'local') || tab === 'password_change') ? "tab-pane fade show active" : 'tab-pane fade'}
                                    id="profile-password-change" role="tabpanel"
                                    aria-labelledby="profile-password-change-tab">
                                    <PasswordChange/>
                                </div>
                                <div className={(tab === '2fa') ? "tab-pane fade show active" : 'tab-pane fade'}
                                     id="profile-2fa" role="tabpanel"
                                     aria-labelledby="profile-2fa-tab">
                                    <TwoStepAuth />
                                </div>
                                <div className={(tab === 'email') ? "tab-pane fade show active" : 'tab-pane fade'}
                                     id="profile-email" role="tabpanel"
                                     aria-labelledby="profile-email-tab">
                                    <Email/>
                                </div>
                                <div
                                    className={((tab === null && authProvider !== 'local') || tab === 'account_verification') ? "tab-pane fade show active" : 'tab-pane fade'}
                                    id="profile-account-verification" role="tabpanel"
                                    aria-labelledby="profile-account-verification-tab">
                                    <AccountVerification/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { synchronized, authProvider } = state.userSettings;
    return {
        synchronized,
        authProvider
    };
}

function mapDispatchToProps(dispatch) {
    return({
        loadSettings: () => {
            dispatch(userActions.loadSettings())
        },
        removeUser: () => {
            dispatch(userActions.removeUser())
        }
    })
}

const connectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export { connectedProfile as Profile };