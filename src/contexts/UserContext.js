import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { data: session } = useSession();

  const fetchCurrentUser = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "json",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get("https://surveyplanner.pythonanywhere.com/auth/users/me/", config)
      .then((response) => {
        // Add it to the context
        setCurrentUser(response.data);
        setLoading(false);
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
