function PageHeader({ title, description }) {
  return (
    <div className="container mt-3 ">
      <div className="text-center mb-4"></div>
      <h1 className="display-4 fw-normal">{title}</h1>

      <p className="lead">{description}</p>
    </div>
  );
}
export default PageHeader;
