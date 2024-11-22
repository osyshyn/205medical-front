import React, { ReactElement } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomHistoryRouter from "./routes/CustomHistoryRouter";
import AppRoutes from "./routes/Router";
import { history } from "./services/history";

function App(): ReactElement {
  return (
    <CustomHistoryRouter history={history}>
      <div className="App flex h-screen flex-col overflow-x-hidden">
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
    </CustomHistoryRouter>
  );
}

export default App;
