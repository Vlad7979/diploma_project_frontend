import axios from 'axios';

const API_URL = 'http://localhost:8080/api/borrower/';

class BorrowerService {

    create(requestBody) {
        return axios.post(API_URL + "create", requestBody)
    }
}

export default new BorrowerService();