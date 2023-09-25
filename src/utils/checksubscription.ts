import { UserTypes } from "./userTypes";

type Survey = {
  id: number;
  name: string;
  code: string;
  code_value: string;
  is_active: boolean;
  is_delete: boolean;
};

const hasPermission = (currentSubscription: any) => {
  const subscriptionStatus = currentSubscription?.status?.toLowerCase();

  const isStatusActive = subscriptionStatus == "active";
  const isStatusTrialing = subscriptionStatus == "trialing";

  console.log(isStatusActive, isStatusTrialing);
  return isStatusActive || isStatusTrialing;
};

export const checkSubscription = (
  currentSubscription: any,
  surveyToCheck: Survey
) => {
  if (!hasPermission(currentSubscription)) {
    return [];
  }

  const surveys = currentSubscription?.assigned_surveys || [];
  if (surveys.length > 0) {
    const matchingSurvey = surveys.find(
      (survey: Survey) => survey.id === surveyToCheck?.id
    );
    console.log(matchingSurvey);
    return matchingSurvey ? [matchingSurvey.id] : [];
  } else return [];
};
