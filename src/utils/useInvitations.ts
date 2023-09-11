import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchCompanyInvites } from "redux/companySlice";

const useInvitations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companyInvites, invitesError, invitesLoading } = useSelector(
    (state: RootState) => state.reduxStore.company
  );

  const fetchInvitations = useCallback(async () => {
    dispatch(
      fetchCompanyInvites({
        force: true,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return { companyInvites, invitesError, invitesLoading, fetchInvitations };
};

export default useInvitations;
