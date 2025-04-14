import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8004', // ajuste se necessário
});

export default api;
