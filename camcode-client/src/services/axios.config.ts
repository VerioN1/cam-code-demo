import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
