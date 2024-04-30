// Importing the decode function from the jwt-decode library
import decode from "jwt-decode";

// Class definition for AuthService
class AuthService {
  // Method to get the user profile from the decoded token
  getProfile() {
    return decode(this.getToken());
  }

  // Method to check if the user is logged in
  loggedIn() {
    // Getting the token
    const token = this.getToken();
    // Checking if token exists and is not expired
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if the token is expired
  isTokenExpired(token) {
    try {
      // Decoding the token
      const decoded = decode(token);
      // Checking if the expiration time of the token is in the past
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Method to get the token from local storage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Method to store the token in local storage and redirect to the home page
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Method to remove the token from local storage and redirect to the home page
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

// Exporting an instance of the AuthService class
export default new AuthService();
