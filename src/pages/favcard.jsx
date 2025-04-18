import Pageheader from "../components/pageheader";
import CardItem from "../components/card";
import cardService from "../services/cardServics";
import { useState, useEffect } from "react";
function FavCards() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  return (
    <div className="container bs-success-bg-subtle">
      <Pageheader
        title="Favorite cards page"
        description="here you can find all your favorite business cards."
      />
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        {cards.length === 0 ? (
          <p>There are no favorite cards.</p>
        ) : (
          cards.map((card) => <CardItem key={card._id} card={card} />)
        )}
      </div>
    </div>
  );
}
export default FavCards;
