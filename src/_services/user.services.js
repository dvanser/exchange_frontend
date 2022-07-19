import { get, patch, post } from '../_library/request';

export const userService = {
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
    removeUser
};

function changePassword(currentPassword, newPassword) {
    return patch('/users/password', {currentPassword, newPassword});
}

function loadSettings() {
    return get('/users/profile');
}

function changeEmail(newEmail, receiveUpdateEmails) {
    return patch('/users/email-update-link', {newEmail, receiveUpdateEmails});
}

function changePhoneNumber(phone) {
    return patch('/users/phone-number', {phoneNumber: phone});
}

function verifyPhoneNumber(code, password) {
    return patch('/users/sms-authenticator', {code, password});
}

function changeGoogle2FAStatus(code, password) {
    return patch('/users/google-authenticator', {code, password});
}

function getVerificationUrl(firstName, lastName) {
    return patch('/users/verification', {firstName, lastName});
}

function confirmEmail(token) {
    return patch('/users/email', {token});
}

function requestPasswordReset(email) {
    return post('/reset-password-link', {email});
}

function passwordReset(newPassword, token) {
    return post('/reset-password', {newPassword, token});
}

function removeUser() {
    return post('/removeme', {});
}