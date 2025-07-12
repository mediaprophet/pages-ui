import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Component = ({
  url = "",
  title,
  subTitle,
  icon,
  iconWrapperClass,
  topMargin,
  children,
  ...props
}) => {
  return (
    <li className={topMargin}>
      <NavLink
        exact
        to={url}
        {...props}
        className="detailed"
      >
        <span className="title">{title}</span>
        <span className="details">{subTitle}</span>
      </NavLink>
      <span className={`${iconWrapperClass} icon-thumbnail`}>{icon}</span>
      {children}
    </li>
  );
};

Component.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  icon: PropTypes.node,
  iconWrapperClass: PropTypes.string,
};

export default Component;
