import React, { Component } from 'react';
import { Header, Profile } from '../components/';


export class ProfileScreen extends Component {

    render() {

        return (
            <div>
                <Header />
                <Profile match={this.props.match} />
            </div>
        );
    }
}