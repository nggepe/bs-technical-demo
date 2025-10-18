import type { FC, InputHTMLAttributes } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      {...props}
      className="p-2 border border-gray-300 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white hover:bg-white"
    />
  );
};
