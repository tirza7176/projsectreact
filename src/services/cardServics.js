import httpService from "./httpService";
import userService from "./userService";
function getAllCards() {
    return httpService.get("/cards")

}

function getMyCards() {
    return httpService.get("/cards/my-cards")
}
async function getCardByid(id) {
    try {
        const response = await httpService.get(`/cards/${id}`);
        return response.data;

    } catch (error) {
        console.log(error);

    }
}
async function createCard(cardData) {
    userService.refreshToken();
    try {
        const response = httpService.post("/cards", cardData)
        return response
    } catch (error) {

        console.log(error);

    }

}
function updateCard(cardId, updateCardData) {
    return httpService.put(`/cards/${cardId}`, updateCardData)
}
function likeCard(cardId) {

    return httpService.patch(`/cards/${cardId}`);

}
function deleteCard(cardId) {
    return httpService.delete(`/cards/${cardId}`);
}
const cardService = {
    getAllCards,
    getMyCards,
    getCardByid,
    createCard,
    updateCard,
    likeCard,
    deleteCard
}
export default cardService;
