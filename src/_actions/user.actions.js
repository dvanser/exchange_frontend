import { userConstants, authConstants } from '../_constants';
import { userService } from '../_services';
import { history } from '../_library';


export const userActions = {
    changePassword,
    loadSettings,
    changeEmail,
    changePhoneNumber,
    verifyPhoneNumber,
    changeGoogle2FAStatus,
    getVerificationUrl,
    confirmEmail,
    requestPasswordReset,
    passwordReset,
    removeUser,
    resetErrors,
    resetPasswordResetMessages
};

function changePassword(currentPassword, newPassword) {
    return dispatch => {
        dispatch(request());

        userService.changePassword(currentPassword, newPassword)
            .then(data => {
                dispatch(success(data));
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.PASSWORD_CHANGE_REQUEST } }
    function success(data) { return { type: userConstants.PASSWORD_CHANGE_SUCCESS, data } }
    function failure(error) { return { type: userConstants.PASSWORD_CHANGE_FAILURE, error } }
}

function loadSettings() {
    return dispatch => {
        dispatch(request());

        userService.loadSettings()
            .then(data => {
                dispatch(success(data));
                dispatch(loggedInData(data))
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.LOAD_SETTINGS_REQUEST } }
    function success(data) { return { type: userConstants.LOAD_SETTINGS_SUCCESS, data } }
    function loggedInData(data) { return { type: authConstants.LOAD_USER_DATA_SUCCESS, data } }
    function failure(error) { return { type: userConstants.LOAD_SETTINGS_FAILURE, error } }
}

function changeEmail(email, receiveUpdates) {
    return dispatch => {
        dispatch(request());

        userService.changeEmail(email, receiveUpdates)
            .then(data => {
                dispatch(success(data));
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.CHANGE_EMAIL_REQUEST } }
    function success(data) { return { type: userConstants.CHANGE_EMAIL_SUCCESS, data } }
    function failure(error) { return { type: userConstants.CHANGE_EMAIL_FAILURE, error } }
}

function changePhoneNumber(phone) {
    return dispatch => {
        dispatch(request());

        userService.changePhoneNumber(phone)
            .then(data => {
                dispatch(success({phone}));
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.CHANGE_PHONE_NUMBER_REQUEST } }
    function success(data) { return { type: userConstants.CHANGE_PHONE_NUMBER_SUCCESS, data } }
    function failure(error) { return { type: userConstants.CHANGE_PHONE_NUMBER_FAILURE, error } }
}

function verifyPhoneNumber(code, password) {
    return dispatch => {
        dispatch(request());

        userService.verifyPhoneNumber(code, password)
            .then(data => {
                dispatch(success(data));
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.VERIFY_PHONE_NUMBER_REQUEST } }
    function success(data) { return { type: userConstants.VERIFY_PHONE_NUMBER_SUCCESS, data } }
    function failure(error) { return { type: userConstants.VERIFY_PHONE_NUMBER_FAILURE, error } }
}

function changeGoogle2FAStatus(code, password) {
    return dispatch => {
        dispatch(request());

        userService.changeGoogle2FAStatus(code, password)
            .then(data => {
                dispatch(success(data));
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.CHANGE_GOOGLE_2FA_STATUS_REQUEST } }
    function success(data) { return { type: userConstants.CHANGE_GOOGLE_2FA_STATUS_SUCCESS, data } }
    function failure(error) { return { type: userConstants.CHANGE_GOOGLE_2FA_STATUS_FAILURE, error } }
}

function getVerificationUrl(firstName, lastName) {
    return dispatch => {
        dispatch(request());

        userService.getVerificationUrl(firstName, lastName)
            .then(data => {
                dispatch(success(data));
                window.location = data.verificationUrl
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.GET_VERIFICATION_URL_REQUEST } }
    function success(data) { return { type: userConstants.GET_VERIFICATION_URL_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GET_VERIFICATION_URL_FAILURE, error } }
}

function confirmEmail(token) {
    return dispatch => {
        dispatch(request());

        userService.confirmEmail(token)
            .then(data => {
                dispatch(success(data));
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.CHANGE_EMAIL_CONFIRM_REQUEST } }
    function success(data) { return { type: userConstants.CHANGE_EMAIL_CONFIRM_SUCCESS, data } }
    function failure(error) { return { type: userConstants.CHANGE_EMAIL_CONFIRM_FAILURE, error } }
}

function requestPasswordReset(email) {
    return dispatch => {
        dispatch(request());

        userService.requestPasswordReset(email)
            .then(data => {
                dispatch(success(data));
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.PASSWORD_RESET_LINK_REQUEST } }
    function success(data) { return { type: userConstants.PASSWORD_RESET_LINK_SUCCESS, data } }
    function failure(error) { return { type: userConstants.PASSWORD_RESET_LINK_FAILURE, error } }
}

function passwordReset(password, token) {
    return dispatch => {
        dispatch(request());

        userService.passwordReset(password, token)
            .then(data => {
                dispatch(success(data));
                history.push('/');
            }).catch(error => {
                dispatch(failure(error));
            });
    };

    function request() { return { type: userConstants.PASSWORD_RESET_REQUEST } }
    function success(data) { return { type: userConstants.PASSWORD_RESET_SUCCESS, data } }
    function failure(error) { return { type: userConstants.PASSWORD_RESET_FAILURE, error } }
}

function removeUser() {
    return dispatch => {
        dispatch(request());

        userService.removeUser()
            .then(data => {
                dispatch(success());
                history.push('/login');
            }).catch(error => {
            dispatch(failure(error));
        });
    };

    function request() { return { type: userConstants.REMOVE_USER_REQUEST } }
    function success() { return { type: userConstants.REMOVE_USER_SUCCESS } }
    function failure(error) { return { type: userConstants.REMOVE_USER_FAILURE, error } }
}

function resetErrors() {
    return { type: userConstants.RESET_ERRORS };
}

function resetPasswordResetMessages() {
    return { type: userConstants.RESET_PASSWORD_RESET };
}