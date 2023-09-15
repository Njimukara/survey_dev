import axiosConfig from "axiosConfig";
import React, { useEffect } from "react";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // const { subscriptions } = useSubscription();

  const fetchCurrentUser = async () => {
    setLoading(true);

    await axiosConfig
      .get("/auth/users/me/")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ loading, currentUser, fetchCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
