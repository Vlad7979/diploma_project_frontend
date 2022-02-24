import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          if (response.data.roles.includes("ROLE_ALLOW_EDIT")) {
            localStorage.setItem("current_user", JSON.stringify(response.data));
          }
          localStorage.setItem("user", JSON.stringify(response.data))
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("current_user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('current_user'));
  }

  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('current_user')).id
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserId() {
    return JSON.parse(localStorage.getItem('user')).id;
  }
}

export default new AuthService();
