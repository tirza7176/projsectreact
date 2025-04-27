import { useState, useEffect } from "react";
import cardService from "../services/cardServics";

function useCard(id) {
  const [card, setCard] = useState(null);

  useEffect(() => {
    async function getCard() {
      const card = await cardService.getCard(id);

      setCard(card);
    }

    getCard();
  }, []);

  return card;
}

export default useCard;
