import React from "react";

import DefaultLayout from "../../shared/Layouts/Default";
import ExtraLoginWrapperComponent from "./Content";

const Component = ({ }) => {
	let path = location.pathname;
	return <ExtraLoginWrapperComponent path={path} />;
};

export default Component;
