import cardService from "../services/cardServics";
import { useEffect, useState } from "react";
import PageHeader from "../components/pageheader";
import { Link, useParams } from "react-router";
import useCard from "../hooks/useCard";
function CardDetails() {
  const { id } = useParams();
  const card = useCard(id);
  console.log(card);
  if (!card) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container bs-success-bg-subtle">
      <PageHeader title={card.title} />
      <div className="  d-flex flex-wrap justify-content-center">
        <div classname="card text-center">
          <div classname="card-body border border-primary-5">
            <h5 classname="card-title">{card.subtitle}</h5>
            <p classname="card-text">{card.description}</p>
          </div>
          <div classname="card-footer text-body-secondary">Adress:</div>
          <p classname="card-text">{card.address.country}</p>
          <p classname="card-text">{card.address.city}</p>
          <p classname="card-text">
            {card.address.street} {card.address.houseNumber}
          </p>
          <p classname="card-text">{card.address.zip}</p>
          <p className="text-primary-emphasis">{card.email}</p>
        </div>
        <div>{card.image.url}</div>
        <Link to="google" classname="btn btn-primary">
          map
        </Link>
      </div>
    </div>
  );
}
export default CardDetails;
