import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

import {
  ListItem,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { RouteData } from "~/routesData";
import { useNavigate } from "@remix-run/react";
import { useSettingsContext } from "~/contexts/settings/settingsContext";

export function Sidenav({
  brandName,
  routes,
}: {
  brandImg: string;
  brandName: string;
  routes: RouteData[];
}) {
  const nav = useNavigate();
  const { sideNavBarOpen } = useSettingsContext();

  //TODO: change the followings to get value from context
  const sidenavType = nav == null ? "dark" : "white"; // this fake comparison is to avoid TS error only.
  const sidenavColor = "blue-gray";

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        sideNavBarOpen ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl border border-blue-gray-100 transition-transform duration-300 xl:translate-x-0`}
    >
      <div className={`relative`}>
        <Link to="/" className="px-8 py-6 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            <img
              alt="may I coach"
              src="/images/mayIcoach100.png"
              className="mx-auto inline-block h-12 w-12 "
            />
            {brandName}
          </Typography>
        </Link>
      </div>
      <div className="m-4">
        {routes.map(({ title, pages }, key) => (
          <List key={key}>
            {title && (
              <ListItem className="mx-3.5 mb-2 mt-4">
                <Typography
                  variant="body2"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </ListItem>
            )}
            {pages.map(({ icon, name, path }) => (
              <NavLink to={path} key={name} end>
                {({ isActive }) => (
                  <ListItemButton selected={isActive} href="">
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{name}</ListItemText>
                  </ListItemButton>
                )}
              </NavLink>
            ))}
          </List>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "mAy I Coach",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
