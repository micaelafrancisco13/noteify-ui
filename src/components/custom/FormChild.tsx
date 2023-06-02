import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function FormChild(props: Props) {
  console.log("formChild", props);
  return <>{props.children}</>;
}

export default FormChild;
