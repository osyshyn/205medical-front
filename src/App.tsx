import React, { ReactElement } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomHistoryRouter from "./routes/CustomHistoryRouter";
import AppRoutes from "./routes/Router";
import { history } from "./services/history";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App(): ReactElement {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
    </GoogleOAuthProvider>
  );
}

export default App;
