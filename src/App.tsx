import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import { ROUTES } from "./global-utils";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.COURT_LOCATOR} element={<></>} />
          <Route path={ROUTES.NOT_FOUND} element={<>404 Page Not Found</>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
