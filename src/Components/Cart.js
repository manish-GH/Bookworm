import "./styles/Cart.css";
import { Navbar } from "./Navbar";
import { DisplayCart } from "./DisplayCart";

export default function Cart() {
  return (
    <div className="home">
      <div className="sticky">
        <Navbar />
      </div>
      <DisplayCart />
    </div>
  );
}
