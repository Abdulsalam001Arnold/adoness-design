import type { HTMLAttributes, ReactElement } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "header" | "footer" | "main";
}

export function Container({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: ContainerProps): ReactElement {
  return (
    <Tag
      className={`mx-auto w-full max-w-screen-2xl px-6 sm:px-10 ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
