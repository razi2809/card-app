import React, { Fragment } from "react";
import MainComponent from "./main/MainComponent";
import FooterComponent from "./footer/FooterComponent";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import tmc from "twin-moon-color";
import ResponsiveAppBar from "./header/HeaderExpiricne";

const LayoutComponent = ({ children }) => {
  const checked = useSelector((bigPie) => bigPie.DarkReducer);
  const themes = tmc({
    "text.headerColor": "#26a69a",
    "text.headerActive": "#26a69a",
  });
  const darkTheme = createTheme(themes.dark);

  const lightTheme = createTheme(themes.light);

  return (
    <Fragment>
      <ThemeProvider theme={checked ? darkTheme : lightTheme}>
        <CssBaseline />
        <ResponsiveAppBar darkEnable={checked} position="sticky" />
        <MainComponent>{children}</MainComponent>
        <FooterComponent />
      </ThemeProvider>
    </Fragment>
  );
};

export default React.memo(LayoutComponent);
