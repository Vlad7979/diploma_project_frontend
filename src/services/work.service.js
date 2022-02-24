import axios from 'axios';

const API_URL = 'http://localhost:8080/api/work/';

class WorkService {

    create(requestBody) {
        return axios.post(API_URL + "create", requestBody)
    }
}

export default new WorkService();