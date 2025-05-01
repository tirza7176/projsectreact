import cardService from "../services/cardServics";
import { useEffect, useState } from "react";
import PageHeader from "../components/pageheader";
import { Link, useParams } from "react-router";
import useCard from "../hooks/useCard";
function CardDetails() {
  const { id } = useParams();
  const card = useCard(id);

  if (!card) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container bg-body-secondary mt-4 p-4 rounded ">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/" className="btn btn-primary">
          <i className="bi bi-arrow-right-square-fill"></i>
        </Link>
      </div>
      <PageHeader title={card.title} />

      <div className="row align-items-start mt-4">
        <div className="col-md-8">
          <div className="card text-start p-3">
            <div className="card-body border border-primary rounded">
              <h5 className="card-title">{card.subtitle}</h5>
              <p className="card-text">{card.description}</p>

              <hr />
              <h6>Address:</h6>
              <p className="mb-0">{card.address.country}</p>
              <p className="mb-0">{card.address.city}</p>
              <p className="mb-0">
                {card.address.street} {card.address.houseNumber}
              </p>
              <p className="mb-0">{card.address.zip}</p>

              <hr />
              <Link to={`mailto:${card.email}`} className="card-link">
                {card.email}
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center">
          <img
            src={card?.image?.url || "../public/defult.png"}
            className="img-fluid rounded shadow w-75 w-md-100"
            style={{ maxWidth: "100%", height: "auto" }}
            alt={card?.image?.alt || "Card image"}
          />
        </div>
      </div>
    </div>
  );
}
export default CardDetails;
