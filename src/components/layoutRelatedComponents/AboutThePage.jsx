import React, { useRef, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useInView } from "framer-motion";

import SvgArrow from "../../assets/SvgArrow";
import PopUp from "./PopUp";
import InteractWithPage from "./InteractWithPage";
const AboutThePage = () => {
  const firstRef = useRef(null);
  const secondeRef = useRef(null);
  const isInView = useInView(firstRef, { once: true });
  const SecisInView = useInView(secondeRef, { once: true });
  const [popUpView, setPopUpView] = useState(false);
  const [choice, setChoice] = useState(null);
  const handlePopUp = () => {
    if (choice) return;
    setPopUpView(true);
  };
  const handleChoice = (e) => {
    setChoice(e);
    setPopUpView(false);
  };
  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid container item md={12} sx={{ justifyContent: "center" }}>
        <Typography variant="h2" textAlign="center">
          about the page
        </Typography>
      </Grid>
      <Grid container item md={1} sx={{ justifyContent: "center" }}></Grid>
      <Grid
        container
        item
        xs={4}
        md={3}
        sm={4}
        sx={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            width: "60%",
            // height: 300,
            display: "flex",
            justifyContent: "center",
          }}
          p={2}
          boxShadow={3}
          borderRadius={5}
        >
          {" "}
          <Typography variant="h5" textAlign={"center"} ref={firstRef}>
            at first <br></br>the user isnt logged in
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={4}
        md={4}
        sm={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ",
          }}
        >
          <SvgArrow />
        </div>
      </Grid>
      <Grid
        container
        item
        xs={4}
        md={3}
        sm={4}
        sx={{
          scale: isInView ? "1" : "0.5",
          justifyContent: "center",
          transition: "scale 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) ",
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
          }}
          p={2}
          boxShadow={3}
          borderRadius={5}
        >
          {" "}
          <Typography variant="h5" textAlign={"center"} ref={firstRef}>
            he can't much interct with the page <br></br>he can only see the
            cards
          </Typography>
        </Box>
      </Grid>
      <Grid
        ref={secondeRef}
        container
        item
        xs={12}
        md={12}
        sm={12}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            // transform: "rotate(45deg)",
            transform: isInView
              ? "rotate(35deg)  translateX(-100px)"
              : " translateX(-75px) ",

            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ",
          }}
        >
          <SvgArrow />
        </div>
        <Grid
          sx={{
            scale: SecisInView ? "1 " : "0.5",
            transition: "scale 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ",
          }}
        >
          <Box
            sx={{
              width: "10rem",
              height: "10rem",
              mt: 4,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              transform: "rotate(45deg)",
              cursor: "pointer",
            }}
            onClick={handlePopUp}
            p={2}
            boxShadow={3}
            borderRadius={5}
          >
            {" "}
            <Typography
              variant="h5"
              textAlign={"center"}
              style={{
                margin: "auto",
                transform: "rotate(-45deg)",
              }}
            >
              user does logged in? <br></br>click me
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {popUpView && <PopUp choice={handleChoice} />}
      {choice && (
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            position: "relative",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              transform: SecisInView ? "rotate(90deg)  " : "  ",
              opacity: SecisInView ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ",
            }}
          >
            <SvgArrow />
          </div>
          <InteractWithPage choice={choice} />
        </Grid>
      )}
    </Grid>
  );
};
export default AboutThePage;
