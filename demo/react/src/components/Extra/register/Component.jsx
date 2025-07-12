import React from "react";

import DefaultLayout from "../../shared/Layouts/Default";
import ExtraRegisterWrapperComponent from "./Content";

const Component = ({ }) => {
	let path = location.pathname;
	return <ExtraRegisterWrapperComponent path={path} />;
};

export default Component;
