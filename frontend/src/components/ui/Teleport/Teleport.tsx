// React Imports
import React from "react";
import ReactDOM from "react-dom";

export function Teleport(props: TeleportProps) {
  const { container, children, ...restProps } = props;
  void restProps;

  const el = container();
  if (el) {
    return ReactDOM.createPortal(children, el);
  }

  return <></>;
}

export interface TeleportProps {
  container(): ReturnType<typeof document.getElementById>;
  children: React.ReactNode;
}
