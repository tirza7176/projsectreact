import Pageheader from "../components/pageheader";
import CardItem from "../components/card";
import cardService from "../services/cardServics";
import { useState, useEffect } from "react";
import { useSearch } from "../contexts/searchprovider";
function Home() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const { inputSearch } = useSearch();
  useEffect(() => {
    async function fetchCards() {
      try {
        const { data } = await cardService.getAllCards();
        setCards(data);
        console.log(data);
      } catch (err) {
        setError("Failed to load cards");
      }
    }

    fetchCards();
  }, []);
  return (
    <div className="container bs-success-bg-subtle">
      <Pageheader
        title="cards pages"
        description="you can find business cards from all categories."
      />
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        {cards
          .filter((card) => {
            const searchTerm = inputSearch.toLowerCase();
            return (
              card.title.toLowerCase().includes(searchTerm) ||
              card.subtitle.toLowerCase().includes(searchTerm) ||
              card.bizNumber.toString().includes(searchTerm)
            );
          })
          .map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
      </div>
    </div>
  );
}
export default Home;
