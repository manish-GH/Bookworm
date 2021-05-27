import "./styles/Navbar.css";
import { useAuth } from "../contexts/AuthProvider";
import { useHistory, Link } from "react-router-dom";
import firebaseApp from "../firebase";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

export const Navbar = () => {
  const { logout, itemCount, checkoutItem, setItemCount } = useAuth();
  const history = useHistory();
  localStorage.setItem("cartHistory", itemCount);
  sessionStorage.setItem("is_reloaded", true);

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 6,
      transform: "scale(0.8)",
      padding: "0 4px",
    },
  }))(Badge);

  const handleClick = async () => {
    try {
      await logout();
      for (let i = 0; i < checkoutItem.length; i++) {
        console.log(checkoutItem[i].id);
        firebaseApp
          .firestore()
          .collection("db")
          .doc(checkoutItem[i].id)
          .update({
            quantity: 0,
          });
      }
      setItemCount(0);
      history.push("/login");
    } catch {
      console.log("Failed to log out");
    }
  };
  return (
    <div className="navbar-container">
      <nav>
        <Link className="store" to="/">
          Bookworm
        </Link>
        <div className="navbar-right">
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={itemCount} color="secondary">
                <ShoppingCartIcon className="cart-icon" />
              </StyledBadge>
            </IconButton>
          </Link>

          <button className="logout-btn" variant="link" onClick={handleClick}>
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};
