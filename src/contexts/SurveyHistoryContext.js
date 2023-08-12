import axiosConfig from "axiosConfig";
import React, { useState } from "react";

export const SurveyHistory = React.createContext();

export const SurveyHistoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);
  const [pending, setPending] = useState(false);
  const [arrayHistory, setArrayHistory] = useState(null);
  const [surveyOptions, setSurveyOptions] = useState([]);
  const [companySurveyHistory, setCompanySurveyHistory] = useState(null);
  const [mergedCompanyHistory, setMergedCompanyHistory] = useState(null);

  const [surveyOrder, setSurveyOrder] = useState("null");

  const getSurveyHistory = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get("/api/surveys");
      const surveyData = response.data;

      const requests = surveyData.map((survey) =>
        axiosConfig.get(`api/surveys/${survey.code}/results/`)
      );

      const results = await Promise.all(requests);

      const surveyHistory = results.map((res) => res.data);
      const merged = surveyHistory.flat(1);

      getOptions(merged);

      setHistory(merged);
      setArrayHistory(surveyHistory);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getCompanySurvey = async () => {
    setPending(true);

    try {
      const response = await axiosConfig.get("/api/surveys");
      const surveyData = response.data;

      const requests = surveyData.map((survey) =>
        axiosConfig.get(`api/surveys/${survey.code}/company-results/`)
      );

      const results = await Promise.all(requests);

      const companyHistory = results.map((res) => res.data);
      const merged = companyHistory.flat(1);

      setMergedCompanyHistory(merged);
      setCompanySurveyHistory(companyHistory);
      setPending(false);
    } catch (error) {
      setPending(false);
    }
  };

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
