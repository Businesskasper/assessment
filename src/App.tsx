import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Films } from "./Films/Films";
import { People } from "./People/People";
import { Link, Navbar } from "./Navbar/Navbar";

function App() {
  const links: Array<Link> = [
    {
      target: "/films",
      title: "Films",
    },
    {
      target: "/people",
      title: "People",
    },
  ];

  return (
    <>
      <BrowserRouter>
        <Navbar links={links} />
        <Routes>
          <Route path="/films" element={<Films />} />
          <Route path="/people" element={<People />} />
          <Route path="/" element={<Navigate to="/films" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
