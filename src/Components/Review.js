import React, { useState, useEffect } from "react";
import { useCheckout } from "../contexts/CheckoutProvider";
import { useAuth } from "../contexts/AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();
  const { info, card } = useCheckout();
  const { checkoutItem } = useAuth();
  const [products, setProducts] = useState([]);

  console.log(checkoutItem);

  useEffect(() => {
    for (let i = 0; i < checkoutItem.length; i++) {
      console.log(checkoutItem[i].book);
      setProducts((products) => [
        ...products,
        {
          name: checkoutItem[i].book,
          price: checkoutItem[i].cost,
          quantity: `x  ${checkoutItem[i].quantity}`,
        },
      ]);
      console.log("product: ", products);
    }

    // eslint-disable-next-line
  }, []);

  const addresses = [
    info.address1,
    info.address2,
    info.city,
    info.state,
    info.zip,
    info.country,
  ];

  const payments = [
    { name: "Payment method:", detail: "Card" },
    { name: "Card holder:", detail: card.name },
    { name: "Card number:", detail: card.number },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.quantity} />
            <Typography variant="body2"> ₹ {product.price}.00</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ₹ {localStorage.getItem("c")}.00
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {info.firstName} {info.lastName}
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
