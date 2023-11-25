import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { Fragment, useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import TemplateCardComponent from "../components/cradsComponents/TemplateCardComponent";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import SkeletonTamplateForCard from "../components/cradsComponents/SkeletonTamplateForCard";

import About from "./About";
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((bigPie) => bigPie.authReducer);
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
        .get("/cards")
        .then(function (response) {
          SetallCards(response.data.slice(0, 4));
          setInitialDataFromServer(response.data);
          setDone(true);
        })
        .catch(function (error) {
          //this will catch the error from the server
          ErrorMessage(error.response);
        });

      axios
        .get("/cards/my-cards")
        .then(function (response) {
          if (response.data && response.data.length > 0) {
            SetCards(response.data);
          }
        })
        .catch(function (error) {
          //this will catch the error from the server
          ErrorMessage(error.response);
        });
    }
  }, [loggedin]);
  const handleEditCard = useCallback((idToEdit) => {
    // Navigate to the specified path after the delay
    navigate(`/cards/${idToEdit}/edit`);
  }, []);
  const handeDeleteCard = (idToDelte) => {
    axios
      .delete(`/cards/${idToDelte}`)
      .then(function (response) {
        SuccessMessage("delete success");
        console.log(allCards, idToDelte);
        allCards.map((card, index) => {
          if (card._id == idToDelte) {
            //update the cards to delete it
            const copied = [...allCards];
            copied.splice(index, 1);
            SetallCards(copied);
          }
          if (cards.length > 0) {
            cards.map((card, index) => {
              if (card._id == idToDelte) {
                //update the cards to delete it
                const copied = [...cards];
                copied.splice(index, 1);
                SetCards(copied);
              }
            });
          }
        });
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
      });
  };
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
                    sx={{
                      height: cards.length ? { md: "100%" } : { md: "auto" },
                    }}
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
            {done &&
              allCards.length &&
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
            <About />
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
