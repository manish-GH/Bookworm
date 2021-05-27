import React, { createContext, useContext, useState, useEffect } from "react";
import firebaseApp from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [checkoutItem, setCheckoutItem] = useState();

  function signup(email, password) {
    return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return firebaseApp.auth().signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return firebaseApp.auth().signOut();
  }

  const value = {
    setCheckoutItem,
    checkoutItem,
    itemCount,
    setItemCount,
    currentUser,
    signup,
    login,
    logout,
  };

  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    if (sessionStorage.getItem("is_reloaded"))
      setItemCount(Number(localStorage.getItem("cartHistory")));
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  if (loading) return "Loading...";

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
