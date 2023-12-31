import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { DarkActions } from "../../REDUX/DarkTheme";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import NavLinkComponent from "../../components/layoutRelatedComponents/NavLinkComponent";
import { authActions } from "../../REDUX/authSlice";
import { Button, Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../tostifyHandeker/ErrorMessage";
import FilterComponent from "./serachcomponent/FilterComponent";
import WarningMessage from "../../tostifyHandeker/WarningMessage";
import LinksComponent from "../../components/layoutRelatedComponents/LinksComponent";
import { useTheme } from "@mui/material/styles";
function ResponsiveAppBar({ darkEnable }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((bigPie) => bigPie.authReducer);
  const loggedin = auth.loggedIn;
  const decodedToken = auth.userData;
  const userInfo = auth.userInfo;
  const handleChangetheme = () => {
    dispatch(DarkActions.changeState(!darkEnable));
    localStorage.setItem("theme", !darkEnable);
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleLogOut = () => {
    setAnchorElUser(null);
    dispatch(authActions.logout());
    navigate("/cards");
    WarningMessage("you are now logged out");
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if (!loggedin) {
      ErrorMessage("cannot open plese log in");
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handeleUserNameClick = () => {
    navigate("/home");
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-evenly" }}>
          <Box
            sx={{
              // flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
                justifyContent: "space-between",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 0.4,
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignContent: "space-around",
                }}
                onClick={handleCloseNavMenu}
              >
                <LinksComponent loggedin={loggedin} userInfo={userInfo} />
              </Box>
            </Drawer>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {userInfo && (
              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={handeleUserNameClick}
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {userInfo.name.first}
              </Typography>
            )}
            {!darkEnable && <NightlightIcon onClick={handleChangetheme} />}
            {darkEnable && (
              <LightModeIcon sx={{ mr: 1 }} onClick={handleChangetheme} />
            )}
          </Box>
          <FilterComponent />
          <Box
            sx={{
              // flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <LinksComponent loggedin={loggedin} userInfo={userInfo} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    userInfo
                      ? userInfo.image.url
                      : "/static/images/avatar/2.jpg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ flexDirection: "column", display: "flex" }}>
                {" "}
                <Button onClick={handleCloseUserMenu}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: darkEnable ? "white" : "black",
                    }}
                    to={`/profile/${decodedToken}`}
                  >
                    profile
                  </Link>
                </Button>
                <Button
                  sx={{
                    color: darkEnable ? "white" : "black",
                  }}
                  onClick={handleLogOut}
                >
                  logout
                </Button>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default React.memo(ResponsiveAppBar);
