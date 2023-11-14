import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import TemplateCardComponent from "../components/TemplateCardComponent";
import { Pagination, Typography } from "@mui/material";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import useSearchquery from "../hooks/useSearchParams";
import ROUTES from "../routes/ROUTES";
import SkeletonTamplateForCard from "../components/SkeletonTamplateForCard";
const FavoriteCards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = useSelector((bigPie) => bigPie.authReducer.userData);
  const [cards, SetCards] = useState("");
  const [done, setDone] = useState(false);
  const search = useSearchquery();
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const skeleton = [0, 1, 2, 3, 4, 5];
  const WhatPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(WhatPage);
  const [numPages, setnumPages] = useState(1);
  const TOTAL_PER_PAGE = 6;
  const handlePageChange = (_, newPage) => {
    //when he clicks to move a page then navigate to a new one
    //the page state will upate automaticly
    setPage(newPage);
    navigate(`/cards/favorite?page=${newPage}`);
  };
  useEffect(() => {
    //get the page number from the param
    //setting the card data accordingly
    if (initialDataFromServer.length > 0) {
      SetCards(
        initialDataFromServer.slice(
          (page - 1) * TOTAL_PER_PAGE,
          page * TOTAL_PER_PAGE
        )
      );
    }
  }, [page]);
  useEffect(() => {
    axios
      .get("/cards")
      .then(function (response) {
        const LikedCards = response.data.filter((card) =>
          card.likes.includes(userId)
        );
        SetCards(
          response.data.slice(
            (page - 1) * TOTAL_PER_PAGE,
            page * TOTAL_PER_PAGE
          )
        );
        if (Math.ceil(LikedCards.length / TOTAL_PER_PAGE) > 1) {
          setnumPages(Math.ceil(LikedCards.length / TOTAL_PER_PAGE));
        }
        if (LikedCards.length === 0) {
          //check if he has favorite at all
          //if he dosent then render somthing else...
          WarningMessage("you  have no favorite cards...");
          navigate(ROUTES.HOME);
        }
        setInitialDataFromServer(LikedCards);
        setDone(true);
      })
      .catch(function (error) {
        ErrorMessage(error.response);
      });
  }, []);
  useEffect(() => {
    //check if initial data is populate if not return
    //check the value of the hook in filter key if empty return
    //if filter does contain something the fiter the cards
    if (!initialDataFromServer.length) return;
    const filter = search.filter ? search.filter : "";
    const filteredCards = initialDataFromServer.filter((card) =>
      card.title.startsWith(filter)
    );
    if (filteredCards.length === 0) {
      // Handle if card is empty after filter here
      WarningMessage("No cards match the filter");
    }
    if (filter) {
      //if he dose search something then show the result
      SetCards(filteredCards);
    } else {
      //if not or if he deleted thje search slice the user depends on the page
      SetCards(
        initialDataFromServer.slice(
          (page - 1) * TOTAL_PER_PAGE,
          page * TOTAL_PER_PAGE
        )
      );
    }
  }, [search.filter, initialDataFromServer]);
  const handleEditCard = useCallback((idToEdit) => {
    // Navigate to the specified path to edit the card
    navigate(`/cards/${idToEdit}/edit`);
  }, []);
  const handeDeleteCard = useCallback((idToDelte) => {
    axios
      .delete(`/cards/${idToDelte}`)
      .then(function (response) {
        SuccessMessage("delete success");
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
      });
  }, []);
  const handleLikeCard = (idToLike, like) => {
    axios
      .patch(`/cards/${idToLike}`)
      .then(function (response) {
        //it does unlike the card so give him maasege
        SuccessMessage("unliked");
        cards.map((card, index) => {
          if (card._id == idToLike) {
            //update the cards to delete it
            const copied = [...cards];
            copied.splice(index, 1);
            SetCards(copied);
            if (copied.length == 0) {
              //if the new cards became empty mange that
              WarningMessage("you  have no favorite cards...");
              navigate(ROUTES.HOME);
            }
          }
        });
      })
      .catch(function (error) {
        //error like or unlike the card faild(server error)
        ErrorMessage(error.response.data);
      });
  };
  if (done) {
    if (initialDataFromServer.length > 0 && cards.length > 0) {
      return (
        <>
          {cards && (
            <Box sx={{ flexGrow: 1, mt: "1em" }}>
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
                      likeFromData={true}
                      canDelete={card.user_id == userId ? true : false}
                    />
                  </Grid>
                ))}
              </Grid>
              {numPages && (
                <Pagination
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    mt: 4,
                  }}
                  count={numPages}
                  page={page}
                  onChange={handlePageChange}
                />
              )}
            </Box>
          )}
        </>
      );
    } else if (initialDataFromServer.length > 0 && cards.length == 0) {
      //no one match after the search
      return <Typography variant="h1">No card match</Typography>;
    }
  } else {
    //the check for like isn't done yet
    return (
      <Box sx={{ flexGrow: 1, mt: "1em" }}>
        <Grid container spacing={3}>
          {skeleton.map((card) => (
            <Grid xs={12} sm={6} md={3} key={card}>
              <SkeletonTamplateForCard />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
};
export default FavoriteCards;
