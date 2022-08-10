import axios from 'axios';

const http = axios.create({
    baseURL: 'https://api.cookgredients.com',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default http;