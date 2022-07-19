import { userConstants } from '../_constants';


const initialState = {
    errors: {},
    successMessage: '',
    submitting: false
};

export function passwordReset(state = initialState, action) {
    switch (action.type) {
        case userConstants.PASSWORD_RESET_LINK_REQUEST:
        case userConstants.PASSWORD_RESET_REQUEST:
            state.submitting = true;
            return Object.assign({}, state);
        case userConstants.PASSWORD_RESET_LINK_SUCCESS:
        case userConstants.PASSWORD_RESET_SUCCESS:
            state.submitting = false;
            state.errors = {};
            state.successMessage = action.data.message;
            return Object.assign({}, state);
        case userConstants.PASSWORD_RESET_LINK_FAILURE:
        case userConstants.PASSWORD_RESET_FAILURE:
            state.submitting = false;
            state.successMessage = '';
            state.errors['__common'] = action.error.message;
            return Object.assign({}, state);
        case userConstants.RESET_PASSWORD_RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}