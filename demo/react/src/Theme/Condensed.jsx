import React, { useState, useEffect } from "react";

import Dashboard from "../components/Theme-Condensed/Dashboard";
import Social from "../components/Social";
import Email from "../components/Email";
import ComposeEmail from "../components/ComposeEmail";
import Cards from "../components/Card";
import Views from "../components/View";
import Chart from "../components/Chart";

import Builder from "../components/Builder";

import LayoutsBox from "../components/Layouts/Box";
import LayoutsDefault from "../components/Layouts/Default";
import LayoutsRtl from "../components/Layouts/Rtl";
import LayoutsSecondary from "../components/Layouts/Secondary";

import UIElementsColor from "../components/UIElements/Color";
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

import Header from "../components/Theme-Condensed/Header";
import Sidebar from "../components/Theme-Condensed/Sidebar";
import Search from "../components/Theme-Condensed/Search";
import { useLocation, useNavigate, useParams, useMatch } from "react-router-dom";
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

const Condensed = ({ }) => {
	if (
		window.location.pathname.includes("condensed") ||
		window.location.pathname === "/"
	) {
		require("../pages/scss/themes/condensed/condensed.scss");
	}
	let path = location.pathname;
	const [toggleInboxHeader, setToggleInboxHeader] = useState(false);

	useEffect(() => {
		window.addEventListener("resize", (e) => {
			setToggleInboxHeader(false);
		});

		return () => window.removeEventListener("resize", null);
	});

	if (path.includes("/cards")) {
		document.body.classList.add("cards-view-page");
	}
	else {
		document.body.classList.remove("cards-view-page");
	}

	return (
		<div className="h-100">
			{(path.includes("/condensed") || path === "/") &&
				!path.includes("boxed_layout") &&
				!path.includes("/login") &&
				!path.includes("/register") &&
				!path.includes("/lock_screen") &&
				!path.includes("/404") &&
				!path.includes("/500") && (
					<div>
						<Header
							location={location}
							inboxHeader={toggleInboxHeader}
							setInboxHeader={(value) => setToggleInboxHeader(value)}
						/>
						<Sidebar location={location} />
					</div>
				)}

			<MatchPath exact="true" path="/" Comp={Dashboard} />
			<MatchPath exact="true" path="/condensed" Comp={Dashboard} />
			<MatchPath path="/condensed/dashboard" Comp={Dashboard} />
			<MatchPath path="/condensed/social" Comp={Social} />
			<MatchPath
				path="/condensed/email"
				Comp={() => (
					<Email inboxHeader={toggleInboxHeader} location={location} />
				)}
			/>
			<MatchPath
				path="/condensed/compose_email"
				Comp={() => (
					<ComposeEmail inboxHeader={toggleInboxHeader} location={location} />
				)}
			/>

			{/* START Builder route */}
			<MatchPath path="/condensed/builder" Comp={Builder} />
			{/* END builder route */}

			{/* START Layouts group routes */}
			<MatchPath path="/condensed/default_layout" Comp={LayoutsDefault} />
			<MatchPath path="/condensed/secondary_layout" Comp={LayoutsSecondary} />
			<MatchPath path="/condensed/boxed_layout" Comp={LayoutsBox} />
			<MatchPath path="/condensed/rtl_layout" Comp={LayoutsRtl} />
			{/* END Layouts routes */}

			{/* START UIElements group routes */}
			<MatchPath path="/condensed/color" Comp={UIElementsColor} />
			<MatchPath path="/condensed/typography" Comp={UIElementstypography} />
			<MatchPath path="/condensed/icons" Comp={UIElementsIcons} />
			<MatchPath path="/condensed/buttons" Comp={UIElementsButtons} />
			<MatchPath path="/condensed/notifications" Comp={UIElementsNotify} />
			<MatchPath path="/condensed/modals" Comp={UIElementsModal} />
			<MatchPath
				path="/condensed/progress"
				Comp={UIElementsProgressActivity}
			/>
			<MatchPath
				path="/condensed/tabs_accordian"
				Comp={UIElementsTabsAccordion}
			/>
			<MatchPath path="/condensed/sliders" Comp={UIElementsSliders} />
			<MatchPath path="/condensed/tree_view" Comp={UIElementsTreeView} />
			<MatchPath path="/condensed/nestables" Comp={UIElementsNestables} />
			{/* END UIElements routes */}

			{/* START Forms group routes */}
			<MatchPath path="/condensed/form_elements" Comp={FormElement} />
			<MatchPath path="/condensed/form_layouts" Comp={FormLayout} />
			<MatchPath path="/condensed/form_wizard" Comp={FormWizard} />
			{/* END Forms routes */}

			<MatchPath path="/condensed/cards" Comp={Cards} />
			<MatchPath path="/condensed/views" Comp={Views} />

			{/* START Tables group routes */}
			<MatchPath path="/condensed/basic_tables" Comp={TableBasic} />
			<MatchPath path="/condensed/data_tables" Comp={TableData} />
			{/* END Tables routes */}

			{/* START Maps group routes */}
			<MatchPath path="/condensed/google_map" Comp={MapGoogle} />
			<MatchPath path="/condensed/vector_map" Comp={MapVector} />
			{/* END Maps routes */}

			<MatchPath path="/condensed/charts" Comp={Chart} />

			{/* START Extra group routes */}
			<MatchPath path="/condensed/extra/invoice" Comp={ExtraInvoice} />
			<MatchPath path="/condensed/extra/404" Comp={Extra400} />
			<MatchPath path="/condensed/extra/500" Comp={Extra500} />
			<MatchPath path="/condensed/extra/blank_template" Comp={ExtraBlank} />
			<MatchPath path="/condensed/extra/login" Comp={ExtraLogin} />
			<MatchPath path="/condensed/extra/register" Comp={ExtraRegister} />
			<MatchPath path="/condensed/extra/lock_screen" Comp={ExtraLockScreen} />
			<MatchPath path="/condensed/extra/gallery" Comp={ExtraGallery} />
			<MatchPath path="/condensed/extra/timeline" Comp={ExtraTimeLine} />
			{/* END Extra routes */}

			{/* START Menu Levels group routes */}
			<MatchPath path="/condensed/levelOne" Comp={MenuLevelOne} />
			<MatchPath path="/condensed/submenu" Comp={Submenu} />
			{/* END Menu Levels routes */}
			
			{(path.includes("/condensed") || path === "/") && <Search />}
		</div>
	);
};

export default withRouter(Condensed);
