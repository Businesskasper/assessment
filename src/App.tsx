import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import { Link, Navbar } from "./components";
import { Films, PeopleSearch } from "./pages";
import { Overview } from "./pages/People/Overview";

import "./App.scss";

function App() {
	const links: Array<Link> = [
		{
			path: "/films",
			title: "Films",
			element: <Films />,
		},
		{
			path: "/people-search",
			title: "People Search",
			element: <PeopleSearch />,
		},
		{
			path: "/people-overview",
			title: "People Overview",
			element: <Overview />,
		},
		{
			path: "/",
			element: <Navigate to="/films" />,
		},
	];
	return (
		<>
			<BrowserRouter>
				<Navbar links={links} />
				<Routes>
					{links.map(({ path, element }) => (
						<Route
							key={path}
							path={path}
							element={element}
						/>
					))}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
