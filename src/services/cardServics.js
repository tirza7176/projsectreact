import httpService from "./httpService";
function getAllCards() {
    return httpService.get("/cards")
    console.log(getAllCards());

}
getAllCards()



const cardService = {
    getAllCards,
}
export default getAllCards;
