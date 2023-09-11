import { useEffect, useState } from "react";
import axiosConfig from "axiosConfig";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosConfig.get(`/auth/users/me/`);
        const userData = res?.data;
        setUser(userData);
      } catch (error) {
        setError(error);
      }
    };

    getUser();
  }, []);

  return { user, error };
};
