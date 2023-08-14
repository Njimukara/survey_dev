import axiosConfig from "axiosConfig";
import React, { useState, useCallback, useEffect } from "react";
import { useSubscription } from "./SubscriptionContext";
import { useSession } from "next-auth/react";

export const SurveyHistory = React.createContext();

export const SurveyHistoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);
  const [pending, setPending] = useState(false);
  const [arrayHistory, setArrayHistory] = useState(null);
  const [surveyOptions, setSurveyOptions] = useState([]);
  const [companySurveyHistory, setCompanySurveyHistory] = useState([]);
  const [mergedCompanyHistory, setMergedCompanyHistory] = useState(null);

  const [surveyOrder, setSurveyOrder] = useState("null");

  const { data: session } = useSession();

  const [companyUser] = useState(2);
  const [surveyHistory, setSurveyHistory] = useState([]);
  const [error, setError] = useState(null);
  const { subscriptions } = useSubscription();

  const getSurveyHistory = useCallback(async () => {
    setArrayHistory([]);
    setSurveyHistory([]);
    setCompanySurveyHistory([]);
    let assignedSurveys = subscriptions[0]?.assigned_surveys;

    try {
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

      setSurveyHistory(combinedResults);
      setArrayHistory(results);
      getOptions(combinedResults);
    } catch (err) {
      setError(err);
    }
  }, [
    // companyUser,
    // session?.user?.data?.user_profile?.user_type,
    subscriptions,
  ]);

  const getCompanySurvey = useCallback(async () => {
    setCompanySurveyHistory([]);
    setMergedCompanyHistory([]);
    let assignedSurveys = subscriptions[0]?.assigned_surveys;

    if (session?.user?.data?.user_profile?.user_type === companyUser) {
      try {
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

        setCompanySurveyHistory((prevHistory) => [...prevHistory, ...results]);
        setMergedCompanyHistory(combinedResults);
      } catch (err) {
        setError(err);
      }
    }
  }, [
    companyUser,
    session?.user?.data?.user_profile?.user_type,
    subscriptions,
  ]);

  useEffect(() => {
    if (subscriptions.length > 0) {
      getSurveyHistory();
      getCompanySurvey();
    }
  }, [subscriptions, getSurveyHistory, getCompanySurvey]);

  // useEffect(() => {
  //   getSurveyHistory();
  // }, [getSurveyHistory]);

  // useEffect(() => {
  //   getCompanySurvey();
  // }, [getCompanySurvey]);

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

  const updateSurveyOrder = (data) => {
    setSurveyOrder(data);
  };

  return (
    <SurveyHistory.Provider
      value={{
        loading,
        history,
        pending,
        arrayHistory,
        surveyOptions,
        companySurveyHistory,
        mergedCompanyHistory,
        getSurveyHistory,
        surveyHistory,
        getCompanySurvey,
        surveyOrder,
        updateSurveyOrder,
      }}
    >
      {children}
    </SurveyHistory.Provider>
  );
};

export const useSurveyHistoryContext = () => React.useContext(SurveyHistory);
