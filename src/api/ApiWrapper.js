import fetch from 'node-fetch';

const baseURL = 'http://localhost:3333/api/1.0.0';

const ApiWrapper = {
  // USER
  register: async (firstName, lastName, email, password) => {
    return await fetch(`${baseURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    });
  },

  getUserInfo: async (token, userId) => {
    return await fetch(`${baseURL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  updateUserInfo: async (token, userId, data) => {
    return await fetch(`${baseURL}/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(data),
    });
  },

  // LOGIN
  login: async (email, password) => {
    return await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  },

  // LOGOUT
  logout: async (token) => {
    return await fetch(`${baseURL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  // SEARCH

  // CONTACTS

  // BLOCKED

  // CHAT
};

export default ApiWrapper;
