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

  getAvatar: async (token, userId) => {
    return await fetch(`${baseURL}/user/${userId}/photo`, {
      method: 'GET',
      headers: {
        Accept: 'image/png, image/jpeg',
        'X-Authorization': token,
      },
    });
  },

  uploadAvatar: async (token, userId, image) => {
    return await fetch(`${baseURL}/user/${userId}/photo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/png',
        'X-Authorization': token,
      },
      body: image,
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
  getContacts: async (token) => {
    return await fetch(`${baseURL}/contacts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  // BLOCKED

  // CHAT
};

export default ApiWrapper;
