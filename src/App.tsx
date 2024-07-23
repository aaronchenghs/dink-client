import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import { ROUTES } from "./global-utils";
import GoogleMapsLoader from "./components/courtmap/googlemapsloader";
import { Suspense, useEffect } from "react";
import { dispatch } from "./store";
import { initializeAuth } from "./services";
import { UniversalFeedback } from "./middleware/Feedback/feedback";
import LoadingOverlay from "./components/loadingoverlay/loadingplaceholder.component";
import { HomePage, CourtLocatorPage, LoginPage } from "./components/Routes";

import "./App.scss";

const App = () => {
  //const $loading = useSelector((state: AppState) => state.auth.loading);

  useEffect(() => {
    initializeAuth(dispatch);
  }, []);

  return (
    <div className="app-container">
      <Header />

      <div className="main-content">
        <GoogleMapsLoader>
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={
                <Suspense
                  fallback={<LoadingOverlay message="Loading Home Page..." />}
                >
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.COURT_LOCATOR}
              element={
                <Suspense
                  fallback={<LoadingOverlay message="Loading Map..." />}
                >
                  <CourtLocatorPage />
                </Suspense>
              }
            />
            <Route path={ROUTES.COMMUNITY} element={<></>} />
            <Route path={ROUTES.SHOP} element={<></>} />
            <Route path={ROUTES.EVENTS} element={<></>} />
            <Route
              path={ROUTES.LOGIN}
              element={
                <Suspense
                  fallback={<LoadingOverlay message="Loading Login Page..." />}
                >
                  <LoginPage />
                </Suspense>
              }
            />
            <Route path={ROUTES.PROFILE} element={<></>} />
            <Route path={ROUTES.SETTINGS} element={<></>} />
            <Route
              path={ROUTES.NOT_FOUND}
              element={<>404 Page Not Found...</>}
            />
          </Routes>
        </GoogleMapsLoader>
      </div>

      <Footer />

      <UniversalFeedback />
    </div>
  );
};

export default App;
