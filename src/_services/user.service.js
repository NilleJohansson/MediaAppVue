// import config from 'config';
import axios from 'axios';
// import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

function login(username, password) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };

    const loginUser = {
        username,
        password
    };

    return axios.post('/users/authenticate', loginUser).then(function(user) {
        // handleResponse(response).then(function(user) {
            console.log("User", user);
            if (user.data.token) {
                console.log("User token", user.data.token);
                localStorage.setItem('user', JSON.stringify(user.data));
            }
            return user.data;
        // });
    });

    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // login successful if there's a jwt token in the response
    //         if (user.token) {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));
    //         }

    //         return user;
    //     });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(user)
    // };

    return axios.post('/users/register', user).then(function(response) {
        handleResponse(response)
    });
}

    // return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);


// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }


// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             // logout();
    //             location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         console.log(error);
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
    return response;
}