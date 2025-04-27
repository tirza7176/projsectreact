import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import cardService from "../services/cardServics";
const DeleteCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const deleteCard = async () => {
      await cardService.deleteCard(id);
      navigate("/mycards");
    };
    deleteCard();
  }, []);
  return null;
};
export default DeleteCard;
