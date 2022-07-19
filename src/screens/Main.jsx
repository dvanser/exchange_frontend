import React, { Component } from 'react';
import { Header, Main } from '../components/';


export class MainScreen extends Component {

    render() {

        return (
            <div>
                <Header />
                <Main queryParams={this.props.match.params} />
            </div>
        );
    }
}