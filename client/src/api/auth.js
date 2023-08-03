import axios from './axios'
//---------------------------------------------------------------------

// const API = 'http://localhost:3000/api'

//crear una peticion de registro a la cual se le pasa un usuario y se hace una peticion post con 
//ese usuario
export const registerRequest = user => axios.post(`/register`, user);

//peticion para el login
export const loginRequest = user => axios.post(`/login`, user);

export const verityTokenRequest = () => axios.get('/verify'); 
