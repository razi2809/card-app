import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useInView } from "framer-motion";
import SvgArrow from "../../assets/SvgArrow";

const InteractWithPage = ({ choice }) => {
  const [userAction, setUserAction] = useState(null);
  const [userInterct, setuserInterct] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (choice == "user is business") {
      setUserAction("he can do everything reguler user dose");
      setuserInterct("he can also create a card");
    } else if (choice == "user is regular") {
      setUserAction("he can do not much");
      setuserInterct("he can view his profile and edit it and like the cards");
    } else {
      setUserAction("he can do every thing");
      setuserInterct(
        "he can view all the profiles and edit them or delete them"
      );
    }
  }, []);
  return (
    <Grid
      ref={ref}
      container
      spacing={4}
      sx={{
        mt: 2,
      }}
    >
      {" "}
      <Grid
        container
        item
        xs={0}
        md={1}
        sm={6}
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      ></Grid>
      <Grid
        container
        item
        xs={6}
        md={2}
        sm={6}
        sx={{
          scale: isInView ? "1" : "0.5",
          transition: "scale 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) ",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          p={2}
          boxShadow={3}
          borderRadius={5}
        >
          {" "}
          <Typography variant="h5" textAlign={"center"}>
            {userAction}
          </Typography>
        </Box>
      </Grid>{" "}
      <Grid
        container
        item
        xs={0}
        md={2}
        sm={6}
        sx={{
          position: "relative",
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <div
          style={{
            position: "absolute",
            transform: isInView ? "" : "translateX(400px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ",
          }}
        >
          <div
            style={{
              transform: "rotate(180deg)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <SvgArrow />
          </div>
        </div>
      </Grid>{" "}
      <Grid
        container
        item
        xs={0}
        md={2}
        sm={6}
        sx={{
          scale: isInView ? "1" : "0.5",
          transition: "scale 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) ",

          justifyContent: "center",
          alignContent: "center",
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            // height: 300,
            display: "flex",
            justifyContent: "center",
          }}
          p={2}
          boxShadow={3}
          borderRadius={5}
        >
          {" "}
          <Typography variant="h5" textAlign={"center"}>
            {choice}
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={0}
        md={2}
        sm={6}
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        {" "}
        <div
          style={{
            position: "absolute",
            transform: isInView ? " translateX(220px)" : "translateX(50px)",
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
        xs={6}
        md={2}
        sm={6}
        sx={{
          scale: isInView ? "1" : "0.5",
          transition: "scale 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) ",
        }}
      >
        <Box
          sx={{
            width: "100%",
            // height: 300,
            display: "flex",
            justifyContent: "center",
          }}
          p={2}
          boxShadow={3}
          borderRadius={5}
        >
          {" "}
          <Typography variant="h5" textAlign={"center"}>
            {userInterct}
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={0}
        md={1}
        sm={6}
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      ></Grid>
    </Grid>
  );
};

export default InteractWithPage;
