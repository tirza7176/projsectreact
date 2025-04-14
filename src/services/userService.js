import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = "token";
refreshToken()
function createUser(user) {
    return httpService.post("/users", user)
}
async function login(credentials) {
    const response = await httpService.post("/users/login", credentials);
    setToken(response.data)


    return response;
}
function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    refreshToken()
}
function refreshToken() {
    httpService.setDefultCommonHeaders("x-auth-token", getJwt());
}
function getJwt() {
    return localStorage.getItem(TOKEN_KEY)
}
async function getUserbyid(userid) {

    const response = await httpService.get("/users/" + userid);

    return response.data;

}
function getUser() {
    const token = getJwt()


}

getUser()


const userService = {
    createUser,
    login,
    getJwt,
    getUser,
    getUserbyid
};
export default userService;