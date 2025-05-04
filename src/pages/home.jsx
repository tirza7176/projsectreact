import Pageheader from "../components/pageheader";
import CardItem from "../components/card";
import cardService from "../services/cardServics";
import { useState, useEffect } from "react";
import { useSearch } from "../contexts/searchprovider";
import { useAuth } from "../contexts/AuthContext";
import userService from "../services/userService";
import { data } from "react-router";
function Home() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const { inputSearch } = useSearch();
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    async function fetchUserName() {
      if (user?._id) {
        try {
          const data = await userService.getUserbyid(user._id);
          setFullName(data.name.first);
        } catch (err) {
          console.error("Failed to fetch user name", err);
        }
      }
    }
    fetchUserName();
  }, [user]);
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
        title={fullName ? `hello ${fullName} ` : "cards pages"}
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
            <div
              key={card._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <CardItem card={card} />
            </div>
          ))}
      </div>
    </div>
  );
}
export default Home;
