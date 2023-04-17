import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

const SubscriptionContext = createContext();

export function SubscriptionContextProvider({ children }) {
  const [store, setStore] = useState([]);

  return (
    <SubscriptionContext.Provider
      value={{
        store,
        setStore,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const { store, setStore } = useContext(SubscriptionContext);

  //function to push data to array
  const addToStore = (product) => {
    console.log("i got to the store");
    console.log("printing the subscriptions", product);
    setStore(product);
  };

  return {
    store,
    setStore,
    addToStore,
  };
}
