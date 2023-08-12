import axiosConfig from "axiosConfig";
import React, { useEffect, useState } from "react";
import { useSubscription } from "./SubscriptionContext";

export const AllSurveys = React.createContext();

export const AllSurveysProvider = ({ children }) => {
  const [surveys, setSurveys] = useState(null);
  const [surveyError, setSurveyError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lidar, setLidar] = useState(null);
  const [multibeam, setMultibeam] = useState(null);
  const [sideScan, setSideScan] = useState(null);
  const [acoustic, setAcoustic] = useState(null);
  // const { subscriptions } = useSubscription();

  const getAllSurveys = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get("/api/surveys");
      const surveysData = response.data;
      setSurveys(surveysData);

      const promises = surveysData.map((survey) => {
        if (survey.name.toLowerCase().includes("multibeam")) {
          return setMultibeam(survey);
        } else if (survey.name.toLowerCase().includes("dynamic")) {
          return setLidar(survey);
        } else if (survey.name.toLowerCase().includes("side")) {
          return setSideScan(survey);
        } else if (survey.name.toLowerCase().includes("acoustic")) {
          return setAcoustic(survey);
        }
        return null;
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Failed to fetch surveys:", error);
      setSurveyError("Failed to get surveys");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSurveys();
  }, []);

  return (
    <AllSurveys.Provider
      value={{
        loading,
        surveys,
        multibeam,
        lidar,
        acoustic,
        sideScan,
        surveyError,
        getAllSurveys,
      }}
    >
      {children}
    </AllSurveys.Provider>
  );
};

export const useAllSurveysContext = () => React.useContext(AllSurveys);
