import React, { Component } from 'react';
import { Header, Login } from '../components/';


export class LoginScreen extends Component {

    render() {
        return (
            <div>
                <Header />
                <Login />
            </div>
        );
    }
}