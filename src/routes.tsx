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
import react, { useEffect, useState } from "react";

// Auth Imports
import { IRoute } from "../types/navigation";
import { UserTypes } from "utils/userTypes";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const useRoutes = () => {
  const [surveys, setSurveys] = useState([]);
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const userProfile = sessionUser?.data?.user_profile;
  const userType = userProfile?.user_type;

  const subscriptionsData = useSelector(
    (state: RootState) => state.reduxStore.subscrptions
  );
  // console.log(subscriptionsData);
  // if (subscriptionsData) {
  //   const { data, currentSubscription } = subscriptionsData;
  // }

  useEffect(() => {
    if (subscriptionsData) {
      const { currentSubscription } = subscriptionsData;
      // const { data, currentSubscription } = subscriptionsData;

      if (currentSubscription != null) {
        const { status } = currentSubscription;

        if (
          status.toLowerCase() === "active" ||
          status.toLowerCase() === "trialing"
        ) {
          const assignedSurveys = currentSubscription.assigned_surveys || [];
          setSurveys(assignedSurveys);
        } else {
          setSurveys([]);
        }
      }
    }
  }, [subscriptionsData]);

  const productSubRoutes = [
    {
      id: 1,
      name: "Side Scan Sonar",
      layout: "/admin",
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: "/side-scan-sonar",
    },
    {
      id: 2,
      name: "Dynamic Lidar",
      layout: "/admin",
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: "/dynamic-lydar",
    },
    {
      id: 3,
      name: "Multibeam EchoSounder",
      layout: "/admin",
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: "/multibeam-echosounder",
    },
    {
      id: 4,
      name: "2D Acoustic Sonar",
      layout: "/admin",
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: "/acoustic-sonar",
    },
  ];

  const filteredProductSubRoutes = productSubRoutes.filter((subRoute) =>
    surveys.some((survey) => {
      // console.log(
      //   `Checking subRoute: ${subRoute.name} with survey: ${survey.name}`
      // );
      return subRoute.name
        .trim()
        .toLowerCase()
        .includes(survey.name.trim().toLowerCase());
    })
  );

  // console.log(filteredProductSubRoutes);

  const routes: IRoute[] = [
    {
      name: "Dashboard",
      layout: "/admin",
      path: "/default",
      icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
      component: MainDashboard,
    },
    ...(userType === UserTypes.GUEST_USER
      ? []
      : [
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
        ]),
    {
      name: "My Products",
      layout: "/admin",
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: "/generate",
      component: MainDashboard,
      subRoutes: filteredProductSubRoutes,
      //  [
      //   {
      //     id: 1,
      //     name: "Side Scan Sonar",
      //     layout: "/admin",
      //     icon: (
      //       <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
      //     ),
      //     path: "/side-scan-sonar",
      //     // component: DataTables,
      //   },
      //   {
      //     id: 2,
      //     name: "Dynamic Lydar",
      //     layout: "/admin",
      //     icon: (
      //       <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
      //     ),
      //     path: "/dynamic-lydar",
      //     // component: DataTables,
      //   },
      //   {
      //     id: 3,
      //     name: "Multibeam EchoSounder",
      //     layout: "/admin",
      //     icon: (
      //       <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
      //     ),
      //     path: "/multibeam-echosounder",
      //     // component: DataTables,
      //   },
      //   {
      //     id: 4,
      //     name: "2D Acoustic Sonar",
      //     layout: "/admin",
      //     icon: (
      //       <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
      //     ),
      //     path: "/acoustic-sonar",
      //     // component: DataTables,
      //   },
      // ],
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

  // UserTypes.GUEST_USER remove transactions from routes

  return {
    routes,
  };
};

export default useRoutes;
