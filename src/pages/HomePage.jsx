import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import TemplateCardComponent from "../components/cradsComponents/TemplateCardComponent";
import { Typography } from "@mui/material";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import useSearchquery from "../hooks/useSearchParams";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import SkeletonTamplateForCard from "../components/cradsComponents/SkeletonTamplateForCard";
import { likeAction } from "../REDUX/likeSlice";
import AboutMe from "../components/layoutRelatedComponents/AboutMe";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((bigPie) => bigPie.authReducer);
  const search = useSearchquery();
  const loggedin = user.loggedin;
  const userData = user.userInfo;
  const userId = user.userData;
  const [cards, SetCards] = useState("");
  const [done, setDone] = useState(false);
  const [allCards, SetallCards] = useState("");
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const skeleton = [0, 1, 2, 3];
  useEffect(() => {
    if (userData) {
      axios
        .get("/cards/my-cards")
        .then(function (response) {
          if (response.data && response.data.length > 0) {
            SetCards(response.data);
            setInitialDataFromServer(response.data);
          }
          axios.get("/cards").then(function (response) {
            SetallCards(response.data.slice(0, 4));
            setDone(true);
          });
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
        dispatch(likeAction.changeState(true));
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
    return (
      <Box sx={{ width: 1 }}>
        <Typography variant="h1" textAlign="center">
          welcome {userData.name.first}
        </Typography>
        <Grid container spacing={3}>
          <Grid container spacing={3} sm={12} xs={12} md={6}>
            <Grid xs={12} md={12}>
              <Typography variant="h2" textAlign="center">
                my cards{" "}
              </Typography>
            </Grid>
            {cards &&
              cards.map((card) => (
                <Fragment key={card._id}>
                  <Grid
                    container
                    xs={2}
                    sm={0}
                    md={1}
                    sx={{ height: { md: "100%" } }}
                  ></Grid>
                  <Grid xs={8} sm={6} md={4}>
                    <TemplateCardComponent
                      cardIsInHome={true}
                      card={card}
                      onEditCard={handleEditCard}
                      onLikedCard={handleLikeCard}
                      onDeleteCard={handeDeleteCard}
                      likeFromData={card.likes.includes(userId) ? true : false}
                      canDelete={
                        card.user_id == userId || userData.isAdmin
                          ? true
                          : false
                      }
                    />
                  </Grid>
                  <Grid container xs={2} sm={false} md={1}></Grid>{" "}
                </Fragment>
              ))}
            {!done &&
              skeleton.map((card) => (
                <Fragment key={card}>
                  <Grid container xs={2} sm={0} md={1}></Grid>
                  <Grid xs={8} sm={6} md={4} key={card}>
                    <SkeletonTamplateForCard cardIsInHome={true} />
                  </Grid>
                  <Grid container xs={2} sm={0} md={1}></Grid>
                </Fragment>
              ))}
          </Grid>
          <Grid container spacing={3} sm={12} xs={12} md={6}>
            <Grid xs={12} md={12}>
              <Typography variant="h2" textAlign="center">
                all cards{" "}
              </Typography>
            </Grid>
            {allCards &&
              allCards.map((card) => (
                <Fragment key={card._id}>
                  <Grid container xs={2} sm={0} md={1}></Grid>
                  <Grid xs={8} sm={6} md={4}>
                    <TemplateCardComponent
                      cardIsInHome={true}
                      card={card}
                      onEditCard={handleEditCard}
                      onLikedCard={handleLikeCard}
                      onDeleteCard={handeDeleteCard}
                      likeFromData={card.likes.includes(userId) ? true : false}
                      canDelete={
                        card.user_id == userId || userData.isAdmin
                          ? true
                          : false
                      }
                    />
                  </Grid>
                  <Grid container xs={2} sm={0} md={1}></Grid>
                </Fragment>
              ))}
            {!done &&
              skeleton.map((card) => (
                <Fragment key={card}>
                  <Grid
                    container
                    xs={2}
                    sm={0}
                    md={1}
                    sx={{ height: "100%" }}
                  ></Grid>
                  <Grid xs={8} sm={6} md={4} key={card}>
                    <SkeletonTamplateForCard cardIsInHome={true} />
                  </Grid>
                  <Grid container xs={2} sm={0} md={1}></Grid>
                </Fragment>
              ))}
          </Grid>
          <Grid xs={12} md={12}>
            <AboutMe />
          </Grid>
        </Grid>
      </Box>
    );
  } else if (initialDataFromServer.length > 0 && cards.length == 0) {
    //no one match after the search
    return <Typography variant="h1">no cards match</Typography>;
  }
};
export default HomePage;