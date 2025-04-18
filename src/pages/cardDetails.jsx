import cardService from "../services/cardServics";
import { useEffect, useState } from "react";
import PageHeader from "../components/pageheader";
function CardDetails() {
  /* const [card, setcard] = useState(null);
    useEffect(() => {
        const loadCard = async () => {
            try {
                const cardDetails = await cardService.getCardByid(id);
                setcard(cardDetails);
            } catch (error) {
                console.log(error);

            }
        },
            loadCard();
    }, []);*/
  return (
    <div className="container bs-success-bg-subtle">
      <PageHeader title="Business details" />
      <div className="d-flex  flex-wrap justify-content-center">
        <h4>{card.title}</h4>
        <p>{card.description}</p>
        <p>{card.phone}</p>
        <p>{card.email}</p>
        <p>{card.address.country}</p>
        <p>{card.address.city}</p>
        <p>{card.address.street}</p>
        <p>{card.address.houseNumber}</p>
        <p>{card.address.zip}</p>
      </div>
    </div>
  );
}
export default CardDetails;
