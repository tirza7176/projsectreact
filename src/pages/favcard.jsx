import Pageheader from "../components/pageheader";
import CardItem from "../components/card";
import cardService from "../services/cardServics";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
function FavCards() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const fetchFavCards = async () => {
    console.log(user._id);

    try {
      const allCards = await cardService.getAllCards();
      console.log(allCards);

      const favoriteCards = allCards.data.filter((card) =>
        card.likes.includes(user._id)
      );
      setCards(favoriteCards);
    } catch (err) {
      setError("Failed to load favorite cards");
    }
  };
  useEffect(() => {
    if (user) {
      fetchFavCards();
    }
  }, [user]);

  if (!user) return <p>Log in to see favorite cards.</p>;

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
