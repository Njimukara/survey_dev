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

  // const getSurveyHistory = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosConfig.get("/api/surveys");
  //     const surveyData = response.data;

  //     const requests = surveyData.map((survey) =>
  //       axiosConfig.get(`api/surveys/${survey.code}/results/`)
  //     );

  //     const results = await Promise.all(requests);

  //     // const surveyHistory = results.map((res) => res.data);

  //     const surveyHistory = results
  //       .map((res) => {
  //         if (res.error) {
  //           // Handle the error here, e.g., logging or handling failed result
  //           return null; // Return null for failed requests
  //         }
  //         return res.data; // Return data for successful requests
  //       })
  //       .filter(Boolean); // Remove null values from the array

  //     const merged = surveyHistory.flat(1);

  //     getOptions(merged);

  //     setHistory(merged);
  //     setArrayHistory(surveyHistory);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  const { data: session } = useSession();

  const [companyUser] = useState(2);
  const [surveyHistory, setSurveyHistory] = useState([]);
  const [error, setError] = useState(null);
  const { subscriptions } = useSubscription();

  const getSurveyHistory = useCallback(async () => {
    if (subscriptions.length <= 0) {
      return;
    } else {
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
      } catch (err) {
        setError(err);
      }

      if (session?.user?.data?.user_profile?.user_type === companyUser) {
        assignedSurveys.forEach(async (survey) => {
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
        // getCompanySurvey,
        surveyOrder,
        updateSurveyOrder,
      }}
    >
      {children}
    </SurveyHistory.Provider>
  );
};

export const useSurveyHistoryContext = () => React.useContext(SurveyHistory);
