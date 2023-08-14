import axiosConfig from "axiosConfig";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

export const subscriptionContext = React.createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [currentSubscription, setCurrentSubscription] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const { data: session } = useSession();

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosConfig.get(`/api/plans/subscription/`);

      if (response.data.length > 0) {
        const tempSub = response.data[response.data.length - 1];
        const id = tempSub?.id;

        try {
          const res = await axiosConfig.get(`/api/plans/subscription/${id}/`);
          setCurrentSubscription(res.data);
        } catch (err) {
          // console.log("sub error", err);
          setCurrentSubscription(null);
        }

        setSubscriptions(response.data);
      } else {
        setCurrentSubscription(null);
        setSubscriptions([]);
      }

      setLoading(false);
    } catch (err) {
      // console.log("sub error", err);
      setCurrentSubscription(null);
      setSubscriptions([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

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
