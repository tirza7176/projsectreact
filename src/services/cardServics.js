import httpService from "./httpService";
import userService from "./userService";
function getAllCards() {
    return httpService.get("/cards")

}

async function getMyCards() {
    try {
        const response = await httpService.get("/cards/my-cards");
        return response.data;
    }
    catch (error) {

        throw error
    }
}

async function getCardByid(id) {
    try {
        const response = await httpService.get(`/cards/${id}`);
        return response.data;

    } catch (error) {

    }
}
async function createCard(cardData) {
    userService.refreshToken();
    try {
        const response = await httpService.post("/cards", cardData)
        return response
    } catch (error) {
        throw error;
    }

}
function updateCard(cardId, updateCardData) {
    return httpService.put(`/cards/${cardId}`, updateCardData)
}
async function likeCard(cardId) {
    try {
        const response = await httpService.patch(`/cards/${cardId}`)
        return response.data
    }
    catch (error) {

        console.error("Server said:", error.response?.data)
    }
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
