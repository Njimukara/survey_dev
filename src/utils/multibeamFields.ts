export const performaceCardFields = [
  {
    name: "perforance_card.defined_operating_frequency",
    label: "defined_operating_frequency",
    type: "number",
  },
  {
    name: "perforance_card.horizontal_field_of_view",
    label: "horizontal_field_of_view",
    type: "number",
  },
  {
    name: "perforance_card.vertical_field_of_view",
    label: "vertical_field_of_view",
    type: "number",
  },
  {
    name: "perforance_card.pulse_duration",
    label: "pulse_duration",
    type: "number",
  },
  {
    name: "perforance_card.pulse_duration",
    label: "pulse_duration",
    type: "number",
  },
  {
    name: "perforance_card.beamwidth",
    label: "beamwidth",
    type: "number",
  },
  {
    name: "perforance_card.depression_angle",
    label: "depression_angle",
    type: "number",
  },
  {
    name: "perforance_card.max_range_of_sss",
    label: "max_range_of_sss",
    type: "number",
  },
  {
    name: "perforance_card.along_track_beanwidth",
    label: "along_track_beanwidth",
    type: "number",
  },
  {
    name: "perforance_card.accross_track_beanwidth",
    label: "accross_track_beanwidth",
    type: "number",
  },
  {
    name: "perforance_card.beams_number",
    label: "beams_number",
    type: "number",
  },
  {
    name: "perforance_card.depth_resolution",
    label: "depth_resolution",
    type: "number",
  },
  {
    name: "perforance_card.ping_rate",
    label: "accross_track_beanwidth",
    type: "number",
  },
  {
    name: "perforance_card.user_defined_swath_coverage",
    label: "user_defined_swath_coverage",
    type: "select",
    options: [
      20, 30, 45, 60, 75, 90, 100, 110, 120, 130, 140, 145, 150, 165, 170, 175,
    ],
  },
  {
    name: "perforance_card.shape_of_atennna",
    label: "shape_of_atennna",
    type: "select",
    options: ["rectangular", "circular"],
  },
];

export const lever_arm_measuresFields = [
  {
    name: "lever_arm_measures_between.lever_arms_uncertainty",
    label: "lever_arms_uncertainty",
    type: "number",
  },
  {
    name: "lever_arm_measures_between.ford_gnss_smf",
    label: "ford_gnss_smf",
    type: "number",
  },
  {
    name: "lever_arm_measures_between.ford_ins_and_gnss",
    label: "ford_ins_and_gnss",
    type: "number",
  },

  {
    name: "lever_arm_measures_between.down_ins_and_gnss",
    label: "down_ins_and_gnss",
    type: "number",
  },
  {
    name: "lever_arm_measures_between.down_gnss_and_smf",
    label: "down_gnss_and_smf",
    type: "number",
  },
  {
    name: "lever_arm_measures_between.std_ins_and_gnss",
    label: "std_ins_and_gnss",
    type: "number",
  },
  {
    name: "lever_arm_measures_between.std_gnss_and_smf",
    label: "std_gnss_and_smf",
    type: "number",
  },
  {
    name: "lever_arm_measures_between.sounding_reduction",
    label: "sounding_reduction",
    type: "select",
    options: ["gnss"],
  },
];

export const performaceINSFields = [
  {
    name: "performance_ins.yaw_uncertainty",
    label: "yaw_uncertainty",
    type: "number",
  },
  {
    name: "performance_ins.roll_uncertainty",
    label: "roll_uncertainty",
    type: "number",
  },
  {
    name: "performance_ins.pitch_uncertainty",
    label: "yaw_uncertainty",
    type: "number",
  },
  {
    name: "performance_ins.positioning_uncertainty_in_h",
    label: "positioning_uncertainty_in_h",
    type: "number",
  },
  {
    name: "performance_ins.positioning_uncertainty_in_v",
    label: "positioning_uncertainty_in_v",
    type: "number",
  },
  {
    name: "performance_ins.heave_uncertainty",
    label: "heave_uncertainty",
    type: "number",
  },
  {
    name: "performance_ins.slant_range_uncertainty_of_the_usbl",
    label: "slant_range_uncertainty_of_the_usbl",
    type: "number",
  },
  {
    name: "performance_ins.angle_uncertainty_of_the_usbl",
    label: "angle_uncertainty_of_the_usbl",
    type: "number",
  },
];

