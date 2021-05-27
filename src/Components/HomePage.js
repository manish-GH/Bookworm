import "./styles/HomePage.css";
import { Navbar } from "./Navbar";
import { DisplayData } from "./DisplayData";

export default function HomePage() {
  return (
    <div className="home">
      <div className="sticky">
        <Navbar />
      </div>
      <DisplayData />
    </div>
  );
}
