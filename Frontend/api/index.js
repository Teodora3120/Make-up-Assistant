import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use(
    (config) => {
        if (JSON.parse(localStorage.getItem('user'))) {
            config.headers.Authorization = JSON.parse(localStorage.getItem('user')).token;
        }
        else {
            config.headers.Authorization = '';
        }
        return Promise.resolve(config);
    },
    (error) => Promise.reject(error)
);


instance.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;