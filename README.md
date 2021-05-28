# Bookworm

Bookworm is an eCommerce app developed using ReactJs and Firebase

**Click [Here](https://frosty-bassi-11e2e7.netlify.app/) to give it a try or watch the [Demo](https://youtu.be/bPrIb2CbiEA)**



## Technology Used

- **React** (FrontEnd)
  - **Material-UI** 
  - **react-router-dom**
  - **react-uuid** 
  - **react-bootstrap** 
- **Firebase** - Baas (Backend as a Service)
  - **Firestore** 
  - **Authentication**
    - SignIn & SignUp functionality using Email and Password verification    
  - **Storage**

## Functionalities

### Add to cart

User can add books to the cart.

### Update book count

User can add or decrease the amount of each book on the cart page.

### Checkout

User can add the address and card details and verify the order on checkout.


### Context API

- **useAuth** - This provides all the Functions related to Authentication (SignUp, LogIn, Logout) and helps in better state management.
- **useCheckout** - This helps to manage all the states dealing with address and card.

## Setup 

- Clone the repo, and cd into it
- Install all the dependcies from package.json
- Create a firebase project and enable Email-Password Authentication
- Place your firebase project Keys inside the Firebase.js file
- Run app by typing `npm start` in command line
