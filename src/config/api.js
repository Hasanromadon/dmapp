import axios from 'axios';

// Create base URL API
export const API = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER_URL ||
    'https://dumb-merch-0e003ee50c5b.herokuapp.com/api/v1' ||
    'http://localhost:5000/api/v1',
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export const apiHeader = {
  headers: {
    'Content-type': 'application/json',
  },
};
