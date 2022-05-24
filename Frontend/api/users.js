import instance from './index';
const baseURL = '/users';

class UsersApi {

    Login = (data) => {
        return instance.post(`${baseURL}/login`, data);
    }

    Register = (data) => {
        return instance.post(`${baseURL}/register`, data);
    }

}

export default UsersApi;