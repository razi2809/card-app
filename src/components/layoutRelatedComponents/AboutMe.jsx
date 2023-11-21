import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  CardMedia,
  Card,
} from "@mui/material";
import reactPic from "../../assets/react-code.jpeg";
const AboutMe = () => {
  const [disableView, setDisableView] = useState(true);
  const AvatarRef = useRef();
  const AboutMeRef = useRef();
  const picRef = useRef();
  const options = {
    rootMargin: "0px",
    threshold: 0.3,
  };
  const observe = (enries) => {
    enries.forEach((entry) => {
      {
        if (entry.isIntersecting) {
          if (entry.target == AboutMeRef.current) {
            AboutMeRef.current.classList.add("animatedFromLeft");
            AboutMeRef.current.classList.remove("displayNone");
          } else if (entry.target == AvatarRef.current) {
            AvatarRef.current.classList.add("animatedTop");
            AvatarRef.current.classList.remove("displayNone");
          } else if (entry.target == picRef.current) {
            if (picRef.current.classList.contains("displayNone")) {
              picRef.current.classList.add("animatedFromRight");
              picRef.current.classList.remove("displayNone");
              setTimeout(() => {
                setDisableView(false);
              }, [1000]);
            }
          }
        }
      }
    });
  };

  const observer = new IntersectionObserver(observe, options);
  useEffect(() => {
    observer.observe(AvatarRef.current);
    observer.observe(AboutMeRef.current);
    observer.observe(picRef.current);
  }, []);
  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid
        container
        item
        md={1}
        sx={{ display: { sm: "none", xs: "none", md: "flex" } }}
      ></Grid>
      <Grid
        container
        item
        xs={12}
        md={4}
        sm={6}
        sx={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          className={"displayNone"}
          ref={AvatarRef}
        >
          <Avatar sx={{ width: 70, height: 70, mb: 2 }} />
        </Box>

        <Box
          ref={AboutMeRef}
          className={"displayNone"}
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
          <Box>
            <Box sx={{ border: "none" }}>
              <Typography variant="h5" textAlign={"center"}>
                about me
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"center"}
                sx={{ mt: 1 }}
              >
                Greetings! 👋 I'm Razi, a seasoned web developer passionate
                about crafting digital experiences that leave a lasting
                impression. As a junior with a keen eye for detail, I specialize
                in turning ideas into interactive and user-friendly websites.
              </Typography>
              <Typography variant="h5" textAlign={"center"}>
                My Journey in Coding
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"center"}
                sx={{ mt: 1 }}
              >
                My journey in web development began back in 2022 in the military
                , and ever since, I've been immersed in the dynamic world of
                coding. I find joy in bringing designs to life through clean,
                efficient code and staying on the cutting edge of react/next.js.
              </Typography>
              <Typography variant="h5" textAlign={"center"}>
                Expertise at a Glance
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"center"}
                sx={{ mt: 1 }}
              >
                With a solid foundation in web-development, I bring a wealth of
                experience in Full-stack Development. From crafting responsive
                layouts with next.js to optimizing server-side performance, I'm
                dedicated to delivering seamless web solutions.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        container
        item
        md={2}
        sx={{ display: { sm: "none", xs: "none", md: "flex" } }}
      ></Grid>
      <Grid
        container
        item
        md={4}
        sm={6}
        sx={{
          display: { sm: "flex", xs: "none", md: "flex" },

          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          ref={picRef}
          className={disableView ? "displayNone" : ""}
          sx={{
            width: "60%",
            height: "100%",
            display: "flex",
            mt: "86px",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 5,
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={reactPic}
            alt="Contemplative Reptile"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Card>
      </Grid>
      <Grid
        container
        item
        md={1}
        sx={{ display: { sm: "none", xs: "none", md: "flex" } }}
      ></Grid>
    </Grid>
  );
};

export default AboutMe;
