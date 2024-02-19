import { PathRouteProps, matchPath, useLocation, useNavigate } from "react-router-dom";

import "./Navbar.scss";

export type Link = Pick<PathRouteProps, "element" | "path"> & {
  title?: string;
};

type Props = {
  links: Array<Link>;
};

export const Navbar = ({ links }: Props) => {
  return (
    <div className="navbar">
      {links
        .filter((link) => !!link.title)
        .map((link, index) => (
          <NavbarLink key={index} {...link} />
        ))}
    </div>
  );
};

const NavbarLink = ({ path, title }: Link) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isActive = !!path && !!matchPath(pathname, path);

  const openTarget = () => {
    navigate(path || '');
  };

  return (
    <span className={`link ${isActive ? "active" : ""}`} onClick={openTarget}>
      {title}
    </span>
  );
};
