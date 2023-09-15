import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { UserTypes } from "utils/userTypes";

interface SurveyOption {
  label: string;
  value: any;
}

const useSurveyOptions = (surveyType: number) => {
  const [surveyOptions, setSurveyOptions] = useState<SurveyOption[]>([]);
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const userProfile = sessionUser?.data?.user_profile;
  const userType = userProfile?.user_type;

  const surveyHistoryData = useSelector(
    (state: RootState) => state.reduxStore.surveyHistory
  );
  const {
    mergedCompanySurveys,
    mergedSurveyHistory,
  }: { mergedCompanySurveys: any[]; mergedSurveyHistory: any[] } =
    surveyHistoryData;

  useEffect(() => {
    if (userType === UserTypes.COMPANY_USER) {
      const filteredSurveys = mergedCompanySurveys?.filter(
        (survey: any) => survey.survey === surveyType
      );
      getOptions(filteredSurveys);
    } else {
      const filteredSurveys = mergedSurveyHistory?.filter(
        (survey: any) => survey.survey === surveyType
      );
      getOptions(filteredSurveys);
    }
  }, [mergedCompanySurveys, mergedSurveyHistory, userType, surveyType]);

  const getOptions = (filteredSurveys: any[] | undefined) => {
    const options: SurveyOption[] = [];
    filteredSurveys?.map((survey) => {
      let data = {
        label: `${survey.name} - ${survey.survey}`,
        value: survey,
      };
      options.push(data);
    });
    setSurveyOptions(options);
  };

  return {
    surveyOptions,
  };
};

export default useSurveyOptions;
