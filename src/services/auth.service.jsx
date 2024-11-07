import axios from "axios";

const API_URL = "http://localhost:8000/api/comptes/";

const register = (username, email, password,role) => {
  return axios.post(API_URL + "register/", {
    username,
    email,
    password,
    role
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "token/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = async() => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;