import axios from 'axios';

const API_URL = 'http://localhost:8080/api/payment/';

class BorrowerService {

    getByCreditId(id) {
        return axios.get(API_URL + "get-by-credit", {
            params: {
                id: id
            }
        })
    }

    create(requestBody) {
        return axios.post(API_URL + "create", requestBody)
    }
}

export default new BorrowerService();