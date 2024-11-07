import React, { ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "./services/history";
import CustomHistoryRouter from "./routes/CustomHistoryRouter";
import AppRoutes from "./routes/Router";
import { store } from "./redux/store";

function App(): ReactElement {
  return (
    <CustomHistoryRouter history={history}>
      <ReduxProvider store={store}>
        <div className="App flex flex-col h-screen overflow-y-auto overflow-x-hidden">
          <AppRoutes />
          <ToastContainer
            position="bottom-right"
            theme="light"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            transition={Bounce}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </ReduxProvider>
    </CustomHistoryRouter>
  );
}

export default App;
