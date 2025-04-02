import { BrowserRouter, useLocation } from "react-router-dom";

import "./App.css";
import { Provider } from "react-redux";
import RoutesApp from "./route/RouteS";
import store from "./store/Store";
import { useEffect } from "react";
import { Toaster } from "sonner";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <RoutesApp />
          <Toaster position="bottom-right" duration={1500} richColors />
        </BrowserRouter>
      </Provider>

    </>
  );
}
export default App;
