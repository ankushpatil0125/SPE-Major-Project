import "./App.css";
import LoginComponent from "./components/Login/LoginComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterComponent from "./components/Register/RegisterComponent";
import AdminHomePage from "./components/Admin/AdminHomePage"; 
import AboutComponent from "./components/About/AboutComponent";
import UserHomePage from "./components/User/UserHomePage";
import GiveReviewComponent from "./components/User/GiveReviewComponent";
import ViewReviewComponent from "./components/Admin/ViewReviewComponent";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/view-review" element={<ViewReviewComponent />} />
        <Route path="/give-review" element={<GiveReviewComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
