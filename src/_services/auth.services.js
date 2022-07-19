import { post } from '../_library/request';

export const authService = {
    login,
    logout,
    signUp
};

function login(email, password, code) {
    return post('/login', {email, password, code});
}

function logout() {
    return post('/logout', null);
}

function signUp(email) {
    return post('/signup', {email});
}