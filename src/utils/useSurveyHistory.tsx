import axiosConfig from "axiosConfig";
import { useSubscription } from "contexts/SubscriptionContext";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const useSurveyHistory = (initialValue = 0, step = 1) => {
  const { data: session } = useSession();

  const [companyUser] = useState(2);
  const [surveyHistory, setSurveyHistory] = useState([]);

  const [companySurveyHistory, setCompanySurveyHistory] = useState([]);
  const [error, setError] = useState(null);
  const { data } = useSelector(
    (state: RootState) => state.reduxStore.subscrptions
  );
  const { currentSubscription } = data;
  // const { subscriptions } = useSubscription();

  const getSurveyHistory = useCallback(() => {
    if (!currentSubscription) {
      return;
    } else {
      setSurveyHistory([]);
      setCompanySurveyHistory([]);
      let assignedSurveys = currentSubscription?.assigned_surveys;
      console.log("custom hook", currentSubscription);

      assignedSurveys.forEach(async (survey: any) => {
        try {
          let result = await axiosConfig.get(
            `api/surveys/${survey.code}/results/`
          );
          setSurveyHistory((prevHistory) => [...prevHistory, ...result.data]);
        } catch (err) {
          setError(err);
        }
      });

      if (session?.user?.data?.user_profile?.user_type === companyUser) {
        assignedSurveys.forEach(async (survey: any) => {
          try {
            let result = await axiosConfig.get(
              `api/surveys/${survey.code}/company-results/`
            );
            setCompanySurveyHistory((prevHistory) => [
              ...prevHistory,
              ...result.data,
            ]);
          } catch (err) {
            setError(err);
          }
        });
      }
    }
  }, [
    companyUser,
    session?.user?.data?.user_profile?.user_type,
    currentSubscription,
  ]);

  useEffect(() => {
    getSurveyHistory();
  }, [getSurveyHistory]);

  return { surveyHistory, companySurveyHistory, error };
};

export default useSurveyHistory;
