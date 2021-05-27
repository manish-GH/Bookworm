import "./styles/DisplayCart.css";
import firebaseApp from "../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useHistory } from "react-router-dom";

export const DisplayCart = () => {
  const history = useHistory();
  const { itemCount, setItemCount, setCheckoutItem } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    firebaseApp
      .firestore()
      .collection("db")
      .orderBy("book", "asc")
      .onSnapshot((snapshot) => {
        setCartItems(
          snapshot.docs.map((doc) => ({
            author: doc.data().author,
            book: doc.data().book,
            img: doc.data().image,
            price: doc.data().price,
            quantity: doc.data().quantity,
            id: doc.data().id,
            cost: doc.data().cost,
          }))
        );
      });
  }, []);

  useEffect(() => {
    setCart(cartItems.filter((item) => item.quantity > 0));
  }, [cartItems]);

  localStorage.setItem("a", 0);
  localStorage.setItem("b", 0);
  localStorage.setItem("c", 0);
  return (
    <div className="cart-container">
      <ul>
        {cart.map((data, index) => (
          <li className="item" key={index}>
            <img className="image" src={data.img} alt="book cover" />
            <h2 className="book">{data.book}</h2>
            <h3 className="author">{data.author}</h3>
            <h3 className="price">₹ {data.price}</h3>
            <h3 className="quantity">
              <span>
                <button
                  className="qnt-btn"
                  onClick={() => {
                    firebaseApp
                      .firestore()
                      .collection("db")
                      .doc(data.id)
                      .update({
                        quantity: data.quantity - 1,
                      });

                    setItemCount(itemCount - 1);
                  }}
                >
                  -
                </button>
                {data.quantity}
                <button
                  className="qnt-btn"
                  onClick={() => {
                    firebaseApp
                      .firestore()
                      .collection("db")
                      .doc(data.id)
                      .update({
                        quantity: data.quantity + 1,
                      });

                    setItemCount(itemCount + 1);
                  }}
                >
                  +
                </button>
              </span>
            </h3>
            <button
              onClick={() => {
                setItemCount(itemCount - data.quantity);

                firebaseApp.firestore().collection("db").doc(data.id).update({
                  quantity: 0,
                });
              }}
              className="remove-btn"
            >
              Remove
            </button>
            {
              (localStorage.setItem("b", localStorage.getItem("c")),
              localStorage.setItem("a", parseInt(data.cost) * data.quantity),
              localStorage.setItem(
                "c",
                parseInt(localStorage.getItem("a")) +
                  parseInt(localStorage.getItem("b"))
              ))
            }
          </li>
        ))}
      </ul>
      <div className="footer">
        <h3>Subtotal: ₹ {localStorage.getItem("c")}.00</h3>
        <button
          // eslint-disable-next-line
          disabled={localStorage.getItem("c") == 0}
          className="checkout-btn"
          onClick={() => {
            setCheckoutItem(cart);
            history.push("/checkout");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
