import { useSession } from "next-auth/react";
import { UserTypes } from "utils/userTypes";
import {
  fetchCompanySurveys,
  fetchSurveyHistory,
} from "redux/surveyHistorySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";

const useUpdateSurveyHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const userProfile = sessionUser?.data?.user_profile;
  const userType = userProfile?.user_type;

  const updateSurveyHistory = () => {
    if (userType === UserTypes.COMPANY_USER) {
      dispatch(fetchCompanySurveys({ force: true }));
    } else {
      dispatch(fetchSurveyHistory({ force: true }));
    }
  };

  return {
    sessionUser,
    userType,
    updateSurveyHistory,
  };
};

export default useUpdateSurveyHistory;
