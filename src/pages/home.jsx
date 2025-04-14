import Pageheader from "../components/pageheader";
import CardItem from "../components/card";
function Home() {
  return (
    <div className="container bs-success-bg-subtle">
      <Pageheader
        title="cards pages"
        description="you can find business cards from all categories."
      />
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <CardItem></CardItem>
        <CardItem></CardItem>
        <CardItem></CardItem>
      </div>
    </div>
  );
}
export default Home;
