import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import { ROUTES } from "./global-utils";
import "./App.scss";
import Login from "./components/login/login.component";
import CourtMap from "./components/courtmap/courtmap.component";
import GoogleMapsLoader from "./components/courtmap/googlemapsloader";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <GoogleMapsLoader>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.COURT_MAP} element={<CourtMap />} />
            <Route path={ROUTES.COMMUNITY} element={<></>} />
            <Route path={ROUTES.SHOP} element={<></>} />
            <Route path={ROUTES.EVENTS} element={<></>} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.PROFILE} element={<></>} />
            <Route path={ROUTES.SETTINGS} element={<></>} />
            <Route path={ROUTES.NOT_FOUND} element={<>404 Page Not Found</>} />
          </Routes>
        </GoogleMapsLoader>
      </div>
      <Footer />
    </div>
  );
};

export default App;
