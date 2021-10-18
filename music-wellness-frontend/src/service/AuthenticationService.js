import { BehaviorSubject } from 'rxjs';
import GlobalVariables from './GlobalVariables';
import { handleResponse } from '../helpers/HandleResponse';
import { Route, Redirect } from 'react-router-dom';
import { authHeader } from '../helpers/AuthHeader';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    registerAdmin,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${GlobalVariables.baseURL}/authenticate/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function register(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${GlobalVariables.baseURL}/authenticate/register`, requestOptions)
        .then(handleResponse)
        .then(message => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return message;
        });
}

function registerAdmin(username, password) {

    let config = {
        headers: authHeader()
    }

    let payLoad = {username: username, password: password};

    let response = GlobalVariables.axios.post('/authenticate/register-admin', payLoad, config)
    .then((response) => {
        return response;
    })
    return response;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}