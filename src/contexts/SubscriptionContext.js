import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

export const subscriptionContext = React.createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { data: session } = useSession();

  const fetchSubscription = async () => {
    const config = {
      headers: {
        "Content-Type": "json",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/plans/subscription/",
        config
      )
      .then((response) => {
        // Add it to the context
        setSubscription(response.data);
        setLoading(false);
        return;
      })
      .catch((err) => {
        setSubscription([]);
        setLoading(false);
        return;
      });
  };

  return (
    <subscriptionContext.Provider
      value={{ loading, subscription, fetchSubscription }}
    >
      {children}
    </subscriptionContext.Provider>
  );
};

export const useSubscription = () => React.useContext(subscriptionContext);
