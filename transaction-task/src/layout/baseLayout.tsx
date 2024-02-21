import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const BaseLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-60 sticky h-screen overflow-hidden top-10 pt-4 bg-green-100">
        <div className="flex flex-col pt-0.5 px-4 mb-4 gap-x-2 items-center justify-center text-2xl font-bold">
         Dashboard
        </div>
        <Sidebar />
      </div>
      <div className="w-full h-[100vh] overflow-auto px-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
