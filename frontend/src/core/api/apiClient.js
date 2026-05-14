import axios from 'axios';

/*
 * Dammika's Note:
 * I set up this global Axios client so we don't have to keep typing out 
 * "http://localhost:5000/api" every single time we want to fetch data. 
 * If the backend URL ever changes, we only have to update it right here!
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
