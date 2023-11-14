import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import TemplateCardComponent from "../components/TemplateCardComponent";
import { Typography } from "@mui/material";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import useSearchquery from "../hooks/useSearchParams";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import SkeletonTamplateForCard from "../components/SkeletonTamplateForCard";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((bigPie) => bigPie.authReducer);
  const search = useSearchquery();
  const loggedin = user.loggedin;
  const userData = user.userInfo;
  const userId = user.userData;
  const [cards, SetCards] = useState("");
  const [done, setDone] = useState(false);
  const [allCards, SetallCards] = useState("");
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const memoCard = React.memo(TemplateCardComponent);
  const skeleton = [0, 1, 2, 3];

  useEffect(() => {
    if (userData) {
      axios
        .get("/cards/my-cards")
        .then(function (response) {
          if (response.data && response.data.length > 0) {
            SetCards(response.data);
            setInitialDataFromServer(response.data);
            setDone(true);
            //user has cards so show them
          } else {
            axios.get("/cards").then(function (response) {
              //user has no cards so show some cards of all of them
              SetallCards(response.data.slice(0, 4));
              setDone(true);
            });
          }
        })
        .catch(function (error) {
          //this will catch the error from the server
          ErrorMessage(error.response);
        });
    }
  }, [loggedin]);
  useEffect(() => {
    //check if initial data is populate if not return
    //check the value of the hook in filter key if empty return
    //if filter does contain something the filter the cards
    if (!initialDataFromServer.length) return;
    const filter = search.filter ? search.filter : "";
    const filteredCards = initialDataFromServer.filter((card) =>
      card.title.startsWith(filter)
    );
    if (filteredCards.length === 0) {
      // Handle empty response here
      WarningMessage("No cards match the filter");
    }
    // Update the cards state with the filtered cards
    SetCards(filteredCards);
  }, [search, initialDataFromServer]);
  const handleEditCard = useCallback((idToEdit) => {
    // Navigate to the specified path after the delay
    navigate(`/cards/${idToEdit}/edit`);
  }, []);
  const handeDeleteCard = useCallback((idToDelte) => {
    //send delete request to the server
    axios
      .delete(`/cards/${idToDelte}`)
      .then(function (response) {
        //if the delete was successful then remove the card from the state
        SuccessMessage("deleted successfully");
      })
      .catch(function (error) {
        //if the delete was unsuccessful then show the error
        ErrorMessage(error.response.data);
      });
  }, []);
  const handleLikeCard = useCallback((idToLike, like) => {
    axios
      .patch(`/cards/${idToLike}`)
      .then(function (response) {
        if (!like) {
          //if the like wasnt on so like it and show the success message
          SuccessMessage("liked");
        } else {
          //if the like was on so unlike it and show the success message
          SuccessMessage("unliked");
        }
      })
      .catch(function (error) {
        //if the request was unsuccessful then show the error
        ErrorMessage(error.response.data);
      });
  }, []);
  if (userData) {
    //
    return (
      <Box>
        <Typography variant="h1" textAlign="center">
          welcome {userData.name.first}
        </Typography>
        {initialDataFromServer.length > 0 && cards.length > 0 && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              {cards.map((card) => (
                <Grid xs={12} sm={6} md={3} key={card._id}>
                  <TemplateCardComponent
                    id={card._id}
                    title={card.title}
                    subTitle={card.subtitle}
                    phone={card.phone}
                    description={card.description}
                    url={card.image.url}
                    onEditCard={handleEditCard}
                    onLikedCard={handleLikeCard}
                    onDeleteCard={handeDeleteCard}
                    likeFromData={card.likes.includes(userId) ? true : false}
                    canDelete={
                      card.user_id == userId || userData.isAdmin ? true : false
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {!initialDataFromServer.length && allCards && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              {allCards.map((card) => (
                <Grid xs={12} sm={6} md={3} key={card._id}>
                  <TemplateCardComponent
                    id={card._id}
                    title={card.title}
                    subTitle={card.subtitle}
                    phone={card.phone}
                    description={card.description}
                    url={card.image.url}
                    onEditCard={handleEditCard}
                    onLikedCard={handleLikeCard}
                    onDeleteCard={handeDeleteCard}
                    likeFromData={card.likes.includes(userId) ? true : false}
                    canDelete={
                      card.user_id == userId || userData.isAdmin ? true : false
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {!done && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              {skeleton.map((card) => (
                <Grid xs={12} sm={6} md={3} key={card}>
                  <SkeletonTamplateForCard />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    );
  } else if (initialDataFromServer.length > 0 && cards.length == 0) {
    //no one match after the search
    return <Typography variant="h1">no cards match</Typography>;
  }
};

export default HomePage;
