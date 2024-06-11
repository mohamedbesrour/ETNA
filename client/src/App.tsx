import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Navigation from "./navigation/Navigation";
import Footer from "./navigation/Footer";

const App: React.FC = () => {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Fragment>
            <Navigation />
            <Footer />
          </Fragment>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
