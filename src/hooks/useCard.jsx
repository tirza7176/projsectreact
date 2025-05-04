import { useState, useEffect } from "react";
import cardService from "../services/cardServics";

function useCard(id) {
  const [card, setCard] = useState(null);

  useEffect(() => {
    async function getCard() {
      try {
        const card = await cardService.getCardByid(id);

        setCard(card);
      } catch (error) {
        console.error("Failed to fetch card", error);
      }
    }
    getCard();
  }, [id]);

  return card;
}

export default useCard;
