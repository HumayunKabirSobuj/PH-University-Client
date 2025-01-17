import { ReactNode } from "react";

export type TUSerPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUSerPath[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};
