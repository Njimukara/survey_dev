import axiosConfig from "axiosConfig";
import { useSubscription } from "contexts/SubscriptionContext";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

const useSurveyHistory = (initialValue = 0, step = 1) => {
  const { data: session } = useSession();

  const [companyUser] = useState(2);
  const [surveyHistory, setSurveyHistory] = useState([]);

  const [companySurveyHistory, setCompanySurveyHistory] = useState([]);
  const [error, setError] = useState(null);
  const { subscriptions } = useSubscription();

  const getSurveyHistory = useCallback(() => {
    if (subscriptions.length <= 0) {
      return;
    } else {
      setSurveyHistory([]);
      setCompanySurveyHistory([]);
      let assignedSurveys = subscriptions[0]?.assigned_surveys;
      console.log("custom hook", subscriptions);

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
    subscriptions,
  ]);

  useEffect(() => {
    getSurveyHistory();
  }, [getSurveyHistory]);

  return { surveyHistory, companySurveyHistory, error };
};

export default useSurveyHistory;
