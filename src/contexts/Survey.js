import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

const SurveyContext = createContext();

export function SurveyContextProvider({ children }) {
  // const [plans, setPlans] = useState([]);

  const [form, setForm] = useState({
    pitchboresight: null,
    rollBoresight: null,
    yawBoresight: null,
    yawUncertainty: null,
    pitchUncertainty: null,
    rollUncertainty: null,
    latencyGNSSINS: null,
    latencyGNSSUSBL: null,
    latencyUnctyGNSSINS: null,
    latencyUnctyGNSSLiDAR: null,
  });

  return (
    <SurveyContext.Provider
      value={{
        form,
        setForm,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurveyContext() {
  const { survey, setSurvey } = useContext(SurveyContext);
  //function to push data to array
  // const addToStore = (product) => {
  //   setPlans(product);
  // };

  const [loading, setLoading] = useState(true);
  const [surveyResults, setSurveyResults] = useState([]);

  const [form, setForm] =
    useState();
    //   {
    //   pitchboresight: null,
    //   rollBoresight: null,
    //   yawBoresight: null,
    //   yawUncertainty: null,
    //   pitchUncertainty: null,
    //   rollUncertainty: null,
    //   latencyGNSSINS: null,
    //   latencyGNSSUSBL: null,
    //   latencyUnctyGNSSINS: null,
    //   latencyUnctyGNSSLiDAR: null,
    // }

  const handleFormChange = (event) => {
    // Clone form because we need to modify it
    const updatedForm = { ...form };

    // Get the name of the field that caused this change event
    // Get the new value of this field
    // Assign new value to the appropriate form field
    updatedForm[event.target.name] = event.target.value;

    console.log("Form changed: ", updatedForm);
    // console.log(event);

    // Update state
    setForm(updatedForm);
  };

  const planSurvey = () => {
    setLoading(true);

    console.log("form in context", form);
    setSurveyResults([
      {
        name: "Swath Width (m)",
        value1: 1,
        value2: 3,
        value3: 6,
        value4: 22,
      },
      {
        name: "Swath Width (m)",
        value1: 1,
        value2: 34,
        value3: 6,
        value4: 7,
      },
      {
        name: "Ratio Swath/Height-distance",
        value1: 2,
        value2: 2,
        value3: 1,
        value4: 0,
      },
      {
        name: "Max slant range (m))",
        value1: 1,
        value2: 2,
        value3: 1,
        value4: 1,
      },
      {
        name: "Interprofit Spacing (m)",
        value1: 9,
        value2: 7,
        value3: 5,
        value4: 23,
      },
    ]);
    setLoading(false);
  };

  return {
    // survey,
    form,
    loading,
    // setSurvey,
    surveyResults,
    planSurvey,
    handleFormChange,
  };
}
