import React, {
  useReducer,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import reducer from "../reducer/reducer";
import data from "../data/data";

interface CartItem {
  id: number;
  title: string;
  price: number;
  img: string;
  amount: number;
}

interface AppState {
  loading: boolean;
  cart: CartItem[];
  total: number;
  amount: number;
}

interface AppContextProps extends AppState {
  clearCart: () => void;
  remove: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  toggleAmount: (id: number, type: "inc" | "dec") => void;
}

const initialState: AppState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const remove = (id: number) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const increase = (id: number) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  const decrease = (id: number) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const toggleAmount = (id: number, type: "inc" | "dec") => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    // const response = await fetch(JSON.stringify(data));
    // const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: data });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, remove, increase, decrease, toggleAmount }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a AppProvider");
  }
  return context;
};

export { AppContext, AppProvider };
