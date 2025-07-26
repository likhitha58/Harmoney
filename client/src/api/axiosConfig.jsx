import axios from 'axios';

const baseURL = 'http://localhost:5000/api'; // adjust for prod

export const axiosInstance = axios.create({
  baseURL,
});
