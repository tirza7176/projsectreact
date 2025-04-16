import Pageheader from "../components/pageheader";
import CardItem from "../components/card";
import cardService from "../services/cardServics";
import { useContext, useState, useEffect } from "react";
function Mycards() {
  const { user } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchMyCards() {
      try {
        const { data } = await cardService.getMyCards();
        setCards(data);
        console.log(data);
      } catch (err) {
        setError("Failed to load cards");
      }
    }
    if (user) {
      fetchMyCards();
    }
  }, [user]);
  if (!user) return <p>Log in to see your cards.</p>;
  return (
    <div className="container bs-success-bg-subtle">
      <Pageheader
        title="welcome to my cards"
        description="it is only your cards"
      />
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        {cards.length === 0 ? (
          <p>There are no cards for your user.</p>
        ) : (
          cards.map((card) => <CardItem key={card._id} card={card} />)
        )}
      </div>
    </div>
  );
}
export default Mycards;
