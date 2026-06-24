import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ className = "", children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`.trim()}>
      {children}
    </div>
  );
}
