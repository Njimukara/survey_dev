import axiosConfig from "axiosConfig";
import React from "react";

export const subscriptionContext = React.createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [currentSubscription, setCurrentSubscription] = React.useState();
  const [loading, setLoading] = React.useState(true);

  // const fetchSubscriptions = async () => {
  //   await axiosConfig
  //     .get("/api/plans/subscription/")
  //     .then((response) => {
  //       // Add it to the context
  //       let tempSUb = response.data[response.data.length - 1];
  //       let id = tempSUb?.id;
  //       axiosConfig
  //         .get(`/api/plans/subscription/${id}/`)
  //         .then((res) => {
  //           setCurrentSubscription(res.data);
  //           setLoading(false);
  //         })
  //         .catch((err) => {
  //           setLoading(false);
  //         });
  //       setSubscriptions(response.data);
  //       return;
  //     })
  //     .catch((err) => {
  //       setSubscriptions([]);
  //       setLoading(false);
  //       return;
  //     });
  // };

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
          setCurrentSubscription(null);
        }

        setSubscriptions(response.data);
      } else {
        setCurrentSubscription(null);
        setSubscriptions([]);
      }

      setLoading(false);
    } catch (err) {
      setCurrentSubscription(null);
      setSubscriptions([]);
      setLoading(false);
    }
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
