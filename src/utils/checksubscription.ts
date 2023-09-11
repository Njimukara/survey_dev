import { UserTypes } from "./userTypes";

type Survey = {
  id: number;
  name: string;
  code: string;
  code_value: string;
  is_active: boolean;
  is_delete: boolean;
};

export const checkSubscription = (
  currentSubscription: any,
  surveyToCheck: Survey
) => {
  const surveys = currentSubscription?.assigned_surveys || [];
  const matchingSurvey = surveys.find(
    (survey: Survey) => survey.id === surveyToCheck?.id
  );

  return matchingSurvey ? [matchingSurvey.id] : [];
};
