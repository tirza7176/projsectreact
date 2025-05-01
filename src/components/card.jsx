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

  return (
    <div
      className="card text-center shadow d-flex flex-column h-100 w-100"
      style={{ maxWidth: "18rem" }}
    >
      <Link to={`/card/${card._id}`}>
        <img
          src={image?.url || "../public/defult.png"}
          className="card-img-top"
          alt={image?.alt || "Card image"}
        />
      </Link>
      <div className="card-body flex-column justify-content-between flex-grow-1">
        <div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{subtitle}</p>
        </div>
        <div className="mt-3">
          <p>
            <strong>phone: </strong>
            {phone}
          </p>
          <p>
            <strong> address: </strong>
            {`${address.city},
            ${address.street}
            ${address.houseNumber}`}
          </p>
          <p>
            <strong>biz number:</strong> {bizNumber}
          </p>
        </div>
      </div>
      <div className="card-body d-flex justify-content-around align-items-center gap-3">
        <span>
          {user && (
            <button className="btn btn-link p-0 m-0" onClick={handleLike}>
              <i
                className={`bi ${
                  isLike ? "bi-heart-fill text-danger" : "bi-heart"
                }`}
              ></i>
            </button>
          )}
        </span>
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
        <Link to={`tel:${card.phone}`} className="card-link">
          <i className="bi bi-telephone-fill"></i>
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
