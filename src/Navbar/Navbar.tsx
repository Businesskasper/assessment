import { matchPath, useLocation, useNavigate } from "react-router-dom";

import './NavBar.scss';

export type Link = { target: string; title: string };

type Props = {
  links: Array<Link>;
};

export const Navbar = ({ links }: Props) => {
  return (
    <div className="navbar">
      {links.map((link, index) => (
        <NavbarLink key={index} target={link.target} title={link.title} />
      ))}
    </div>
  );
};

const NavbarLink = ({ target, title }: Link) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isActive = !!target && !!matchPath(pathname, target);

  const openTarget = () => {
    navigate(target);
  };

  return (
    <span className={`link ${isActive ? "active" : ""}`} onClick={openTarget}>
      {title}
    </span>
  );
};
