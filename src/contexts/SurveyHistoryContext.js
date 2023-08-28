import axiosConfig from "axiosConfig";
import React, { useState, useCallback, useEffect } from "react";
import { useSubscription } from "./SubscriptionContext";
import { useSession } from "next-auth/react";

export const SurveyHistory = React.createContext();

export const SurveyHistoryProvider = ({ children }) => {
  const { subscriptions } = useSubscription();
  const { data: session } = useSession();

  const [pending, setPending] = useState(true); // Set initial pending state to true
  const [companyUser, setCompanyUser] = useState(2);
  const [surveyHistory, setSurveyHistory] = useState([]);
  const [companySurveyHistory, setCompanySurveyHistory] = useState([]);
  const [mergedCompanyHistory, setMergedCompanyHistory] = useState([]);
  const [surveyOptions, setSurveyOptions] = useState([]);

  const getSurveyHistory = useCallback(async () => {
    setPending(true); // Start pending
    setSurveyHistory([]);
    setCompanySurveyHistory([]);
    setSurveyOptions([]);

    // if (subscriptions.length === 0) {
    //   setPending(false); // Set pending to false if no subscriptions
    //   return;
    // }

    // Fetch survey history
    try {
      const assignedSurveys = subscriptions[0]?.assigned_surveys;
      const fetchPromises = assignedSurveys.map(async (survey) => {
        const result = await axiosConfig.get(
          `api/surveys/${survey.code}/results/`
        );
        return result.data;
      });

      const results = await Promise.all(fetchPromises);
      const combinedResults = results.reduce(
        (acc, cur) => [...acc, ...cur],
        []
      );
      console.log(combinedResults);
      setSurveyHistory(combinedResults);
      getOptions(combinedResults);
      setPending(false); // Fetching complete, set pending to false
    } catch (err) {
      console.error("surveyhistory", err);
      setPending(false); // Fetching failed, set pending to false
    }
  }, [subscriptions]);

  const getCompanySurvey = useCallback(async () => {
    setCompanySurveyHistory([]);
    setMergedCompanyHistory([]);
    setSurveyOptions([]);

    if (subscriptions.length > 0) {
      try {
        const assignedSurveys = subscriptions[0]?.assigned_surveys;
        const surveyRequests = assignedSurveys.map(async (survey) => {
          const result = await axiosConfig.get(
            `api/surveys/${survey.code}/company-results/`
          );
          return result.data;
        });

        const results = await Promise.all(surveyRequests);
        const combinedResults = results.reduce(
          (acc, cur) => [...acc, ...cur],
          []
        );

        setCompanySurveyHistory(results);
        setMergedCompanyHistory(combinedResults);
        getOptions(combinedResults);
      } catch (err) {
        console.error(err);
      }
    }
  }, [subscriptions]);

  const getOptions = (allSurvey) => {
    const options = [];
    allSurvey.map((survey) => {
      let data = {
        label: `${survey.name} - ${survey.survey}`,
        value: survey,
      };
      options.push(data);
    });
    setSurveyOptions(options);
  };

  useEffect(() => {
    if (session?.user?.data?.user_profile?.user_type === companyUser) {
      getCompanySurvey();
    } else {
      getSurveyHistory();
    }
  }, [
    companyUser,
    session?.user?.data?.user_profile?.user_type,
    getSurveyHistory,
    getCompanySurvey,
  ]);

  return (
    <SurveyHistory.Provider
      value={{
        pending,
        surveyHistory,
        surveyOptions,
        companySurveyHistory,
        mergedCompanyHistory,
      }}
    >
      {children}
    </SurveyHistory.Provider>
  );
};

export const useSurveyHistoryContext = () => React.useContext(SurveyHistory);
