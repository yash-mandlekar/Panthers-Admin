import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useEffect } from "react";
import { axiosI } from "../hooks/useAxios";

const LayoutContent: React.FC = () => {
  const navigate = useNavigate();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const checkAuth = async () => {
    try {
      const response = await axiosI.get("/protected");
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        console.log("Error fetching history:", error);
      }
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
