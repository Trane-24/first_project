import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  to: string;
  text: string;
}

const PageNavLink: React.FC<Props> = ({to, text}) => {
  const { pathname } = useLocation();
  const classes = useStyles();

  const isActive = pathname.slice(1) === to;

  return (
    <NavLink
      to={to}
      className={classNames(classes.link, { [classes.linkActive]: isActive })}
    >
      {text}
    </NavLink>
  )
};

export default PageNavLink;

const useStyles = makeStyles({
  link: {
    '&:hover': {
      color: '#48A8D0',
    }
  },
  linkActive: {
    color: '#48A8D0',
  },
});
