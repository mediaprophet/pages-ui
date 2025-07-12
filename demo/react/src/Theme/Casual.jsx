import React, { useState } from "react";

import Dashboard from "../components/Theme-Casual/Dashboard";
import Social from "../components/Social";
import Cards from "../components/Card";
import Views from "../components/View";
import Chart from "../components/Chart";

import Builder from "../components/Theme-Casual/Builder";

import UIElementsColor from "../components/Theme-Casual/Color";
import UIElementstypography from "../components/UIElements/Typography";
import UIElementsIcons from "../components/UIElements/Icons";
import UIElementsButtons from "../components/UIElements/Buttons";
import UIElementsNotify from "../components/UIElements/Notification";
import UIElementsModal from "../components/UIElements/Modals";
import UIElementsProgressActivity from "../components/UIElements/ProgressAndActivity";
import UIElementsTabsAccordion from "../components/UIElements/TabsAndAccordion";
import UIElementsSliders from "../components/UIElements/Sliders";
import UIElementsTreeView from "../components/UIElements/TreeView";
import UIElementsNestables from "../components/UIElements/Nestables";

import FormElement from "../components/Forms/Elements";
import FormLayout from "../components/Forms/FormLayouts";
import FormWizard from "../components/Forms/Wizard";

import TableBasic from "../components/Tables/Basic";
import TableData from "../components/Tables/Data";

import MapGoogle from "../components/Maps/GoogleMap";
import MapVector from "../components/Maps/VectorMap";

import ExtraInvoice from "../components/Extra/Invoice";
import Extra400 from "../components/Extra/404Page";
import Extra500 from "../components/Extra/500Page";
import ExtraBlank from "../components/Extra/BlankPage";
import ExtraLogin from "../components/Extra/Login";
import ExtraRegister from "../components/Extra/register";
import ExtraLockScreen from "../components/Extra/LockScreen";
import ExtraGallery from "../components/Extra/Gallery";
import ExtraTimeLine from "../components/Extra/TimeLine";

import MenuLevelOne from "../components/MenuLevel/LevelOne";
import Submenu from "../components/MenuLevel/LevelTwo/Submenu";

import Header from "../components/Theme-Casual/Header";
import { useLocation, useNavigate, useParams, useMatch } from "react-router-dom";
// import { withRouter } from "react-router";
import Search from "../components/Theme-Casual/Search";

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
			/>
		);
	}

	return ComponentWithRouterProp;
}

function MatchPath({ path, Comp }) {
	let match = useMatch(path);
	return match ? <Comp {...match} /> : null;
}

const Casual = () => {
	const [mobileSidebarToggle, setMobileSidebarToggle] = useState(false);
	let path = location.pathname;

	console.log(path + "test")

	if (path.includes("/casual")) {
		require("../pages/scss/themes/casual/casual.scss");
		document.body.classList.add("casual");
	}
	if (path.includes("/cards")) {
		document.body.classList.add("cards-view-page");
	}
	else {
		document.body.classList.remove("cards-view-page");
	}

	return (
		<div className="h-100">
			<div
				className="horizontal-menu-backdrop"
				style={
					mobileSidebarToggle
						? { display: "block", zIndex: 10 }
						: { display: "none" }
				}
			></div>

			{path.includes("/casual") &&
				!path.includes("/boxed_layout") &&
				!path.includes("/login") &&
				!path.includes("/register") &&
				!path.includes("/lock_screen") &&
				!path.includes("/404") &&
				!path.includes("/500") && (
					<Header
						location={location}
						openMobileToggle={(value) => setMobileSidebarToggle(value)}
					/>
				)}

			<MatchPath exact="true" path="/casual" Comp={Dashboard} />
			<MatchPath path="/casual/dashboard" Comp={Dashboard} />
			<MatchPath path="/casual/social" Comp={Social} />

			{/* START Builder route */}
			<MatchPath path="/casual/builder" Comp={Builder} />
			{/* END builder route */}

			{/* START UIElements group routes */}
			<MatchPath path="/casual/color" Comp={UIElementsColor} />
			<MatchPath path="/casual/typography" Comp={UIElementstypography} />
			<MatchPath path="/casual/icons" Comp={UIElementsIcons} />
			<MatchPath path="/casual/buttons" Comp={UIElementsButtons} />
			<MatchPath path="/casual/notifications" Comp={UIElementsNotify} />
			<MatchPath path="/casual/modals" Comp={UIElementsModal} />
			<MatchPath path="/casual/progress" Comp={UIElementsProgressActivity} />
			<MatchPath
				path="/casual/tabs_accordian"
				Comp={UIElementsTabsAccordion}
			/>
			<MatchPath path="/casual/sliders" Comp={UIElementsSliders} />
			<MatchPath path="/casual/tree_view" Comp={UIElementsTreeView} />
			<MatchPath path="/casual/nestables" Comp={UIElementsNestables} />
			{/* END UIElements routes */}

			{/* START Forms group routes */}
			<MatchPath path="/casual/form_elements" Comp={FormElement} />
			<MatchPath path="/casual/form_layouts" Comp={FormLayout} />
			<MatchPath path="/casual/form_wizard" Comp={FormWizard} />
			{/* END Forms routes */}

			<MatchPath path="/casual/cards" Comp={Cards} />
			<MatchPath path="/casual/views" Comp={Views} />

			{/* START Tables group routes */}
			<MatchPath path="/casual/basic_tables" Comp={TableBasic} />
			<MatchPath path="/casual/data_tables" Comp={TableData} />
			{/* END Tables routes */}

			{/* START Maps group routes */}
			<MatchPath path="/casual/google_map" Comp={MapGoogle} />
			<MatchPath path="/casual/vector_map" Comp={MapVector} />
			{/* END Maps routes */}

			<MatchPath path="/casual/charts" Comp={Chart} />

			{/* START Extra group routes */}
			<MatchPath path="/casual/extra/invoice" Comp={ExtraInvoice} />
			<MatchPath path="/casual/extra/404" Comp={Extra400} />
			<MatchPath path="/casual/extra/500" Comp={Extra500} />
			<MatchPath path="/casual/extra/blank_template" Comp={ExtraBlank} />
			<MatchPath path="/casual/extra/login" Comp={ExtraLogin} />
			<MatchPath path="/casual/extra/register" Comp={ExtraRegister} />
			<MatchPath path="/casual/extra/lock_screen" Comp={ExtraLockScreen} />
			<MatchPath path="/casual/extra/gallery" Comp={ExtraGallery} />
			<MatchPath path="/casual/extra/timeline" Comp={ExtraTimeLine} />
			{/* END Extra routes */}

			{/* START Menu Levels group routes */}
			<MatchPath path="/casual/levelOne" Comp={MenuLevelOne} />
			<MatchPath path="/casual/submenu" Comp={Submenu} />
			{/* END Menu Levels routes */}
			{/* <Quickview/>*/}
			{path.includes("/casual") && <Search />}
		</div>
	);
};

export default withRouter(Casual);
