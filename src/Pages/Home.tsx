
import { useReducer } from "react";

const Home = () => {
  const counterReducer = (
    state: { count: number; name: string; product: string },
    action: { type: string }
  ) => {
    switch (action.type) {
      case "Increment":
        return { ...state, count: state.count + 1 };
      case "Decrement":
        return { ...state, count: state.count - 1 };
      case "ChangeName":
        return { ...state, name: "Vijay" };
      case "DechangeName":
        return { ...state, name: "Ajith" };
      case "ChangeProduct":
        return { ...state, product: "PS3" };
      case "DechangeProduct":
        return { ...state, product: "PS5" };
      default:
        return state;
    }
  };
  
  const initialValue = {
    count: 0,
    name: "Ajith",
    product: "PS5",
  };
 
  const [count] = useReducer(counterReducer, initialValue);
  return (
    <div>
      <h1>name:{count.name}</h1>
      <h1>Count:{count.count}</h1>
      <h1>game:{count.product}</h1>

    </div>
  );
};

export default Home;
