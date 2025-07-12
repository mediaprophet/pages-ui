import React, { Component } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Casual from "./Theme/Casual";
import Corporate from "./Theme/Corporate";
import Condensed from "./Theme/Condensed";
import Simple from "./Theme/simple";
import Executive from "./Theme/Executive";

import Quickview from "./components/Quickview";

class App extends Component {
	render() {
		return (
			<BrowserRouter basename="/dashboard/latest/react">
				<div className="App h-100">
					<Routes>
						{/* Uncomment the routes below if you want to view all the themes (remember to uncomment the imports as well*/}
						<Route path="/casual/*" element={<Casual />}>

						</Route>
						<Route path="/corporate/*" element={<Corporate />}>

						</Route>
						<Route path="/condensed/*" element={<Condensed />}>

						</Route>
						<Route path="/simple/*" element={<Simple />}>

						</Route>
						<Route path="/executive/*" element={<Executive />}>

						</Route>
					</Routes>
					<Quickview />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
