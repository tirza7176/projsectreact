import { Link } from "react-router";
import cardService from "../services/cardServics";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router";

function CardItem({ card }) {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const {
    _id,
    title,
    subtitle,
    description,
    phone,
    image,
    address,
    bizNumber,
  } = card;
  const [isLike, setIslike] = useState(false);
  useEffect(() => {
    if (user && card.likes.includes(user._id)) {
      setIslike(true);
    }
  }, [user, card.likes]);
  async function handleLike() {
    try {
      const response = await cardService.likeCard(card._id);
      console.log(user._id);
      console.log(response.likes);
      const updatedLikes = response.likes || [];
      const liked = updatedLikes.includes(user._id);
      setIslike(liked);
    } catch (error) {
      console.error("Like failed:", err);
    }
  }
  /* async function handleDeleteCard() {
    try {
      const response = await cardService.deleteCard(card._id);
    } catch (error) {
      console.error(error);
    }
  }*/
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
        {user && (
          <button onClick={handleLike}>
            <i
              className={`bi ${
                isLike ? "bi-heart-fill text-danger" : "bi-heart"
              }`}
            ></i>
          </button>
        )}
        {user?._id === card.user_id && (
          <>
            <Link to={`/mycards/delete/${_id}`}>
              <i className="bi bi-trash3-fill"></i>
            </Link>
            <Link to={`/mycards/edit/${_id}`} className="card-link">
              <i className="bi bi-pencil-fill"></i>
            </Link>
          </>
        )}
        <Link to={"phone"} className="card-link">
          <i className="bi bi-telephone-fill"></i>
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
