import httpService from "./httpService";
function getAllCards() {
    return httpService.get("/cards")

}



const cardService = {
    getAllCards,
}
export default cardService;
