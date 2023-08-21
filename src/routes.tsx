import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdOutlineShoppingCart,
  MdHistory,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "pages/admin/default";
import Profile from "pages/admin/profile";
import SurveyHistory from "pages/admin/survey-history";
// import DataTables from "pages/admin/data-tables";

// Auth Imports
import { IRoute } from "../types/navigation";

const routes: IRoute[] = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Buy or renew License",
    layout: "/admin",
    path: "/transactions",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: MainDashboard,
  },
  {
    name: "My Products",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/generate",
    component: MainDashboard,
    subRoutes: [
      {
        id: 1,
        name: "Side Scan Sonar",
        layout: "/admin",
        icon: (
          <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/side-scan-sonar",
        // component: DataTables,
      },
      {
        id: 2,
        name: "Dynamic Lydar",
        layout: "/admin",
        icon: (
          <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/dynamic-lydar",
        // component: DataTables,
      },
      {
        id: 3,
        name: "Multibeam EchoSounder",
        layout: "/admin",
        icon: (
          <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/multibeam-echosounder",
        // component: DataTables,
      },
      {
        id: 4,
        name: "2D Acoustic Sonar",
        layout: "/admin",
        icon: (
          <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/acoustic-sonar",
        // component: DataTables,
      },
    ],
  },
  {
    name: "Survey History",
    layout: "/admin",
    path: "/survey-history",
    icon: <Icon as={MdHistory} width="20px" height="20px" color="inherit" />,
    component: SurveyHistory,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
];

export default routes;
