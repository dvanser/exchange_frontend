import { authConstants, userConstants } from '../_constants';
import { authService } from '../_services';
import { history } from '../_library';
import config from '../config';


export const authActions = {
    login,
    oauthLogin,
    logout,
    signUp,
    resetErrors
};

function login(email, password, code) {
    return dispatch => {
        dispatch(request());

        authService.login(email, password, code)
            .then(data => {

                if (data.codeRequired !== undefined) {
                    dispatch(askForCode(data));
                } else {
                    localStorage.setItem(config.accessTokenName, data.accessToken);
                    dispatch(success({'email': email}));
                    dispatch(resetSettings());
                    history.push('/');
                }
            }).catch(error => {
                dispatch(failure(error.message));
            });
    };

    function request() { return { type: authConstants.LOGIN_REQUEST } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function askForCode(data) { return { type: authConstants.LOGIN_ASK_CODE, data } }
    function resetSettings() { return { type: userConstants.RESET_SETTINGS } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function oauthLogin(accessToken) {
    return dispatch => {
        dispatch(request());
        localStorage.setItem(config.accessTokenName, accessToken);
        dispatch(success({})); //TODO: michael: fetch user data, but ensure token is set in local storage, or pass it as param
        history.push('/');
    };

    function request() { return {type: authConstants.LOGIN_OAUTH_REQUEST} }
    function success(user) { return {type: authConstants.LOGIN_OAUTH_SUCCESS, user} }
}

function logout() {
    return dispatch => {

        authService.logout()
            .then(
                data => {
                    localStorage.removeItem(config.accessTokenName);
                    dispatch(success());
                    history.push('/');
                },
                error => {
                    localStorage.removeItem(config.accessTokenName);
                    dispatch(failure());
                    history.push('/');
                }
            );
    };

    function success() { return { type: authConstants.LOGOUT } }
    function failure() { return { type: authConstants.LOGOUT } }
}

function signUp(email) {
    return dispatch => {
        dispatch(request());

        authService.signUp(email)
            .then(data => {
                dispatch(success({'email': email, 'message': data.message}));
                history.push('/login');
            }).catch(error => {
                dispatch(failure(error.message));
            });
    };

    function request() { return { type: authConstants.SIGN_UP_REQUEST } }
    function success(data) { return { type: authConstants.SIGN_UP_SUCCESS, data } }
    function failure(error) { return { type: authConstants.SIGN_UP_FAILURE, error } }
}

function resetErrors() {
    return { type: authConstants.RESET_ERRORS };
}
