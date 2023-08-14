import { useEffect, useState, useCallback } from "react";
import axiosConfig from "axiosConfig";

const useInvitations = () => {
  const [fetching, setFeching] = useState(true);
  const [invitations, setInvitations] = useState([]);

  const fetchInvitations = useCallback(async () => {
    setFeching(true);
    try {
      const response = await axiosConfig.get(
        "/api/company/companymembers/invitations/"
      );
      const result = response.data.filter((invite: any) => invite.status === 1);
      setInvitations(result);
      setFeching(false);
    } catch (error) {
      setFeching(false);
    }
  }, []);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return { fetching, invitations, fetchInvitations };
};

export default useInvitations;
