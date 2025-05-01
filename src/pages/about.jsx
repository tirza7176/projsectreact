import Pageheader from "../components/pageheader";
function About() {
  return (
    <div className="container">
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1 className="display-4">About Us</h1>
          <p className="lead">
            Our platform showcases a variety of business cards from different
            industries, making it easy for users to discover and connect with
            professionals. Whether you're looking for a service provider,
            entrepreneur, or company, our collection helps you find the right
            contact quickly and efficiently.
          </p>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <i className="bi bi-people-fill fs-1 text-primary"></i>
            <h5 className="mt-3">Connect with Professionals</h5>
            <p>
              Find verified business owners, freelancers, and industry experts
              with ease.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-search-heart fs-1 text-success"></i>
            <h5 className="mt-3">Search & Discover</h5>
            <p>
              Use filters to explore businesses by category, location, and
              popularity.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-card-heading fs-1 text-warning"></i>
            <h5 className="mt-3">Create & Share</h5>
            <p>
              Registered users can design and manage their own business cards
              online.
            </p>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-muted">
            We're committed to supporting professional visibility and making
            business networking simple and accessible for all.
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;
