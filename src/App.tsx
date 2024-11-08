import React, { ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "./components/Sidebar";
import { store } from "./redux/store";
import CustomHistoryRouter from "./routes/CustomHistoryRouter";
import AppRoutes from "./routes/Router";
import { history } from "./services/history";

function App(): ReactElement {
  return (
    <CustomHistoryRouter history={history}>
      <ReduxProvider store={store}>
        <div className="App flex h-screen overflow-y-auto overflow-x-hidden">
          <Sidebar />

          <div className="w-full">
            <AppRoutes />
          </div>

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
