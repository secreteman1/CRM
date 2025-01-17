import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import Layout from "./Layout.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import PrivateRoutes from "./PrivateRoutes.tsx";
import UsersPage from "./pages/UsersPage/UsersPage.tsx";
import EditPage from "./pages/EditPage/EditPage.tsx";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="todos" element={<MainPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
          <Route path="edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
