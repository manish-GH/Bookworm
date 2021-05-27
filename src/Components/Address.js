import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useCheckout } from "../contexts/CheckoutProvider";

export default function Address() {
  const { setInfo, info } = useCheckout();

  return (
    <div className="address">
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={info.firstName}
            onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={info.lastName}
            onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={info.address1}
            onChange={(e) => setInfo({ ...info, address1: e.target.value })}
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={info.address2}
            onChange={(e) => setInfo({ ...info, address2: e.target.value })}
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={info.city}
            onChange={(e) => setInfo({ ...info, city: e.target.value })}
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={info.state}
            onChange={(e) => setInfo({ ...info, state: e.target.value })}
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={info.zip}
            onChange={(e) => setInfo({ ...info, zip: e.target.value })}
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={info.country}
            onChange={(e) => setInfo({ ...info, country: e.target.value })}
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
      </Grid>
    </div>
  );
}
