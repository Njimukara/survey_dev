import axiosConfig from "axiosConfig";
import React from "react";

export const AllSurveys = React.createContext();

export const AllSurveysProvider = ({ children }) => {
  const [surveys, setSurveys] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [lidar, setLidar] = React.useState(null);
  const [multibeam, setMultibeam] = React.useState(null);
  const [sideScan, setSideScan] = React.useState(null);
  const [acoustic, setAcoustic] = React.useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <AllSurveys.Provider
      value={{
        loading,
        surveys,
        multibeam,
        lidar,
        acoustic,
        sideScan,
        getAllSurveys,
      }}
    >
      {children}
    </AllSurveys.Provider>
  );
};

export const useAllSurveysContext = () => React.useContext(AllSurveys);
