import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api",
  withCredentials: true,
});

function errorHandler(error) {
  if (error.response) {
    console.log(error.response.data.message);
    throw error.response.data;
  }
  throw error;
}



const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },


  getSnippets() {
    return service
      .get("/api/snippet")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(data) {
    return service
      .patch("/api/user/:id", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfos() {
    return service
      .get("/api/user/:id")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeSnippet(snippetId) {
    return service
      .delete(`/api/snippet${snippetId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateSnippet(snippetId, data) {
    return service
      .patch(`/api/snippet${snippetId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserSnippets() {
    return service
      .get("/api/user/:id/snippet")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addSnippet(data) {
    return service
      .post("/api/snippet", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default apiHandler;