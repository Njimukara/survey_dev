import axiosConfig from "axiosConfig";
import { useSession } from "next-auth/react";
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
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const getPlans = async () => {
    try {
      const response = await axiosConfig.get(`/api/plans/list-with-price`);
      if (response.data.length > 0) {
        setPlans(response.data);
      }
      setLoading(false);
    } catch (err) {
      // console.log("sub error", err);
      setErrors(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <PlanContext.Provider
      value={{
        plans,
        setPlans,
        errors,
        loading,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlanContext = () => useContext(PlanContext);

// export function usePlanContext() {
//   const { plans, setPlans } = useContext(PlanContext);
//   //function to push data to array

//   return {
//     plans,
//     setPlans,
//     errors,
//     loading,
//   };
// }
