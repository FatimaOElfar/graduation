import Stripe from "stripe";

const stripe = Stripe(process.env.SECRET_KEY, {
  maxNetworkRetries: 2,
});

stripe.on("request", (req) => {});
