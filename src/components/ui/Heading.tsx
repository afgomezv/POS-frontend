import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return <div className="text-2xl my-10">{children}</div>;
};

export default Heading;
