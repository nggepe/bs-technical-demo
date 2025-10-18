import type { FC, SelectHTMLAttributes } from "react";

export const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({
  ...props
}) => {
  return (
    <select
      {...props}
      className="p-2 border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white hover:bg-white"
    />
  );
};
