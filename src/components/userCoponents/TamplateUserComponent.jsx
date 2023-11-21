import {
  IconButton,
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Box,
  Tooltip,
  CardActions,
  Collapse,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TamplateUserComponent = ({ user, onDeleteuser, onEdituser }) => {
  const [expanded, setExpanded] = useState(false);
  const [deleteUser, setDeletedUser] = useState(false);
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const id = user._id;
  const firstName = user.name.first;
  const lastName = user.name.last;
  const email = user.email;
  const phone = user.phone;
  const country = user.address.country;
  const city = user.address.city;
  const handleDeleteUser = () => {
    //send the father the id of the user
    //set delete to true which will stop it from rendering
    setDeletedUser(true);
    onDeleteuser(id);
  };
  const handleEditUser = () => {
    //send the father id of the user
    onEdituser(id);
  };
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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (!deleteUser) {
    return (
      <Card>
        <CardActionArea>
          <CardHeader
            title={firstName}
            subheader={lastName}
            sx={{
              height: 100,
              backgroundColor: "grey",
              color: "black",
              textAlign: "center",
            }}
            // onClick={handleEditCardClick}
          />
          <CardContent
            sx={{
              backgroundColor: "lightgrey",
              color: "black",
              textAlign: "center",
            }}
          >
            {email}
          </CardContent>
        </CardActionArea>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ mt: 1, mb: 2, textAlign: "center" }}>
              user's phone: {phone}
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              users's address: <br></br>
              country: {country} <br></br>
              city: {city}
            </Typography>
          </CardContent>
        </Collapse>
        <Box
        // sx={{ display: "flex", justifyContent: "center" }}
        >
          <CardActions disableSpacing>
            <Tooltip title="Edit user">
              <IconButton onClick={handleEditUser} aria-label="do staff">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete user">
              <IconButton onClick={handleDeleteUser} aria-label="do staff">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <ExpandMore
              title={!expanded ? "view more" : "view less"}
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </Box>
      </Card>
    );
  }
};

export default memo(TamplateUserComponent);
