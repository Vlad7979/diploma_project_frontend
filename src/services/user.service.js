import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
    getAllUsers() {
        return axios.get(API_URL + 'all');
    }

    block(id) {
        return axios.put(API_URL + 'block', null, {
            params: {
                id: id
            }
        })
    }

    unlock(id) {
        return axios.put(API_URL + 'unlock', null, {
            params: {
                id: id
            }
        })
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }
}

export default new UserService();
