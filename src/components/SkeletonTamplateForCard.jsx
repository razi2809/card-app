import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const SkeletonTamplateForCard = ({ cardIsInHome }) => {
  const ref = useRef();
  const [cardHaveEffect, setcardHaveEffect] = useState(cardIsInHome);

  const options = {
    rootMargin: "0px",
    threshold: 0.5,
  };
  const observe = (enries) => {
    enries.forEach((entry) => {
      {
        if (entry.isIntersecting) {
          if (ref.current.classList.contains("displayNone")) {
            ref.current.classList.add("animatedBottom");
            ref.current.classList.remove("displayNone");
            setTimeout(() => {
              setcardHaveEffect(false);
            }, [1000]);
          } else return;
        }
      }
    });
  };
  const observer = new IntersectionObserver(observe, options);

  useEffect(() => {
    observer.observe(ref.current);
  }, []);
  return (
    <Card
      ref={ref}
      className={cardHaveEffect ? "displayNone" : ""}
      sx={{
        // boxShadow: "2px 2px 5px",
        // border: "3px solid grey",
        // borderRadius: "8px",
        width: "100%",
        // height: "400px",
      }}
    >
      <Skeleton
        variant="rectangle"
        animation="wave"
        width={"100%"}
        height={"200px"}
      />
      <CardContent sx={{ backgroundColor: "grey", height: "100px" }}>
        <Box>
          <Skeleton width={"100%"} animation="wave" />
          <Skeleton width={"60%"} animation="wave" />
        </Box>
      </CardContent>

      <CardContent sx={{ backgroundColor: "lightgrey", height: "86px" }}>
        <Box>
          <Skeleton width={"100%"} animation="wave" />
          <Skeleton width={"60%"} animation="wave" />
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title="Like card">
          <IconButton aria-label="do staff"></IconButton>
        </Tooltip>

        <Tooltip title="Unlike card">
          <IconButton aria-label="do staff">
            <ThumbUpIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit card">
          <IconButton aria-label="do staff">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default SkeletonTamplateForCard;
