import CustomMenu from "./components/CustomMenu/CustomMenu.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./MainPage.tsx";
import ProfilePage from "./ProfilePage.tsx";

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <CustomMenu />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />
        <Route path="/todos" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
export default App;
