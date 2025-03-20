import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { Provider } from "react-redux";
import RoutesApp from "./route/RouteS";
import store from "./store/Store";

function App() {
  return (
    <>
      <BrowserRouter>
      <Provider store={store}>
        <RoutesApp />
        </Provider>,
      </BrowserRouter>
    </>
  );
}
export default App;
