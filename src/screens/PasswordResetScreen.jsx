import React, { Component } from 'react';
import { PasswordReset } from '../components';


export class PasswordResetScreen extends Component {

    render() {
        return (
            <PasswordReset queryParams={this.props.match.params} />
        );
    }
}