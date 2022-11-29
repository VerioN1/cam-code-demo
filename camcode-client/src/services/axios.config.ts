import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || 'http://192.168.0.171:8081/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
