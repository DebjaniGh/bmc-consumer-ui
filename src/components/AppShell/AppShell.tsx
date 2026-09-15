import {
  AppLayout,
  IconButton,
  type SidebarMenuItem,
} from "@debjani6ghosh/bmc-ui-kit";
import searchIcon from "../../assets/search.svg";
import userIcon from "../../assets/user.svg";
import helpIcon from "../../assets/help-icon.svg";
import panelOpen from "../../assets/panel-right-open.svg";
import panelClose from "../../assets/panel-right-close.svg";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const sidebarMenu: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    icon: <img src={searchIcon} alt="sidebar menu icon" />,
    path: "/dashboard",
  },
  {
    label: "Example Component 1",
    icon: <img src={searchIcon} alt="sidebar menu icon" />,
    path: "/Example1",
  },
  {
    label: "Example Component 2",
    icon: <img src={searchIcon} alt="sidebar menu icon" />,
    path: "/Example2",
  },
  {
    label: "Example Component 3",
    icon: <img src={searchIcon} alt="sidebar menu icon" />,
    path: "/Example3",
  },
  {
    label: "Example Component 4",
    icon: <img src={searchIcon} alt="sidebar menu icon" />,
    path: "/Example4",
  },
];

export function AppShell() {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setisSidebarOpen((prev) => !prev);
  };

  return (
    <AppLayout
      header={{
        productName: "BMC UI Version 10 | License Type",
        actions: (
          <>
            <IconButton
              icon={<img src={userIcon} alt="" />}
              ariaLabel="user"
              onClick={() => console.log("User Icon clicked")}
            />
            <IconButton
              icon={<img src={helpIcon} alt="" />}
              ariaLabel="help"
              onClick={() => console.log("Help Icon clicked")}
            />
          </>
        ),
      }}
      sidebar={{
        isOpen: isSidebarOpen,
        openIcon: <img src={panelOpen} alt="sidebar open" />,
        closeIcon: <img src={panelClose} alt="sidebar closed" />,
        toggleSidebar: toggleSidebar,
        menu: sidebarMenu,
      }}
    >
      <Outlet />
    </AppLayout>
  );
}
