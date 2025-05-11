import axios from 'axios';

const api = axios.create({
  baseURL: '/dev_test',
  withCredentials: true,
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json', 
  }
});

export default api;