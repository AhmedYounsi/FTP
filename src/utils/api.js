import axios from 'axios';
 

const api = axios.create({
  baseURL: 'http://192.168.1.15:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });
 
 
export default api;