import "./styles/DisplayData.css";
import firebaseApp from "../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

export const DisplayData = () => {
  const { itemCount, setItemCount } = useAuth();
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    firebaseApp
      .firestore()
      .collection("db")
      .orderBy("book", "asc")
      .onSnapshot((snapshot) => {
        setBookData(
          snapshot.docs.map((doc) => ({
            author: doc.data().author,
            book: doc.data().book,
            img: doc.data().image,
            price: doc.data().price,
            quantity: doc.data().quantity,
            id: doc.data().id,
          }))
        );
      });

    // eslint-disable-next-line
  }, []);

  const cart = (id, quantity) => {
    quantity++;
    firebaseApp.firestore().collection("db").doc(id).update({
      quantity: quantity,
    });

    setItemCount(1 + itemCount);
  };

  return (
    <ul>
      {bookData.map((data, index) => (
        <li className="item" key={index}>
          <img className="image" src={data.img} alt="book cover" />
          <h2 className="book">{data.book}</h2>
          <h3 className="author">{data.author}</h3>
          <h3 className="price">₹ {data.price}</h3>
          <button
            onClick={() => {
              cart(data.id, data.quantity);
            }}
            className="add-to-cart-btn"
          >
            Add to cart
          </button>
        </li>
      ))}
    </ul>
  );
};
