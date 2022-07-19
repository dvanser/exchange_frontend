import React from 'react';
import { OAuth2 } from '../components';


export function OAuth2Screen(props) {
    return(
        <OAuth2 queryParams={props.location.search} />
    );
}