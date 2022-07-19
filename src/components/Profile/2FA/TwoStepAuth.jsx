import React, { Component } from 'react';
import { GoogleAuth, Sms } from './';
import { connect } from 'react-redux';


class TwoStepAuth extends Component {

    render() {

        const { twoFactorAuth } = this.props;

        return (
            <div className="row">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 mt-5">
                    <div>
                        <h4>
                            {twoFactorAuth === 'GOOGLE' ? '2-step authentication enabled with Google Auth' :
                            (twoFactorAuth === 'SMS' ? '2-step authentication enabled with SMS' : '2-step authentication disabled')}
                        </h4>
                    </div>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className={'nav-link ' + (twoFactorAuth === 'GOOGLE' || twoFactorAuth === 'NONE' ? 'active' : '')}
                               id="google-2fa-tab" data-toggle="pill" href="#google-2fa"
                               role="tab" aria-controls="pills-home" aria-selected="true">Google</a>
                        </li>
                        <li className="nav-item ml-3">
                            <a className={'nav-link ' + (twoFactorAuth === 'SMS' ? 'active' : '')} id="sms-2fa-tab" data-toggle="pill" href="#sms-2fa"
                               role="tab" aria-controls="pills-profile" aria-selected="false">Sms</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className={'tab-pane fade ' + (twoFactorAuth === 'GOOGLE' || twoFactorAuth === 'NONE' ? 'show active' : '')}
                             id="google-2fa" role="tabpanel" aria-labelledby="google-2fa-tab">
                            <GoogleAuth />
                        </div>
                        <div className={'tab-pane fade ' + (twoFactorAuth === 'SMS' ? 'show active' : '')} id="sms-2fa"
                             role="tabpanel" aria-labelledby="sms-2fa-tab">
                            <Sms />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { twoFactorAuth } = state.userSettings;
    return {
        twoFactorAuth
    };
}

const connectedTwoStepAuth = connect(mapStateToProps)(TwoStepAuth);
export { connectedTwoStepAuth as TwoStepAuth };