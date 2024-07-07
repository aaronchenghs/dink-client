import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import { ROUTES } from "./global-utils";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.COURT_LOCATOR} element={<></>} />
        <Route path={ROUTES.NOT_FOUND} element={<>404 Page Not Found</>} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
