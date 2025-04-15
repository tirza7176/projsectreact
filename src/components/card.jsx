function CardItem({ card }) {
  const { title, subtitle, description, phone, image, address, bizNumber } =
    card;
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={image?.url || "https://via.placeholder.com/150"}
        className="card-img-top"
        alt={image?.alt || "Card image"}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
      <p>{phone}</p>
      <p>
        {address.city}
        {address.srteet}
        {address.houseNumber}
      </p>
      <p>cardnumber</p>
      <div className="card-body">
        <a href="#" className="card-link">
          <i className="bi bi-trash3-fill"></i>
        </a>
        <a href="#" className="card-link">
          <i className="bi bi-telephone-fill"></i>
        </a>
        <a href="#" className="card-link">
          <i className="bi bi-heart-fill"></i>
        </a>
      </div>
    </div>
  );
}
export default CardItem;
