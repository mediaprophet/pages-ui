import React, { useState } from "react";

import Dashboard from "../components/Theme-Executive/Dashboard";
import Social from "../components/Social";
import Cards from "../components/Card";
import Views from "../components/View";
import Chart from "../components/Chart";

import Builder from "../components/Theme-Executive/Builder";

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

import Header from "../components/Theme-Executive/Header";
import { useLocation, useNavigate, useParams, useMatch } from "react-router-dom";
import Search from "../components/Theme-Executive/Search";

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


const Executive = ({ }) => {
	const [mobileSidebarToggle, setMobileSidebarToggle] = useState(false);
	let path = location.pathname;

	if (path.includes("/executive")) {
		document.body.classList.add("executive");
		require("../pages/scss/themes/condensed/condensed.scss");
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
			{path.includes("/executive") &&
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
			<MatchPath exact="true" path="/executive" Comp={Dashboard} />
			<MatchPath path="/executive/dashboard" Comp={Dashboard} />
			<MatchPath path="/executive/social" Comp={Social} />

			{/* START Builder MatchPath */}
			<MatchPath path="/executive/builder" Comp={Builder} />
			{/* END builder MatchPath */}

			{/* START UIElements group MatchPaths */}
			<MatchPath path="/executive/color" Comp={UIElementsColor} />
			<MatchPath path="/executive/typography" Comp={UIElementstypography} />
			<MatchPath path="/executive/icons" Comp={UIElementsIcons} />
			<MatchPath path="/executive/buttons" Comp={UIElementsButtons} />
			<MatchPath path="/executive/notifications" Comp={UIElementsNotify} />
			<MatchPath path="/executive/modals" Comp={UIElementsModal} />
			<MatchPath
				path="/executive/progress"
				Comp={UIElementsProgressActivity}
			/>
			<MatchPath
				path="/executive/tabs_accordian"
				Comp={UIElementsTabsAccordion}
			/>
			<MatchPath path="/executive/sliders" Comp={UIElementsSliders} />
			<MatchPath path="/executive/tree_view" Comp={UIElementsTreeView} />
			<MatchPath path="/executive/nestables" Comp={UIElementsNestables} />
			{/* END UIElements MatchPaths */}

			{/* START Forms group MatchPaths */}
			<MatchPath path="/executive/form_elements" Comp={FormElement} />
			<MatchPath path="/executive/form_layouts" Comp={FormLayout} />
			<MatchPath path="/executive/form_wizard" Comp={FormWizard} />
			{/* END Forms MatchPaths */}

			<MatchPath path="/executive/cards" Comp={Cards} />
			<MatchPath path="/executive/views" Comp={Views} />

			{/* START Tables group MatchPaths */}
			<MatchPath path="/executive/basic_tables" Comp={TableBasic} />
			<MatchPath path="/executive/data_tables" Comp={TableData} />
			{/* END Tables MatchPaths */}

			{/* START Maps group MatchPaths */}
			<MatchPath path="/executive/google_map" Comp={MapGoogle} />
			<MatchPath path="/executive/vector_map" Comp={MapVector} />
			{/* END Maps MatchPaths */}

			<MatchPath path="/executive/charts" Comp={Chart} />

			{/* START Extra group MatchPaths */}
			<MatchPath path="/executive/extra/invoice" Comp={ExtraInvoice} />
			<MatchPath path="/executive/extra/404" Comp={Extra400} />
			<MatchPath path="/executive/extra/500" Comp={Extra500} />
			<MatchPath path="/executive/extra/blank_template" Comp={ExtraBlank} />
			<MatchPath path="/executive/extra/login" Comp={ExtraLogin} />
			<MatchPath path="/executive/extra/register" Comp={ExtraRegister} />
			<MatchPath path="/executive/extra/lock_screen" Comp={ExtraLockScreen} />
			<MatchPath path="/executive/extra/gallery" Comp={ExtraGallery} />
			<MatchPath path="/executive/extra/timeline" Comp={ExtraTimeLine} />
			{/* END Extra MatchPaths */}

			{/* START Menu Levels group MatchPaths */}
			<MatchPath path="/executive/levelOne" Comp={MenuLevelOne} />
			<MatchPath path="/executive/submenu" Comp={Submenu} />
			{/* END Menu Levels MatchPaths */}
			{path.includes("/executive") && <Search />}
		</div>
	);
};

export default withRouter(Executive);
