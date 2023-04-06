import { IRoute } from "types/navigation";

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== "undefined";

export const findCurrentRoute = (routes: IRoute[]): IRoute => {
  const foundRoute: IRoute = routes.find(
    (route) =>
      isWindowAvailable() &&
      window.location.href.indexOf(route.layout + route.path) !== -1 &&
      route
  );

  return foundRoute;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getActiveRoute = (routes: IRoute[]): string => {
  const route = findCurrentRoute(routes);
  var brandName = ''
  if (isWindowAvailable()) {
    brandName = (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1));
    brandName = capitalizeFirstLetter(brandName)
  }
  return route?.name || brandName;
};

export const getActiveNavbar = (routes: IRoute[]): boolean => {
  const route = findCurrentRoute(routes);
  return route?.secondary;
};

export const getActiveNavbarText = (routes: IRoute[]): string | boolean => {
  return getActiveRoute(routes) || false;
};