export const platformPerformanceFields = [
  {
    name: "survey_platform_performance.survey_speed",
    label: "survey_speed",
    type: "number",
  },
  {
    name: "survey_platform_performance.survey_speed_uncertainty",
    label: "survey_speed_uncertainty",
    type: "number",
  },
  {
    name: "survey_platform_performance.draft_uncertainty",
    label: "draft_uncertainty",
    type: "number",
  },
  ,
  {
    name: "survey_platform_performance.variation_in_z_due_to_loads",
    label: "variation_in_z_due_to_loads",
    type: "number",
  },
];

export const calibrationsFields = [
  {
    name: "calibration_parameters.pitch_boresight",
    label: "pitch_boresight",
    type: "number",
  },
  {
    name: "calibration_parameters.roll_boresight",
    label: "roll_boresight",
    type: "number",
  },
  {
    name: "calibration_parameters.yaw_boresight",
    label: "yaw_boresight",
    type: "number",
  },
  {
    name: "calibration_parameters.pitch_boresight_uncertainty",
    label: "pitch_boresight_uncertainty",
    type: "number",
  },
  {
    name: "calibration_parameters.roll_boresight_uncertainty",
    label: "roll_boresight_uncertainty",
    type: "number",
  },
  {
    name: "calibration_parameters.yaw_boresight_uncertainty",
    label: "yaw_boresight_uncertainty",
    type: "number",
  },
  {
    name: "calibration_parameters.latency_gnss-ins",
    label: "latency_gnss INS",
    type: "number",
  },
  {
    name: "calibration_parameters.latency_gnss-smf",
    label: "latency_gnss-smf",
    type: "number",
  },
  {
    name: "calibration_parameters.uncty_of_latency_gnss-ins",
    label: "uncty_of_latency_gnss-ins",
    type: "number",
  },
  {
    name: "calibration_parameters.uncty_of_latency_gnss-smf",
    label: "uncty_of_latency_gnss-smf",
    type: "number",
  },
  {
    name: "calibration_parameters.ford_gnss_usbl_transducer",
    label: "ford_gnss_usbl_transducer",
    type: "number",
  },
  {
    name: "calibration_parameters.ford_ins_of_the_usbl_and_gnss",
    label: "ford_ins_of_the_usbl_and_gnss",
    type: "number",
  },
  {
    name: "calibration_parameters.std_gnss_and_usbl_transducer",
    label: "std_gnss_and_usbl_transducer",
    type: "number",
  },
  {
    name: "calibration_parameters.std_ins_of_the_usbl_the_gnss",
    label: "std_ins_of_the_usbl_the_gnss",
    type: "number",
  },
  {
    name: "calibration_parameters.latency_gnss-usbl",
    label: "latency_gnss-usbl",
    type: "number",
  },
  {
    name: "calibration_parameters.latency_gnss-ins-of-usbl",
    label: "latency_gnss-ins-of-usbl",
    type: "number",
  },
];

export const operationalConditionsFields = [
  {
    name: "operational_conditions.mean_sound_speed",
    label: "mean_sound_speed",
    type: "number",
  },
  {
    name: "operational_conditions.max_depth_of_the_svp",
    label: "max_depth_of_the_svp",
    type: "number",
  },
  {
    name: "operational_conditions.svs_uncertainty",
    label: "svs_uncertainty",
    type: "number",
  },
  {
    name: "operational_conditions.svp_uncertainty",
    label: "svp_uncertainty",
    type: "number",
  },
  {
    name: "operational_conditions.uncert_svp_beyond_its_max_depth",
    label: "uncert_svp_beyond_its_max_depth",
    type: "number",
  },
  {
    name: "operational_conditions.tide_uncertainty",
    label: "tide_uncertainty",
    type: "number",
  },
  {
    name: "operational_conditions.co_tidal_uncertainty",
    label: "co_tidal_uncertainty",
    type: "number",
  },
  {
    name: "operational_conditions.depth",
    label: "depth",
    type: "number",
  },
  {
    name: "operational_conditions.altitude_of_sss",
    label: "altitude_of_sss",
    type: "number",
  },
  {
    name: "operational_conditions.incidence_angle_of_mbes",
    label: "incidence_angle_of_mbes",
    type: "number",
  },
  {
    name: "operational_conditions.distance_x_between_sss_and_usbl",
    label: "distance_x_between_sss_and_usbl",
    type: "number",
  },
];
