import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<>404 Page Not Found</>} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
