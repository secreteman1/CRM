import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./MainPage.tsx";
import ProfilePage from "./ProfilePage.tsx";
import LoginPage from "./LoginPage.tsx";
import Layout from "./Layout.tsx";
import RegisterPage from "./RegisterPage.tsx";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route index element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="todos" element={<MainPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
