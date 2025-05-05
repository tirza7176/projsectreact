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

      const updatedLikes = response.likes || [];
      const liked = updatedLikes.includes(user._id);
      setIslike(liked);
    } catch (error) {
      console.error("Like failed:", err);
    }
  }

  return (
    <div
      className="card shadow-sm rounded-4 text-center d-flex flex-column h-100"
      style={{ maxWidth: "18rem" }}
    >
      <Link to={`/card/${_id}`}>
        <img
          src={image?.url || "../public/defult.png"}
          className="card-img-top rounded-top-4"
          alt={image?.alt || "Card image"}
        />
      </Link>
      <div className="card-body d-flex flex-column justify-content-between flex-grow-1">
        <div>
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted">{subtitle}</p>
        </div>
        <div className="mt-3 text-start">
          <p>
            <strong>phone:</strong> {phone}
          </p>
          <p>
            <strong>address:</strong>{" "}
            {`${address.city}, ${address.street} ${address.houseNumber}`}
          </p>
          <p>
            <strong>biz number:</strong> {bizNumber}
          </p>
        </div>
      </div>
      <div className="card-body d-flex justify-content-between align-items-center px-3 pb-3">
        {user && (
          <button className="btn btn-link p-0 m-0" onClick={handleLike}>
            <i
              className={`bi ${
                isLike ? "bi-heart-fill text-danger" : "bi-heart"
              } fs-5`}
            ></i>
          </button>
        )}
        {user?._id === card.user_id && (
          <>
            <Link to={`/mycards/delete/${_id}`} className="text-dark">
              <i className="bi bi-trash3-fill fs-5"></i>
            </Link>
            <Link to={`/mycards/edit/${_id}`} className="text-dark">
              <i className="bi bi-pencil-fill fs-5"></i>
            </Link>
          </>
        )}
        <Link to={`tel:${phone}`} className="text-dark">
          <i className="bi bi-telephone-fill fs-5"></i>
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
