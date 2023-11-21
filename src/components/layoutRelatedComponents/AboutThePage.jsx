import { Box, Grid } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { ref } from "joi";
import { useEffect, useRef } from "react";
// import TrendingDownIcon from "@material-ui/icons/TrendingDown";
export default function App() {
  const ref = useRef(null);
  const refPge = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const { scrollYProgress: scaleForPage } = useScroll({
    target: refPge,
    offset: ["end end", "start start"],
  });
  /*   const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1.5],
    [0.5, 1.5, 2.3, 0.5]
  ); */
  const translatY = useTransform(scaleForPage, [0, 1], [0, 150]);
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
      }}
    >
      <Grid container item xs={12} sm={12} md={12} spacing={4}>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
        >
          <motion.h1
            style={{
              scale: scrollYProgress,

              textAlign: "center",
            }}
          >
            about the page
          </motion.h1>
        </Grid>
        <Grid
          ref={refPge}
          container
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              // scale: scaleMe,
              width: "5px",
              height: "150px",
              backgroundColor: "red",
              position: "relative",
            }}
          >
            <motion.div
              style={{
                scale: 4,
                position: "absolute",
                translateY: translatY,
              }}
            >
              {/* <TrendingDownIcon /> */}
            </motion.div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
