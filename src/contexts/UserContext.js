import axiosConfig from "axiosConfig";
import React from "react";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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

  return (
    <CurrentUserContext.Provider
      value={{ loading, currentUser, fetchCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
