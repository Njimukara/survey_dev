import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdAdd,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "pages/admin/default";
import GenerateSurvey from "pages/admin/generate-survey";
import Profile from "pages/admin/profile";
import DataTables from "pages/admin/data-tables";

// Auth Imports
import SignInCentered from "pages/auth/signin";
import { IRoute } from "types/navigation";

const routes: IRoute[] = [
  {
    name: "Generate Survey",
    layout: "/admin",
    path: "/generate",
    icon: <Icon as={MdAdd} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Home",
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
    path: "/data-tables",
    component: DataTables,
    subRoutes: [
      {
        id: 1,
        name: "Side Scan Sonar",
        layout: "/admin",
        icon: (
          <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/side-scan-sonar",
        component: DataTables,
      },
      {
        id: 2,
        name: "Dynamic Lydar",
        layout: "/admin",
        icon: (
          <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/dynamic-lydar",
        component: DataTables,
      },
      {
        id: 3,
        name: "Multibeam EchoSounder",
        layout: "/admin",
        icon: (
          <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/multibeam-echosounder",
        component: DataTables,
      },
      {
        id: 4,
        name: "2D Acoustic Sonar",
        layout: "/admin",
        icon: (
          <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/acoustic-sonar",
        component: DataTables,
      },
    ],
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
