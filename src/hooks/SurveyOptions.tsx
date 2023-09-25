import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { UserTypes } from "utils/userTypes";

interface SurveyOption {
  label: string;
  value: any;
}

const localData = [
  {
    name: "Side scan survey",
    survey: 3,
    parameters: {
      calibration_parameters: {
        pitch_boresight: 9,
        roll_boresight: 3,
        yaw_boresight: 9,
        pitch_boresight_uncertainty: 5,
        roll_boresight_uncertainty: 9,
        yaw_boresight_uncertainty: 1,
        "latency_gnss-usbl": 3,
        "latency_gnss-ins-of-usbl": 7,
        ford_gnss_usbl_transducer: 6,
        ford_ins_of_the_usbl_and_gnss: 2,
        std_gnss_and_usbl_transducer: 2,
        std_ins_of_the_usbl_the_gnss: 2,
      },
      "performance_ins-gnss-usbl": {
        yaw_uncertainty: 0.05,
        roll_uncertainty: 0.06,
        pitch_uncertainty: 0.07,
        positioning_uncertainty_in_h: 0.08,
        positioning_uncertainty_in_v: 0.09,
        heave_uncertainty: 0.1,
        slant_range_uncertainty_of_the_usbl: 3,
        angle_uncertainty_of_the_usbl: 3,
      },
      survey_platform_performance: {
        survey_speed: 2.5,
        survey_speed_uncertainty: 0.2,
        draft_uncertainty: 0.01,
        variation_in_z_due_to_loads: 0.03,
      },
      lever_arm_measures_between: {
        lever_arms_uncertainty: 3,
        ford_gnss_smf: 2,
        ford_ins_and_gnss: 6,
        down_ins_and_gnss: 7,
        down_gnss_and_smf: 1,
        std_ins_and_gnss: 9,
        std_gnss_and_smf: 3.3,
        sounding_reduction: "gnss",
      },
      operational_conditions: {
        mean_sound_speed: 1500,
        max_depth_of_the_svp: 200,
        svs_uncertainty: 0.1,
        svp_uncertainty: 0.2,
        uncert_svp_beyond_its_max_depth: 0.3,
        tide_uncertainty: 0.05,
        co_tidal_uncertainty: 0.06,
        altitude_of_sss: 0.3,
        distance_x_between_sss_and_usbl: 32,
      },
      "performance_of_ssss-s1-s2-s3-s4": [
        {
          defined_operating_frequency: 100,
          horizontal_field_of_view: 20,
          vertical_field_of_view: 10,
          beamwidth: 256,
          pulse_duration: 0.1,
          depression_angle: 120,
          max_range_of_sss: 1,
        },
        {
          defined_operating_frequency: 100,
          horizontal_field_of_view: 20,
          vertical_field_of_view: 10,
          beamwidth: 256,
          pulse_duration: 0.1,
          depression_angle: 120,
          max_range_of_sss: 1,
        },
        {
          defined_operating_frequency: 100,
          horizontal_field_of_view: 20,
          vertical_field_of_view: 10,
          beamwidth: 256,
          pulse_duration: 0.1,
          depression_angle: 120,
          max_range_of_sss: 1,
        },
        {
          defined_operating_frequency: 100,
          horizontal_field_of_view: 20,
          vertical_field_of_view: 10,
          beamwidth: 256,
          pulse_duration: 0.1,
          depression_angle: 120,
          max_range_of_sss: 1,
        },
      ],
    },
  },

  {
    name: "Multibeam Survey",
    survey: 1,
    parameters: {
      calibration_parameters: {
        pitch_boresight: 0.5,
        roll_boresight: -0.2,
        yaw_boresight: 0.1,
        pitch_boresight_uncertainty: 0.01,
        roll_boresight_uncertainty: 0.02,
        yaw_boresight_uncertainty: 0.03,
        "latency_gnss-usbl": 0.5,
        "latency_gnss-ins-of-usbl": 0.8,
        ford_gnss_usbl_transducer: 0.01,
        ford_ins_of_the_usbl_and_gnss: 0.02,
        std_gnss_and_usbl_transducer: 0.03,
        std_ins_of_the_usbl_the_gnss: 0.04,
        "latency_gnss-smf": 0.3,
        "uncty_of_latency_gnss-smf": 0.3,
        "latency_gnss-ins": 0.3,
        "uncty_of_latency_gnss-ins": 0.3,
      },
      "performance_ins-gnss-usbl": {
        yaw_uncertainty: 0.01,
        roll_uncertainty: 0.02,
        pitch_uncertainty: 0.03,
        positioning_uncertainty_in_h: 0.1,
        positioning_uncertainty_in_v: 0.2,
        heave_uncertainty: 0.05,
        slant_range_uncertainty_of_the_usbl: 0.1,
        angle_uncertainty_of_the_usbl: 0.2,
      },
      survey_platform_performance: {
        survey_speed: 2.5,
        survey_speed_uncertainty: 0.1,
        draft_uncertainty: 0.02,
        variation_in_z_due_to_loads: 0.05,
      },
      operational_conditions: {
        depth: 4,
        incidence_angle_of_mbes: 3,
        mean_sound_speed: 1500,
        max_depth_of_the_svp: 500,
        svs_uncertainty: 0.1,
        svp_uncertainty: 0.2,
        uncert_svp_beyond_its_max_depth: 0.3,
        tide_uncertainty: 0.02,
        co_tidal_uncertainty: 0.03,
        altitude_of_sss: 10,
        distance_x_between_sss_and_usbl: 20,
      },
      lever_arm_measures_between: {
        lever_arms_uncertainty: 0.4,
        ford_gnss_smf: 0.4,
        ford_ins_and_gnss: 9,
        down_ins_and_gnss: 3,
        down_gnss_and_smf: 2,
        std_ins_and_gnss: 0.5,
        std_gnss_and_smf: 0.5,
        sounding_reduction: "gnss",
      },
      "performance_of_mbess-s1-s2-s3-s4": [
        {
          defined_operating_frequency: 200,
          horizontal_field_of_view: 120,
          vertical_field_of_view: 30,
          pulse_duration: 0.02,
          beamwidth: 1,
          depression_angle: -10,
          max_range_of_sss: 100,
          along_track_beanwidth: 32,
          accross_track_beanwidth: 3,
          beams_number: 2,
          depth_resolution: 6,
          ping_rate: 7,
          user_defined_swath_coverage: 100,
          shape_of_atennna: "rectangular",
        },
        {
          defined_operating_frequency: 210,
          horizontal_field_of_view: 110,
          vertical_field_of_view: 25,
          pulse_duration: 0.03,
          beamwidth: 1.5,
          depression_angle: -5,
          max_range_of_sss: 120,
          along_track_beanwidth: 32,
          accross_track_beanwidth: 3,
          beams_number: 2,
          depth_resolution: 6,
          ping_rate: 7,
          user_defined_swath_coverage: 90,
          shape_of_atennna: "rectangular",
        },
        {
          defined_operating_frequency: 220,
          horizontal_field_of_view: 100,
          vertical_field_of_view: 20,
          pulse_duration: 0.04,
          beamwidth: 2,
          depression_angle: 0,
          max_range_of_sss: 150,
          along_track_beanwidth: 32,
          accross_track_beanwidth: 3,
          beams_number: 2,
          depth_resolution: 6,
          ping_rate: 7,
          user_defined_swath_coverage: 60,
          shape_of_atennna: "rectangular",
        },
        {
          defined_operating_frequency: 230,
          horizontal_field_of_view: 90,
          vertical_field_of_view: 15,
          pulse_duration: 0.05,
          beamwidth: 2.5,
          depression_angle: 5,
          max_range_of_sss: 180,
          along_track_beanwidth: 32,
          accross_track_beanwidth: 3,
          beams_number: 2,
          depth_resolution: 6,
          ping_rate: 7,
          user_defined_swath_coverage: 30,
          shape_of_atennna: "rectangular",
        },
      ],
    },
  },
];
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
    localData?.map((survey) => {
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
