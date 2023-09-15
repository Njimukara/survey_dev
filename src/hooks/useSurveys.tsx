import axiosConfig from "axiosConfig";
import React, { useEffect, useState } from "react";

const useSurveys = () => {
  const [lidarSurvey, setLidarSurvey] = useState(null);
  const [multibeamSurvey, setMultibeamSurvey] = useState(null);
  const [sideScanSurvey, setSideScanSurvey] = useState(null);
  const [acousticSurvey, setacousticSurvey] = useState(null);
  const [surveys, setSurveys] = useState(null);
  const [surveysLoading, setSurveysLoading] = useState(true);

  const fetchSurveys = async () => {
    try {
      setSurveysLoading(true);
      const response = await axiosConfig.get("/api/surveys");
      const surveys = response?.data;
      setSurveys(surveys);
      surveys?.forEach((survey: any) => {
        if (survey.name.toLowerCase().includes("multibeam")) {
          setMultibeamSurvey(survey);
        } else if (survey.name.toLowerCase().includes("dynamic")) {
          setLidarSurvey(survey);
        } else if (survey.name.toLowerCase().includes("side")) {
          setSideScanSurvey(survey);
        } else if (survey.name.toLowerCase().includes("acoustic")) {
          setacousticSurvey(survey);
        }
      });

      setSurveysLoading(false);
    } catch (error) {
      setSurveysLoading(false);
      return error;
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return {
    surveys,
    lidarSurvey,
    multibeamSurvey,
    sideScanSurvey,
    acousticSurvey,
    surveysLoading,
  };
};

export default useSurveys;
