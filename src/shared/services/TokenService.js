const TokenService = {
  connexion(token) {
    localStorage.setItem("authToken", token);
  },

  getToken() {
    return localStorage.getItem("authToken");
  },

  deconnexion() {
    localStorage.removeItem("authToken");
  },

  isAuthenticated() {
    return localStorage.getItem("authToken") ? true : false;
  },
};

export default TokenService;
