import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Link, Navbar } from "./components";
import { CharacterLookup, Films } from "./pages";
import { Overview } from "./pages/Characters/Overview";

import "./App.scss";

function App() {
  const links: Array<Link> = [
    {
      path: "/films",
      title: "Films",
      element: <Films />,
    },
    {
      path: "/character-search",
      title: "Character Search",
      element: <CharacterLookup />,
    },
    {
      path: "/character-overview",
      title: "Character Overview",
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
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
