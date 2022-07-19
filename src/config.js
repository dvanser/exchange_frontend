let config = {
    // baseUrl: 'https://api.dev.exchange.com',
    baseUrl: 'https://ws.amlione.com',
    accessTokenName: 'access_token',
    oauth2RedirectPath: '/login/oauth2',
    // get oauth2RedirectUrl() { return 'https://dev.exchange.com' + this.oauth2RedirectPath },
    get oauth2RedirectUrl() { return 'https://wp.amlione.com' + this.oauth2RedirectPath },
    get googleAuthUrl() { return this.baseUrl + '/oauth2/login/google?redirect_url=' + this.oauth2RedirectUrl },
    get facebookAuthUrl() { return this.baseUrl + '/oauth2/login/facebook?redirect_url=' + this.oauth2RedirectUrl }
};

export default Object.freeze(Object.assign({}, config));