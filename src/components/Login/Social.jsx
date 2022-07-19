import React from 'react';
import config from '../../config';


export function Social() {
    return(
        <div className="mt-3 text-center">
            <a className="btn btn-secondary facebook mr-5" href={config.facebookAuthUrl}>Facebook</a>
            <a className="btn btn-secondary google" href={config.googleAuthUrl}>Google+</a>
        </div>
    );
}