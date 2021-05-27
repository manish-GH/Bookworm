import React from "react";
import { useCheckout } from "../contexts/CheckoutProvider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function Payment() {
  const { card, setCard } = useCheckout();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={card.name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={card.number}
            onChange={(e) => setCard({ ...card, number: e.target.value })}
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
