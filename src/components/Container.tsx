import type { FC, ReactNode } from "react";
import type { ComponentPropsWithChildren } from "../app/shared/types/common";

const Container: FC<ComponentPropsWithChildren> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="container mx-auto flex flex-col bg-[#e0e7ff75] min-h-screen px-5 py-5">
      {children}
    </div>
  );
};

export default Container;
