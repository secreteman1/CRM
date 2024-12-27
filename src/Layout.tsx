import { Outlet } from "react-router-dom";
import CustomMenu from "./components/CustomMenu/CustomMenu.tsx";

const Layout = () => {
  return (
    <>
      <div className="sidebar">
        <CustomMenu />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
