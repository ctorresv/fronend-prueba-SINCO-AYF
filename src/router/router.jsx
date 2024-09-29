import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";

function AppRouter() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;