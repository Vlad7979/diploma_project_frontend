import axios from 'axios';

const API_URL = 'http://localhost:8080/api/card/';

class CardService {

    getAllByUser(id) {
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

export default new CardService();