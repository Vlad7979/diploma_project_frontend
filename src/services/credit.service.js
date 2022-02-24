import axios from 'axios';

const API_URL = 'http://localhost:8080/api/credit/';

class CreditService {

    get(id) {
        return axios.get(API_URL + "get", {
            params: {
                id: id
            }
        })
    }

    getMainDebt(id) {
        return axios.get(API_URL + "get-main-debt", {
            params: {
                id: id
            }
        })
    }

    getByUser(id) {
        return axios.get(API_URL + "get-by-user", {
            params: {
                id: id
            }
        })
    }

    create(requestBody) {
        return axios.post(API_URL + "create", requestBody)
    }
}

export default new CreditService();