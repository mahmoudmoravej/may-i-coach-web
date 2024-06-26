import { Link } from "react-router-dom";

import {
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { AppBar, Button, IconButton, TextField } from "@mui/material";
import { signOutClient } from "~/utils";
import { useApolloClient } from "@apollo/client/index.js";
import { useSettingsContext } from "~/contexts";

export function DashboardTopNavbar() {
  // const { pathname } = useLocation();
  const apolloClient = useApolloClient();
  const { sideNavBarOpen, setSideNavBarOpen } = useSettingsContext();

  // let [layout, page] = pathname.split("/").filter((el) => el !== "");
  const fixedNavbar = false;
  // page = page ? page : "";

  return (
    <AppBar
      position="sticky"
      color="default"
      className={` transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      // fullWidth
      // blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        {
          <div className="capitalize">
            {/* <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs> 
             <Typography variant="h6" color="blue-gray">
              {page}
            </Typography> */}
          </div>
        }
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            {/* <TextField title="Search" size="small" /> */}
          </div>
          <IconButton
            color="default"
            className="grid xl:hidden"
            onClick={() => {
              setSideNavBarOpen(!sideNavBarOpen);
            }}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/logout">
            <Button
              variant="text"
              className="hidden items-center gap-1 px-4 normal-case xl:flex"
              onClick={() => {
                // setAuthContextUser(undefined); it is not a good practice. It reloads the already loaded/cached pages with empty user data which raises errors in another render before the full redirect happens.
                signOutClient(apolloClient); // i guess we don't need this one as well.
              }}
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Sign out
            </Button>
            <IconButton className="grid xl:hidden">
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          {/* <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu> */}
          <IconButton onClick={() => null}>
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </AppBar>
  );
}
