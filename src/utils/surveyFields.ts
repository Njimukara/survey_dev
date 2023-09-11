// operationalConditions: Yup.object().shape({
//   flying_height_or_distance: Yup.number().required("required"),
//   max_depth_of_the_svp: Yup.number().required("required"),
//   angle_of_incidence_of_a_beam: Yup.number().required("required"),
//   overlap_rate: Yup.number().required("required"),
//   width_of_the_study_area: Yup.number().required("required"),
//   length_of_the_study_area: Yup.number().required("required"),
//   tide_uncertainty: Yup.number().required("required"),
//   co_tidal_uncertainty: Yup.number().required("required"),
// }),
// calibration_parameters: Yup.object().shape({
//   pitch_boresight: Yup.number().required(),
// }),
// survey_platform_performance: Yup.object().shape({
//   flying_height_or_distance: Yup.number().required("required"),
//   draft_uncertainty: Yup.number().required("required"),
//   variation_in_z_due_to_loads: Yup.number().required("required"),
// }),
// "performance_ins-gnss-usbl": Yup.object().shape({
//   yaw_uncertainty: Yup.number().required("required"),
//   roll_uncertainty: Yup.number().required("required"),
//   pitch_uncertainty: Yup.number().required("required"),
//   positioning_uncertainty_in_h: Yup.number().required("required"),
//   positioning_uncertainty_in_v: Yup.number().required("required"),
//   heave_uncertainty: Yup.number().required("required"),
// }),
// lever_arm_measures_between: Yup.object().shape({
//   lever_arms_uncertainty: Yup.number().required("required"),
//   ford_gnss_smf: Yup.number().required("required"),
//   ford_ins_and_gnss: Yup.number().required("required"),
//   down_ins_and_gnss: Yup.number().required("required"),
//   down_gnss_and_smf: Yup.number().required("required"),
//   std_ins_and_gnss: Yup.number().required("required"),
//   std_gnss_and_lidar: Yup.number().required("required"),
// }),

// const objectShape = Yup.object().shape({
//   maximum_range: Yup.number().required("Maximum Range is required"),
//   beam_divergence: Yup.number().required("Beam Divergence is required"),
//   signal_to_noise_ratio: Yup.number().required(
//     "Signal to Noise Ratio is required"
//   ),
//   uncertainty_of_divergence: Yup.number().required(
//     "Uncertainty of Divergence is required"
//   ),
//   pulse_duration: Yup.number().required("Pulse Duration is required"),
//   pulse_repetition_rate: Yup.number().required(
//     "Pulse Repetition Rate is required"
//   ),
//   range_uncertainty: Yup.number().required("Range Uncertainty is required"),
//   lidar_scanning_angle: Yup.number()
//     .oneOf([
//       15, 30, 45, 60, 75, 90, 110, 210, 130, 140, 145, 150, 165, 170, 175,
//     ])
//     .required("Lidar Scanning Angle is required"),
//   texture: Yup.string()
//     .oneOf(["integrated", "external", "no-texture"])
//     .required("Texture is required"),
// });

export const performaceCardFields = [
  {
    name: "survey_platform_performance.maximum_range",
    label: "maximum_range",
    type: "number",
  },
  {
    name: "survey_platform_performance.beam_divergence",
    label: "beam_divergence",
    type: "number",
  },
  {
    name: "survey_platform_performance.signal_to_noise_ratio",
    label: "signal_to_noise_ratio",
    type: "number",
  },
  {
    name: "survey_platform_performance.uncertainty_of_divergence",
    label: "uncertainty_of_divergence",
    type: "number",
  },
  {
    name: "survey_platform_performance.pulse_duration",
    label: "pulse_duration",
    type: "number",
  },
  {
    name: "survey_platform_performance.pulse_repetition_rate",
    label: "pulse_repetition_rate",
    type: "number",
  },
  {
    name: "survey_platform_performance.range_uncertainty",
    label: "range_uncertainty",
    type: "number",
  },
  {
    name: "survey_platform_performance.lidar_scanning_angle",
    label: "lidar_scanning_angle",
    type: "select",
    options: [
      15, 30, 45, 60, 75, 90, 110, 210, 130, 140, 145, 150, 165, 170, 175,
    ],
  },
  {
    name: "survey_platform_performance.texture",
    label: "texture",
    type: "select",
    options: ["integrated", "external", "no-texture"],
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
  // {
  //   name: "lever_arm_measures_between.ford_ins_and_gnss",
  //   label: "ford_ins_and_gnss",
  //   type: "number",
  // },
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
    name: "lever_arm_measures_between.std_gnss_and_lidar",
    label: "std_gnss_and_lidar",
    type: "number",
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
];

export const platformPerformanceFields = [
  {
    name: "survey_platform_performance.survey_speed",
    label: "survey_speed",
    type: "number",
  },
  {
    name: "survey_platform_performance.flying_height_or_distance",
    label: "flying_height_or_distance",
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
    name: "calibration_parameters.latency_gnss-lidar",
    label: "latency_gnss LiDAR",
    type: "number",
  },
  {
    name: "calibration_parameters.uncty_of_latency_gnss-ins",
    label: "uncty_of_latency_gnss-ins",
    type: "number",
  },
  {
    name: "calibration_parameters.uncty_of_latency_gnss-lidar",
    label: "uncty_of_latency_gnss-lidar",
    type: "number",
  },
];

export const operationalConditionsFields = [
  {
    name: "operational_conditions.flying_height_or_distance",
    label: "flying_height_or_distance",
    type: "number",
  },
  {
    name: "operational_conditions.max_depth_of_the_svp",
    label: "max_depth_of_the_svp",
    type: "number",
  },
  {
    name: "operational_conditions.angle_of_incidence_of_a_beam",
    label: "angle_of_incidence_of_a_beam",
    type: "number",
  },
  {
    name: "operational_conditions.overlap_rate",
    label: "overlap_rate",
    type: "number",
  },
  {
    name: "operational_conditions.width_of_the_study_area",
    label: "width_of_the_study_area",
    type: "number",
  },
  {
    name: "operational_conditions.length_of_the_study_area",
    label: "length_of_the_study_area",
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
];
