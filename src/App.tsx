import CustomMenu from "./components/CustomMenu/CustomMenu.tsx";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage.tsx";
import ProfilePage from "./ProfilePage.tsx";

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <CustomMenu />
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
export default App;
