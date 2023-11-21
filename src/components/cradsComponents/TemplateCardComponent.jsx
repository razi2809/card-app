import {
  Typography,
  IconButton,
  Card,
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
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
const TemplateCardComponent = ({
  card,
  onEditCard,
  onLikedCard,
  onDeleteCard,
  likeFromData,
  canDelete,
  cardIsInHome,
}) => {
  console.log(card);
  const id = card._id;
  const title = card.title;
  const subTitle = card.subtitle;
  const phone = card.phone;
  const description = card.description;
  const url = card.image.url;
  const [like, setlike] = useState(likeFromData);
  const [deleteCard, setdeletedCard] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverFlow] = useState(false);
  const [cardHaveEffect, setcardHaveEffect] = useState(cardIsInHome);
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const textRef = useRef(null);
  const ref = useRef(null);
  const options = {
    rootMargin: "0px",
    threshold: 0.5,
  };
  const observe = (enries) => {
    enries.forEach((entry) => {
      {
        if (entry.isIntersecting) {
          if (ref.current) {
            if (ref.current.classList.contains("displayNone")) {
              ref.current.classList.add("animatedBottom");
              ref.current.classList.remove("displayNone");
              setTimeout(() => {
                setcardHaveEffect(false);
              }, [1000]);
            } else return;
          }
        }
      }
    });
  };
  const observer = new IntersectionObserver(observe, options);
  useEffect(() => {
    observer.observe(ref.current);
  }, []);
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
        className={cardHaveEffect ? "displayNone" : ""}
        ref={ref}
        sx={{
          width: "100%",
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
export default memo(TemplateCardComponent);
