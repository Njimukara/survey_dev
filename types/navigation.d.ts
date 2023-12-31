import { ReactComponentElement } from "react";

export interface IRoute {
  id?: number;
  name: string;
  layout: string;
  component: ReactComponentElement;
  icon: ReactComponentElement | string;
  secondary?: boolean;
  path: string;
  subRoutes?: array<IRoute>;
}
