interface CartItem {
  id: number;
  title: string;
  price: number;
  img: string;
  amount: number;
}

interface State {
  loading: boolean;
  cart: CartItem[];
  total: number;
  amount: number;
}

type Action =
  | { type: "CLEAR_CART" }
  | { type: "REMOVE"; payload: number }
  | { type: "INCREASE"; payload: number }
  | { type: "DECREASE"; payload: number }
  | { type: "GET_TOTALS" }
  | { type: "LOADING" }
  | { type: "DISPLAY_ITEMS"; payload: CartItem[] }
  | { type: "TOGGLE_AMOUNT"; payload: { id: number; type: "inc" | "dec" } };

const reducer = (state: State, action: Action): State => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    const tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    const { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const itemTotal = cartItem.price * cartItem.amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += cartItem.amount;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    return { ...state, total: parseFloat(total.toFixed(2)), amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === "TOGGLE_AMOUNT") {
    const tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }

  throw new Error("no matching action type");
};

export default reducer;
