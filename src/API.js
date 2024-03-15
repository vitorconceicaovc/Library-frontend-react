import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/catalog',
});

export const getBooks = async () => {
  try {
    const response = await instance.get('/rest_books/')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await instance.get(`/rest_book/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

export const getBooksInstances = async () => {
  try {
    const response = await instance.get('/rest_booksinstances')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error;
  }
};

export const getRequests = async () => {

  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found');
    return [];
  }

  try {
    const response = await instance.get('/requests/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })

    
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error;
  }
};
             
export const getAuthors = async () => {
    try {
        const response = await instance.get('/rest_authors')
        return response.data
    } catch (error) {
        console.error('Error fetching authors:', error)
        throw error;
    }
}

export const getAuthorById = async (id) => {
  try {
    const response = await instance.get(`/rest_author/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

export const logOut = async (navigate) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');  
  navigate('/');
  
}

export const getMyBooks = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found');
    return [];
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/catalog/rest_self_booksinstances/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const responseData = await response.json();
    const booksData = responseData.data;

    return booksData;
  } catch (error) {
    console.error('Fetch my books error:', error.message);
    return [];
  }
};

export const refreshToken = async () => {
  const token = localStorage.getItem('refreshToken');

  if (!token) {
    console.error('Refresh Token not found in localStorage');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: token }),
    });

    if (!response.ok) {
      throw new Error('Refresh Token verification failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access);

    console.log('New Access Token:', data.access);
  } catch (error) {
    console.error('Refresh Token error:', error.message);
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found in localStorage');
    return false;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/token/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      refreshToken();
      throw new Error('Token verification failed');
    }

    const verificationData = await response.json();
    console.log('Token verification response:', verificationData);
    return true;
  } catch (error) {
    console.error('Token verification error:', error.message);
    return false;
  }
};

export const getMyStatus = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found');
    return [];
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/rest_self_user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch my status');
    }

    const responseData = await response.json();
    const userData = responseData;

    console.log(userData)

    return userData;
  } catch (error) {
    console.error('Fetch my user status error:', error.message);
    return [];
  }
};

export const verifyLogin = async () => {
  try {
    const token = localStorage.getItem('token');
    return !!token; 
  } catch (error) {
    console.error('Error verifying authentication:', error);
    throw error;
  }
};