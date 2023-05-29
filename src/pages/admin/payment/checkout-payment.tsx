import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "views/admin/default/components/CheckoutForm";
import AdminLayout from "layouts/admin";
import { useSession } from "next-auth/react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Payment() {
  const { data: session, status } = useSession();

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  return (
    <AdminLayout>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </AdminLayout>
  );
}

Payment.requireAuth = true;
