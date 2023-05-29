import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

export const subscriptionContext = React.createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [currentSubscription, setCurrentSubscription] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const { data: session } = useSession();

  const fetchSubscriptions = async () => {
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
        let tempSUb = response.data[response.data.length - 1];
        let id = tempSUb?.id;
        axios
          .get(
            `https://surveyplanner.pythonanywhere.com/api/plans/subscription/${id}/`,
            config
          )
          .then((res) => {
            setCurrentSubscription(res.data);
          })
          .catch((err) => {});
        setSubscriptions(response.data);
        // console.log("subs", response.data);
        setLoading(false);
        return;
      })
      .catch((err) => {
        setSubscriptions([]);
        setLoading(false);
        return;
      });
  };

  return (
    <subscriptionContext.Provider
      value={{
        loading,
        currentSubscription,
        subscriptions,
        fetchSubscriptions,
      }}
    >
      {children}
    </subscriptionContext.Provider>
  );
};

export const useSubscription = () => React.useContext(subscriptionContext);
