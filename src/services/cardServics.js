import httpService from "./httpService";
function getAllCards(cards) {
    return httpService.get("/cards", cards)

}
getAllCards()



const cardService = {
    getAllCards,
}
export default getAllCards;
