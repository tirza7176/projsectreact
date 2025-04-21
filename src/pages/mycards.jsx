import PageHeader from "../components/pageheader";
import CardItem from "../components/card";
import cardService from "../services/cardServics";
import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
function Mycards() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchMyCards() {
      try {
        const data = await cardService.getMyCards();
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
      <PageHeader title="welcome to your personal area" />
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
