import httpService from "./httpService";
function getAllCards() {
    return httpService.get("/cards")

}

function getMyCards() {
    return httpService.get("/cards/my-cards")
}
function getCardByid(id) {
    return httpService.get(`/cards/${id}`);

}
function createCard(cardData) {
    return httpService.post("/cards", cardData)
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
