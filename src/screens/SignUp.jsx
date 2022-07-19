import React, { Component } from 'react';
import { Header, SignUp } from '../components/';

export class SignUpScreen extends Component {

    render() {
        return (
            <div>
                <Header />
                <SignUp />
            </div>
        );
    }
}