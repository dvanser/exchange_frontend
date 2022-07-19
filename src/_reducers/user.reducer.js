import { userConstants } from '../_constants';


const initialState = {
    submitting: false,
    synchronized: false,
    errors: {},
    successMessage: '',
    emailVerified: false,
    email: '',
    newEmail: '',
    firstName: '',
    lastName: '',
    accountVerificationStatus: 'NOT_VERIFIED',
    authProvider: 'facebook',
    receiveUpdateEmails: true,
    twoFactorAuth: 'NONE',
    phoneNumber: '',
    smsSent: false,
    phoneNumberVerified: false,
    googleQRUrl: ''
};

export function userSettings(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOAD_SETTINGS_REQUEST:
            state.submitting = true;
            state.successMessage = '';
            return Object.assign({}, state);
        case userConstants.LOAD_SETTINGS_SUCCESS:
            state.synchronized = true;
            state.submitting = false;
            return Object.assign({}, {...state, ...action.data});
        case userConstants.LOAD_SETTINGS_FAILURE:
            state.submitting = false;
            return Object.assign({...state}, action.data);
        case userConstants.PASSWORD_CHANGE_REQUEST:
            state.submitting = true;
            state.successMessage = '';
            return Object.assign({}, state);
        case userConstants.PASSWORD_CHANGE_SUCCESS:
            state.submitting = false;
            state.successMessage = action.data.message;
            state.errors = {};
            return Object.assign({}, state);
        case userConstants.PASSWORD_CHANGE_FAILURE:
            state.submitting = false;

            if (action.error !== undefined) {
                state.errors['__common'] = (typeof action.error === 'object' && action.error !== null) ? action.error.message : action.error;
            }

            return Object.assign({}, state);
        case userConstants.CHANGE_EMAIL_REQUEST:
            state.submitting = true;
            state.successMessage = '';
            return Object.assign({}, state);
        case userConstants.CHANGE_EMAIL_SUCCESS:
            state.submitting = false;
            state.emailVerified = false; //new email set and not verified by default
            state.successMessage = action.data.message;
            state.errors = {};
            return Object.assign({}, state);
        case userConstants.CHANGE_EMAIL_FAILURE:
            state.submitting = false;
            state.errors['__common'] = action.error.message;
            return Object.assign({...state}, action.data);
        case userConstants.CHANGE_PHONE_NUMBER_REQUEST:
            state.submitting = true;
            state.successMessage = '';
            return Object.assign({}, state);
        case userConstants.CHANGE_PHONE_NUMBER_SUCCESS:
            state.submitting = false;
            state.smsSent = true;
            state.errors = {};
            state.phoneNumber = action.data.phone;
            return Object.assign({}, state);
        case userConstants.CHANGE_PHONE_NUMBER_FAILURE:

            if (action.error !== undefined) {
                state.errors['__common'] = (typeof action.error === 'object' && action.error !== null) ? action.error.message : action.error;
            }

            state.submitting = false;
            return Object.assign({}, state);
        case userConstants.VERIFY_PHONE_NUMBER_REQUEST:
            state.submitting = true;
            state.successMessage = '';
            return Object.assign({}, state);
        case userConstants.VERIFY_PHONE_NUMBER_SUCCESS:
            state.submitting = false;
            state.phoneNumberVerified = true;
            state.smsSent = false;
            state.twoFactorAuth = action.data.twoFactorAuth;
            state.successMessage = action.data.message;
            state.errors = {};
            return Object.assign({}, state);
        case userConstants.VERIFY_PHONE_NUMBER_FAILURE:

            if (action.error !== undefined) {
                state.errors['__common'] = (typeof action.error === 'object' && action.error !== null) ? action.error.message : action.error;
            }

            state.submitting = false;
            return Object.assign({}, state);
        case userConstants.CHANGE_GOOGLE_2FA_STATUS_REQUEST:
            state.submitting = true;
            return Object.assign({}, state);
        case userConstants.CHANGE_GOOGLE_2FA_STATUS_SUCCESS:
            state.submitting = false;
            state.twoFactorAuth = action.data.twoFactorAuth;

            if (action.data.googleQRUrl !== undefined) {
                state.googleQRUrl = action.data.googleQRUrl;
            }

            state.errors = {};
            return Object.assign({}, state);
        case userConstants.CHANGE_GOOGLE_2FA_STATUS_FAILURE:

            if (action.error !== undefined) {
                state.errors['__common'] = (typeof action.error === 'object' && action.error !== null) ? action.error.message : action.error;
            }

            state.submitting = false;
            return Object.assign({}, state);
        case userConstants.GET_VERIFICATION_URL_REQUEST:
            state.successMessage = '';
            state.submitting = true;
            return Object.assign({}, state);
        case userConstants.GET_VERIFICATION_URL_SUCCESS:
            state.submitting = false;
            return Object.assign({}, state);
        case userConstants.GET_VERIFICATION_URL_FAILURE:

            if (action.error !== undefined) {
                state.errors['__common'] = (typeof action.error === 'object' && action.error !== null) ? action.error.message : action.error;
            }

            state.submitting = false;
            return Object.assign({}, state);
        case userConstants.CHANGE_EMAIL_CONFIRM_REQUEST:
            state.successMessage = '';
            return state;
        case userConstants.CHANGE_EMAIL_CONFIRM_SUCCESS:
            state.successMessage = action.data.message;

            return Object.assign({}, state);
        case userConstants.CHANGE_EMAIL_CONFIRM_FAILURE:
            state.errors['__common'] = (typeof action.error === 'object' && action.error !== null) ? action.error.message : action.error;

            return Object.assign({}, state);
        case userConstants.RESET_SETTINGS:
            return Object.assign({}, {...initialState});
        case userConstants.RESET_ERRORS:
            state.errors = {};
            state.successMessage = '';
            return Object.assign({}, state);
        default:
            return state;
    }
}