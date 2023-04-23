import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

const PlanContext = createContext();

export function PlanContextProvider({ children }) {
  const [plans, setPlans] = useState([]);

  return (
    <PlanContext.Provider
      value={{
        plans,
        setPlans,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlanContext() {
  const { plans, setPlans } = useContext(PlanContext);
  //function to push data to array
  const addToStore = (product) => {
    setPlans(product);
  };

  return {
    plans,
    setPlans,
    addToStore,
  };
}
