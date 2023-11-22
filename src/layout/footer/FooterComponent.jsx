import { useState } from "react";
import { AppBar, Box, Container, Grid, Typography } from "@mui/material";

import NavLinkComponent from "../../components/layoutRelatedComponents/NavLinkComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LinksComponent from "../../components/layoutRelatedComponents/LinksComponent";

const FooterComponent = () => {
  const navigate = useNavigate();
  const NavigateToFavorite = () => {
    navigate("/cards/favorite");
  };
  const auth = useSelector((bigPie) => bigPie.authReducer);
  const loggedin = auth.loggedIn;
  const userInfo = auth.userInfo;
  const [value, setValue] = useState(0);
  return (
    <AppBar
      sx={{
        position: "static",
        bottom: 0,
        left: 0,
        right: 0,
        height: "auto",
        mt: 4,
      }}
    >
      <Box>
        <Container maxWidth="xl">
          <Grid
            container
            // spacing={3}
            sx={{
              justifyContent: "space-around",
              display: "flex",
            }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "center",
                  flexDirection: "column",
                  alignContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  links
                </Typography>
                <LinksComponent loggedin={loggedin} userInfo={userInfo} />
              </Box>
            </Grid>
            <Grid item xs={false} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  about me
                </Typography>
                <p style={{ textAlign: "center" }}>
                  hey my name is razi
                  <br />
                  i'm a fullstack developer
                  <br />
                  this page is created using <br />
                  some of the relevent technologies
                  <br />
                  like react, redux, material ui
                </p>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  about the page
                </Typography>
                <p style={{ textAlign: "center" }}>
                  this page is powerd to show
                  <br />
                  the cards in the database
                  <br />
                  you should log in to use all the features
                  <br />
                  like edit profile, delete profile, edit card, delete card
                  <br />
                  also you can create a new card
                </p>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  learn more
                </Typography>
                <NavLinkComponent to={"/about"} key={"/about"}>
                  about
                </NavLinkComponent>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppBar>
  );
};

export default FooterComponent;
/*     <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={NavigateToFavorite}/>{" "}
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation> */
