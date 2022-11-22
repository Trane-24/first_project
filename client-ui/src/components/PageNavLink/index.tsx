import React from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  to: string;
  text: string;
}

const PageNavLink: React.FC<Props> = ({to, text}) => {
  const { pathname } = useLocation();

  const isActive = pathname.slice(1) === to;

  return (
    <NavLink
      to={to}
      style={{ color: isActive ? '#48A8D0' : 'black'}}
    >
      {text}
    </NavLink>
  )
};

export default PageNavLink;
