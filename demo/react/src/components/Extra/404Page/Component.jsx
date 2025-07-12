import React from "react";

import Extra404PageWrapperComponent from "./Content";

const Component = ({ }) => {
  let path = location.pathname;
  return <Extra404PageWrapperComponent path={path} />;
};

export default Component;
