import { authConstants } from '../_constants';


const initialState = {
    loggedIn: false,
    loggingIn: false,
    signingUp: false,
    errors: {},
    codeRequired: null,
    loginPredefinedData: {},
    synchronized: false
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
        case authConstants.LOGIN_OAUTH_REQUEST:
            state = {...initialState, loggingIn: true, synchronized: true};

            return Object.assign({}, state);
        case authConstants.LOGIN_ASK_CODE:
            state.loggingIn = false;
            state.errors = {};
            state.codeRequired = action.data.codeRequired;

            return Object.assign({}, state);
        case authConstants.LOGIN_SUCCESS:
        case authConstants.LOGIN_OAUTH_SUCCESS:
            state.loggingIn = false;
            state.loggedIn = true;
            state.user = action.user;
            state.synchronized = true;
            state.codeRequired = null;
            state.loginPredefinedData = {};
            return Object.assign({}, state);
        case authConstants.LOGIN_FAILURE:
            state.loggingIn = false;
            state.synchronized = true;

            if (action.error !== undefined && action.error.length !== 0) {
                state.errors['__common'] = action.error;
            } else {
                state.errors['__common'] = 'Wrong data supplied!';
            }

            return Object.assign({}, state);
        case authConstants.LOGOUT:
            return {...initialState, synchronized: true};
        case authConstants.SIGN_UP_REQUEST:
            state = {...initialState, signingUp: true, synchronized: true};
            return Object.assign({}, state);
        case authConstants.SIGN_UP_SUCCESS:
            state.signingUp = false;
            state.loggedIn = false;
            state.loggingIn = false;
            state.errors = {};
            state.loginPredefinedData = {
                email: action.data.email,
                message: action.data.message
            };

            return Object.assign({}, state);
        case authConstants.SIGN_UP_FAILURE:
            state.signingUp = false;
            state.synchronized = true;

            if (action.error !== undefined) {
                state.errors['__common'] = action.error;
            }

            return Object.assign({}, state);
        case authConstants.RESET_ERRORS:
            state.errors = {};
            return Object.assign({}, state);
        case authConstants.LOAD_USER_DATA_SUCCESS:

            if (state.synchronized && state.user !== undefined) {
                return state;
            } else {
                state.user = {
                    email: action.data.email
                };

                state.synchronized = true;
                return Object.assign({}, state);
            }
        default:
            return state;
    }
}