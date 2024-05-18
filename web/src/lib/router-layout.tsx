import React from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

// converts a component that renders its children to a component that renders a router outlet.
export const RouterLayout = ({ children }: Props) => {};
export default RouterLayout;
