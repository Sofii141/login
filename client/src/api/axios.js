import axios from 'axios'

//dominio base que axios siempre va a consultar
const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    //para establecer las cookies en la baseURL
    withCredentials: true,
});

export default instance; 