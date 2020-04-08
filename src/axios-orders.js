import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-125ab.firebaseio.com/'
});

export default instance;