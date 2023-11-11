import {
  Typography,
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Tooltip,
  CardActions,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const TemplateCardComponent = ({
  title,
  subTitle,
  phone,
  description,
  id,
  url,
  onEditCard,
  onLikedCard,
  onDeleteCard,
  likeFromData,
  canDelete,
}) => {
  const [like, setlike] = useState(likeFromData);
  const [deleteCard, setdeletedCard] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverFlow] = useState(false);
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const textRef = useRef();
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
  useLayoutEffect(() => {
    const element = textRef.current;
    if (element.scrollHeight > element.clientHeight) {
      // Overflow detected
      setOverFlow(true);
    }
  }, [description]);
  const handleDeleteCardClick = () => {
    //send the father the id of the card
    //set delete to true which will stop it from rendering
    setdeletedCard(true);
    onDeleteCard(id);
  };
  const handleEditCardClick = () => {
    //send the father id of the card

    onEditCard(id);
  };
  const handlelikeCardClick = () => {
    //send the father the like state and the id of the card
    //set liek to opposite which will chacnge the render
    onLikedCard(id, like);
    setlike(!like);
  };
  if (!deleteCard) {
    return (
      <Card
        sx={{
          // boxShadow: "2px 2px 5px",
          // border: "3px solid grey",
          // borderRadius: "8px",
          width: "100%",
          // height: "400px",
        }}
      >
        <CardMedia
          sx={{ width: "100%", height: "200px" }}
          component="img"
          image={url}
        ></CardMedia>
        <CardHeader
          title={title}
          subheader={subTitle}
          sx={{ backgroundColor: "grey", color: "black", height: "100px" }}
          // onClick={handleEditCardClick}
        />
        <CardContent sx={{ backgroundColor: "lightgrey" }}>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Phone: </span>
            {phone}
          </Typography>
          <Typography
            sx={{ height: expanded ? "70px" : "30px", overflow: "hidden" }}
            ref={textRef}
          >
            <span style={{ fontWeight: "bold" }}>description: </span>
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {!like && loggedin && (
            <Tooltip title="Like card">
              <IconButton onClick={handlelikeCardClick} aria-label="do staff">
                <ThumbUpOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
          {like && loggedin && (
            <Tooltip title="Unlike card">
              <IconButton onClick={handlelikeCardClick} aria-label="do staff">
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>
          )}
          {loggedin && (
            <Tooltip title="Edit card">
              <IconButton onClick={handleEditCardClick} aria-label="do staff">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {canDelete && loggedin && (
            <Tooltip title="Delete card">
              <IconButton onClick={handleDeleteCardClick} aria-label="do staff">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          {overflow && (
            <ExpandMore
              title={!expanded ? "view more" : "view less"}
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </CardActions>
      </Card>
    );
  }
};

TemplateCardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onLikedCard: PropTypes.func.isRequired,
};
export default memo(TemplateCardComponent);
