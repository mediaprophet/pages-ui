import React, { useState, useEffect } from "react";

import Dashboard from "../components/Theme-Simple/Dashboard";
import Social from "../components/Social";
import Email from "../components/Email";
import ComposeEmail from "../components/ComposeEmail";
import Cards from "../components/Card";
import Views from "../components/View";
import Chart from "../components/Chart";

import Calendar from "../components/Calendar/Basic";
import CalendarLang from "../components/Calendar/Languages";
import CalendarMonth from "../components/Calendar/Month";
import CalendarLazy from "../components/Calendar/Lazyload";
import CalendarDocs from "../components/Calendar/Documentation";

import Builder from "../components/Builder";

import LayoutsBox from "../components/Layouts/Box";
import LayoutsDefault from "../components/Layouts/Default";
import LayoutsRtl from "../components/Layouts/Rtl";
import LayoutsSecondary from "../components/Layouts/Secondary";

import UIElementsColor from "../components/Theme-Simple/Color";
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

import Search from "../components/Theme-Simple/Search";
import Header from "../components/Theme-Simple/Header";
import Sidebar from "../components/Theme-Simple/SidebarSimple";
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


const Simple = ({ }) => {
	let path = location.pathname;
	const [toggleInboxHeader, setToggleInboxHeader] = useState(false);

	useEffect(() => {
		window.addEventListener("resize", (e) => {
			setToggleInboxHeader(false);
		});
		return () => window.removeEventListener("resize", null);
	});

	if (path.includes("/simple")) {
		require("../pages/scss/themes/simpleTheme/simple.scss");
		document.body.classList.remove("pace-done");
		document.body.classList.add("mac");
		document.body.classList.add("desktop");
		document.body.classList.add("js-focus-visible");
		document.body.classList.add("menu-unpinned");
		document.body.classList.add("simple");

		const { innerWidth: width, innerHeight: height } = window;
		width < 1200 && width > 991
			? document.body.classList.remove("menu-pin")
			: document.body.classList.add("menu-pin");
	}

	if (path.includes("/cards")) {
		document.body.classList.add("cards-view-page");
	}
	else {
		document.body.classList.remove("cards-view-page");
	}

	return (
		<div className="h-100">
			{path.includes("/simple") &&
				!path.includes("/boxed_layout") &&
				!path.includes("/login") &&
				!path.includes("/register") &&
				!path.includes("/lock_screen") &&
				!path.includes("/404") &&
				!path.includes("/500") && <Sidebar location={location} />}

			{path.includes("/simple") &&
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
			<MatchPath exact="true" path="/simple" Comp={Dashboard} />
			<MatchPath path="/simple/dashboard" Comp={Dashboard} />
			<MatchPath path="/simple/social" Comp={Social} />
			<MatchPath
				path="/simple/email"
				Comp={() => (
					<Email inboxHeader={toggleInboxHeader} location={location} />
				)}
			/>
			<MatchPath
				path="/simple/compose_email"
				Comp={() => (
					<ComposeEmail inboxHeader={toggleInboxHeader} location={location} />
				)}
			/>
			{/* START Calendar group routes */}
			<MatchPath path="/simple/calendar/basic" Comp={Calendar} />
			<MatchPath path="/simple/calendar/languages" Comp={CalendarLang} />
			<MatchPath path="/simple/calendar/Month" Comp={CalendarMonth} />
			<MatchPath path="/simple/calendar/lazyload" Comp={CalendarLazy} />
			<MatchPath path="/simple/calendar_docs" Comp={CalendarDocs} />
			{/* END Calendar routes */}

			{/* START Builder route */}
			<MatchPath path="/simple/builder" Comp={Builder} />
			{/* END builder route */}

			{/* START Layouts group routes */}
			<MatchPath path="/simple/default_layout" Comp={LayoutsDefault} />
			<MatchPath path="/simple/secondary_layout" Comp={LayoutsSecondary} />
			<MatchPath path="/simple/boxed_layout" Comp={LayoutsBox} />
			<MatchPath path="/simple/rtl_layout" Comp={LayoutsRtl} />
			{/* END Layouts routes */}

			{/* START UIElements group routes */}
			<MatchPath path="/simple/color" Comp={UIElementsColor} />
			<MatchPath path="/simple/typography" Comp={UIElementstypography} />
			<MatchPath path="/simple/icons" Comp={UIElementsIcons} />
			<MatchPath path="/simple/buttons" Comp={UIElementsButtons} />
			<MatchPath path="/simple/notifications" Comp={UIElementsNotify} />
			<MatchPath path="/simple/modals" Comp={UIElementsModal} />
			<MatchPath path="/simple/progress" Comp={UIElementsProgressActivity} />
			<MatchPath
				path="/simple/tabs_accordian"
				Comp={UIElementsTabsAccordion}
			/>
			<MatchPath path="/simple/sliders" Comp={UIElementsSliders} />
			<MatchPath path="/simple/tree_view" Comp={UIElementsTreeView} />
			<MatchPath path="/simple/nestables" Comp={UIElementsNestables} />
			{/* END UIElements routes */}

			{/* START Forms group routes */}
			<MatchPath path="/simple/form_elements" Comp={FormElement} />
			<MatchPath path="/simple/form_layouts" Comp={FormLayout} />
			<MatchPath path="/simple/form_wizard" Comp={FormWizard} />
			{/* END Forms routes */}

			<MatchPath path="/simple/cards" Comp={Cards} />
			<MatchPath path="/simple/views" Comp={Views} />

			{/* START Tables group routes */}
			<MatchPath path="/simple/basic_tables" Comp={TableBasic} />
			<MatchPath path="/simple/data_tables" Comp={TableData} />
			{/* END Tables routes */}

			{/* START Maps group routes */}
			<MatchPath path="/simple/google_map" Comp={MapGoogle} />
			<MatchPath path="/simple/vector_map" Comp={MapVector} />
			{/* END Maps routes */}

			<MatchPath path="/simple/charts" Comp={Chart} />

			{/* START Extra group routes */}
			<MatchPath path="/simple/extra/invoice" Comp={ExtraInvoice} />
			<MatchPath path="/simple/extra/404" Comp={Extra400} />
			<MatchPath path="/simple/extra/500" Comp={Extra500} />
			<MatchPath path="/simple/extra/blank_template" Comp={ExtraBlank} />
			<MatchPath path="/simple/extra/login" Comp={ExtraLogin} />
			<MatchPath path="/simple/extra/register" Comp={ExtraRegister} />
			<MatchPath path="/simple/extra/lock_screen" Comp={ExtraLockScreen} />
			<MatchPath path="/simple/extra/gallery" Comp={ExtraGallery} />
			<MatchPath path="/simple/extra/timeline" Comp={ExtraTimeLine} />
			{/* END Extra routes */}

			{/* START Menu Levels group routes */}
			<MatchPath path="/simple/levelOne" Comp={MenuLevelOne} />
			<MatchPath path="/simple/submenu" Comp={Submenu} />
			{/* END Menu Levels routes */}

			{/* {path.includes('/simple') && <Quickview />} */}
			{path.includes("/simple") && !path.includes("/boxed_layout") && (
				<Search />
			)}
		</div>
	);
};

export default withRouter(Simple);
