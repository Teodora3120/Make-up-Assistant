import instance from './index';
const baseURL = '/users';

export default class UsersApi {

   static Login = (data) => {
        console.log(data);
        return instance.post(`${baseURL}/login`, data);
    }

   static Register = (data) => {
        return instance.post(`${baseURL}/register`, data);
    }

}
