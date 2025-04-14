import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8004', // ajuste se necessário
});

export default api;
