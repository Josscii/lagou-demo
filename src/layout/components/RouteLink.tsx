import * as React from "react";
import { LinkProps, useResolvedPath, Link, useMatch } from "react-router-dom";

export default function RouteLink({ children, to, ...props }: LinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link style={{ color: match ? "" : "inherit" }} to={to} {...props}>
      {children}
    </Link>
  );
}
