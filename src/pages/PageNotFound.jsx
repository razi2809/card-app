import React, { useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";
import WarningMessage from "../tostifyHandeker/WarningMessage";
const PageNotFound = () => {
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const navigate = useNavigate();
  // redircet the user on ending in a lost page to diffrent route depends on whether he logg in the system
  useEffect(() => {
    WarningMessage("Page Not Found redirecting...");

    setTimeout(() => {
      if (loggedin) {
        navigate(ROUTES.HOME);
      } else {
        navigate(ROUTES.CARDS);
      }
    }, [1500]);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default PageNotFound;
