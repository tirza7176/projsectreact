function CardItem() {
  return (
    <div className="card" style={{ width: "18rem;" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">description</p>
      </div>
      <p>phone</p>
      <p>adress</p>
      <p>cardnumber</p>
      <div className="card-body">
        <a href="#" className="card-link">
          <i class="bi bi-trash3-fill"></i>
        </a>
        <a href="#" className="card-link">
          <i class="bi bi-telephone-fill"></i>
        </a>
        <a href="#" className="card-link">
          <i class="bi bi-heart-fill"></i>
        </a>
      </div>
    </div>
  );
}
export default CardItem;
