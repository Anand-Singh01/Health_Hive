import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Home from "./pages/Home/Home";

export const App = () => {
  return (
    <div className="font-sans w-screen h-screen">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
};