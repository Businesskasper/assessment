import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Films, People } from "./pages";
import { Link, Navbar } from "./components";

function App() {
  const links: Array<Link> = [
    {
      path: "/films",
      title: "Films",
      element: <Films />,
    },
    {
      path: "/people",
      title: "People",
      element: <People />,
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
