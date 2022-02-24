import axios from 'axios';

const API_URL = 'http://localhost:8080/api/address/';

class AddressService {

    create(requestBody) {
        return axios.post(API_URL + "create", requestBody)
    }
}

export default new AddressService();