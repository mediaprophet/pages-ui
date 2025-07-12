import React, { useState, useEffect } from "react";

import Social from "../components/Social";
import Email from "../components/Email/Component";
import ComposeEmail from "../components/ComposeEmail";
import Cards from "../components/Card";
import Views from "../components/View";
import Chart from "../components/Chart";

import Builder from "../components/Builder";

import LayoutsBox from "../components/Layouts/Box";
import LayoutsDefault from "../components/Layouts/Default";
import LayoutsRtl from "../components/Layouts/Rtl";
import LayoutsSecondary from "../components/Layouts/Secondary";

import UIElementsColor from "../components/Theme-Condensed/Color";
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

import Header from "../components/Theme-Corporate/Header";
import Sidebar from "../components/Theme-Corporate/SidebarCorporate";
import Dashboard from "../components/Theme-Corporate/Dashboard";
import Search from "../components/Theme-Corporate/Search";
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


const Corporate = ({ }) => {
	if (window.location.pathname.includes("corporate")) {
		require("../pages/scss/themes/corporate/corporate.scss");
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

	if (path.includes("/corporate")) {
		document.body.classList.remove("pace-done");
		document.body.classList.add("mac");
		document.body.classList.add("desktop");
		document.body.classList.add("js-focus-visible");
		document.body.classList.add("pace-done");
		document.body.classList.add("menu-unpinned");
		document.body.classList.add("menu-pin");
		document.body.classList.add("corporate");
		document.body.classList.add("menu-behind");
		if (path.includes("boxed_layout")) {
			//fixed-header menu-pin box-layout  mac desktop js-focus-visible pace-done
			document.body.classList.remove("menu-unpinned");
			document.body.classList.add("fixed-header");
			document.body.classList.add("box-layout");
		} else {
			document.body.classList.remove("box-layout");
			document.body.classList.add("fixed-header");
		}
		const { innerWidth: width, innerHeight: height } = window;
		width < 1200 && width > 991
			? document.body.classList.remove("menu-pin")
			: document.body.classList.add("menu-pin");
	}
	return (
		<div className="h-100">
			{path.includes("/corporate") &&
				!path.includes("/boxed_layout") &&
				!path.includes("/login") &&
				!path.includes("/register") &&
				!path.includes("/lock_screen") &&
				!path.includes("/404") &&
				!path.includes("/500") && (
					<div className="">
						<div className="">
							<Sidebar location={location} />
						</div>
					</div>
				)}

			<div className="full-height">
				{path.includes("/corporate") &&
					!path.includes("/boxed_layout") &&
					!path.includes("/login") &&
					!path.includes("/register") &&
					!path.includes("/lock_screen") &&
					!path.includes("/404") &&
					!path.includes("/500") && (
						<Header
							location={location}
							inboxHeader={toggleInboxHeader}
							setInboxHeader={(value) => setToggleInboxHeader(value)}
						/>
					)}

				{path.includes("/corporate") && (
					<>
						<MatchPath exact="true" path="/corporate/" Comp={Dashboard} />
						<MatchPath path="/corporate/dashboard" Comp={Dashboard} />
					</>
				)}

				<MatchPath path="/corporate/social" Comp={Social} />
				<MatchPath
					path="/corporate/email"
					Comp={() => (
						<Email inboxHeader={toggleInboxHeader} location={location} />
					)}
				/>
				<MatchPath
					path="/corporate/compose_email"
					Comp={() => (
						<ComposeEmail inboxHeader={toggleInboxHeader} location={location} />
					)}
				/>

				{/* START Builder route */}
				<MatchPath path="/corporate/builder" Comp={Builder} />
				{/* END builder route */}

				{/* START Layouts group routes */}
				<MatchPath path="/corporate/default_layout" Comp={LayoutsDefault} />
				<MatchPath
					path="/corporate/secondary_layout"
					Comp={LayoutsSecondary}
				/>
				<MatchPath path="/corporate/boxed_layout" Comp={LayoutsBox} />
				<MatchPath path="/corporate/rtl_layout" Comp={LayoutsRtl} />
				{/* END Layouts routes */}

				{/* START UIElements group routes */}
				<MatchPath path="/corporate/color" Comp={UIElementsColor} />
				<MatchPath path="/corporate/typography" Comp={UIElementstypography} />
				<MatchPath path="/corporate/icons" Comp={UIElementsIcons} />
				<MatchPath path="/corporate/buttons" Comp={UIElementsButtons} />
				<MatchPath path="/corporate/notifications" Comp={UIElementsNotify} />
				<MatchPath path="/corporate/modals" Comp={UIElementsModal} />
				<MatchPath
					path="/corporate/progress"
					Comp={UIElementsProgressActivity}
				/>
				<MatchPath
					path="/corporate/tabs_accordian"
					Comp={UIElementsTabsAccordion}
				/>
				<MatchPath path="/corporate/sliders" Comp={UIElementsSliders} />
				<MatchPath path="/corporate/tree_view" Comp={UIElementsTreeView} />
				<MatchPath path="/corporate/nestables" Comp={UIElementsNestables} />
				{/* END UIElements routes */}

				{/* START Forms group routes */}
				<MatchPath path="/corporate/form_elements" Comp={FormElement} />
				<MatchPath path="/corporate/form_layouts" Comp={FormLayout} />
				<MatchPath path="/corporate/form_wizard" Comp={FormWizard} />
				{/* END Forms routes */}

				<MatchPath path="/corporate/cards" Comp={Cards} />
				<MatchPath path="/corporate/views" Comp={Views} />

				{/* START Tables group routes */}
				<MatchPath path="/corporate/basic_tables" Comp={TableBasic} />
				<MatchPath path="/corporate/data_tables" Comp={TableData} />
				{/* END Tables routes */}

				{/* START Maps group routes */}
				<MatchPath path="/corporate/google_map" Comp={MapGoogle} />
				<MatchPath path="/corporate/vector_map" Comp={MapVector} />
				{/* END Maps routes */}

				<MatchPath path="/corporate/charts" Comp={Chart} />

				{/* START Extra group routes */}
				<MatchPath path="/corporate/extra/invoice" Comp={ExtraInvoice} />
				<MatchPath path="/corporate/extra/404" Comp={Extra400} />
				<MatchPath path="/corporate/extra/500" Comp={Extra500} />
				<MatchPath path="/corporate/extra/blank_template" Comp={ExtraBlank} />
				<MatchPath path="/corporate/extra/login" Comp={ExtraLogin} />
				<MatchPath path="/corporate/extra/register" Comp={ExtraRegister} />
				<MatchPath
					path="/corporate/extra/lock_screen"
					Comp={ExtraLockScreen}
				/>
				<MatchPath path="/corporate/extra/gallery" Comp={ExtraGallery} />
				<MatchPath path="/corporate/extra/timeline" Comp={ExtraTimeLine} />
				{/* END Extra routes */}

				{/* START Menu Levels group routes */}
				<MatchPath path="/corporate/levelOne" Comp={MenuLevelOne} />
				<MatchPath path="/corporate/submenu" Comp={Submenu} />
				{/* END Menu Levels routes */}
				{path.includes("/corporate") && <Search />}
			</div>
		</div>
	);
};

export default withRouter(Corporate);
