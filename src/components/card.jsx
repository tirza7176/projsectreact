import { Button } from "bootstrap";
import { Link } from "react-router";
import cardService from "../services/cardServics";
import { createLogger } from "vite";
import { authContext } from "../contexts/AuthContext";

function CardItem({ card }) {
  const { user } = useContext(authContext);
  const { title, subtitle, description, phone, image, address, bizNumber } =
    card;
  function handleLike() {
    const response = cardService.likeCard(card.id);
    console.log(user.id);
    console.log(response.likes);
  }

  return (
    <div className="card text-center shadow " style={{ width: "18rem" }}>
      <img
        src={image?.url || "../public/defult.png"}
        className="card-img-top"
        alt={image?.alt || "Card image"}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="mt-3">
          <p>
            <strong>phone: </strong>
            {phone}
          </p>
          <p>
            <strong> address:</strong>
            {`${address.city},
            ${address.street},
            ${address.houseNumber}`}
          </p>
          <p>
            <strong>biz number:</strong> {bizNumber}
          </p>
        </div>
      </div>
      <div className="card-body d-flex justify-content-around">
        <button onclick={handleLike}>
          <i className="bi bi-trash3-fill"></i>
        </button>
        <Link to={"phone"} className="card-link">
          <i className="bi bi-telephone-fill"></i>
        </Link>
        <Link to={"my-cards-favorite"} className="card-link">
          <i className="bi bi-heart-fill"></i>
        </Link>
      </div>
    </div>
  );
}
export default CardItem;
