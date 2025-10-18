import type { FC, ReactNode } from "react";

export interface ListViewWrapperProps {
  children: ReactNode;
}

export const ListViewWrapper: FC<ListViewWrapperProps> = ({ children }) => {
  return <div>{children}</div>;
};
