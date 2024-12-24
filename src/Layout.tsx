import { Outlet } from "react-router-dom";
import CustomMenu from "./components/CustomMenu/CustomMenu.tsx";

const Layout = () => {
  return (
    <>
      <CustomMenu />
      <Outlet />
    </>
  );
};

export default Layout;
