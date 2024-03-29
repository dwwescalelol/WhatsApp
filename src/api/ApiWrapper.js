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

  addContact: async (token, userId) => {
    return await fetch(`${baseURL}/user/${userId}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  removeContact: async (token, userId) => {
    return await fetch(`${baseURL}/user/${userId}/contact`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  blockUser: async (token, userId) => {
    return await fetch(`${baseURL}/user/${userId}/block`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    });
  },

  unblockUser: async (token, userId) => {
    return await fetch(`${baseURL}/user/${userId}/block`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
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
  searchUsers: async (
    token,
    query,
    searchIn = 'all',
    limit = 20,
    offset = 0
  ) => {
    return await fetch(
      `${baseURL}/search?q=${query}&search_in=${searchIn}&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Authorization': token,
        },
      }
    );
  },

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
  getBlockedUsers: async (token) => {
    return await fetch(`${baseURL}/blocked`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  // CHAT

  getChats: async (token) => {
    return await fetch(`${baseURL}/chat`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  createChat: async (token, name) => {
    return await fetch(`${baseURL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({ name }),
    });
  },

  addUserToChat: async (token, chat_id, user_id) => {
    return await fetch(`${baseURL}/chat/${chat_id}/user/${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  getChatDetails: async (token, chat_id, limit = 20, offset = 0) => {
    return await fetch(
      `${baseURL}/chat/${chat_id}?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Authorization': token,
        },
      }
    );
  },

  updateChat: async (token, chat_id, name) => {
    return await fetch(`${baseURL}/chat/${chat_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({ name }),
    });
  },

  removeUserFromChat: async (token, chat_id, user_id) => {
    return await fetch(`${baseURL}/chat/${chat_id}/user/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Authorization': token,
      },
    });
  },

  sendMessage: async (token, chat_id, message) => {
    const response = await fetch(`${baseURL}/chat/${chat_id}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({ message }),
    });
    return response;
  },

  updateMessage: async (token, chat_id, message_id, message) => {
    const response = await fetch(
      `${baseURL}/chat/${chat_id}/message/${message_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify({ message }),
      }
    );
    return response;
  },

  deleteMessage: async (token, chat_id, message_id) => {
    const response = await fetch(
      `${baseURL}/chat/${chat_id}/message/${message_id}`,
      {
        method: 'DELETE',
        headers: {
          'X-Authorization': token,
        },
      }
    );
    return response;
  },
};

export default ApiWrapper;
