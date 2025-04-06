function Footer() {
  return (
    <footer className="border-top py-3 text-center d-flex d-flex justify-content-evenly d-flex align-items-center">
      <span>
        <i className="bi bi-info-circle-fill">about</i>
      </span>
      <span>
        <i className="bi bi-heart-fill"> favorite</i>
      </span>
      <span className="mx-2">
        <i className="bi bi-person-square"></i>
        my cards
      </span>
    </footer>
  );
}
export default Footer;
