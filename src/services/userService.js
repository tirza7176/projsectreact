import httpService from "./httpService";
function createUser(user) {
    return httpService.post("/users", user)


}
function login(credentials) {
    return httpService.post("/user/login", credentials)
}
const userService = {
    createUser,
    login,
};
export default userService;