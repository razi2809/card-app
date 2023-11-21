import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  IconButton,
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Box,
  Tooltip,
  CardActions,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
const SkeletonTamplateForUser = () => {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          title={<Skeleton animation="wave" width={"100%"} />}
          subheader={<Skeleton width={"100%"} animation="wave" />}
          sx={{
            height: 100,
            backgroundColor: "grey",
            color: "black",
            textAlign: "center",
          }}
        />
        <CardContent
          sx={{
            backgroundColor: "lightgrey",
            color: "black",
            textAlign: "center",
          }}
        >
          <Skeleton animation="wave" width={"100%"} />
        </CardContent>
      </CardActionArea>
      <Box>
        <CardActions disableSpacing>
          <Tooltip title="Edit user">
            <IconButton aria-label="do staff">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete user">
            <IconButton aria-label="do staff">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <ExpandMore
            title={"view more"}
            aria-expanded={true}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Box>
    </Card>
  );
};

export default SkeletonTamplateForUser;
