import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TemplateCardComponent from "../components/TemplateCardComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import useSearchquery from "../hooks/useSearchParams";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import Pagination from "@mui/material/Pagination";
import SkeletonTamplateForCard from "../components/SkeletonTamplateForCard";
import { likeAction } from "../REDUX/likeSlice";
export default function Cards() {
  const search = useSearchquery();
  const dispatch = useDispatch();

  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const [dataFromServer, setDataFromServer] = useState([]);
  const userData = useSelector((bigPie) => bigPie.authReducer.userInfo);
  const userId = userData._id;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const WhatPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(WhatPage);
  const TOTAL_PER_PAGE = 8;
  const skeleton = [0, 1, 2, 3, 4, 5, 6, 7];
  const [numPages, setnumPages] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    //get the page number from the param
    //setting the card data accordingly
    if (dataFromServer.length > 0) {
      setDisplayData(
        dataFromServer.slice((page - 1) * TOTAL_PER_PAGE, page * TOTAL_PER_PAGE)
      );
    }
  }, [page]);
  const handlePageChange = (_, newPage) => {
    //when he clicks to move a page then navigate to a new one
    //the page state will upate automaticly
    setPage(newPage);
    navigate(`/cards?page=${newPage}`);
  };
  useEffect(() => {
    axios
      .get("/cards")
      .then(function (response) {
        // get all the card data and divide it to pages by calc how much pages
        //then set up the wanted data on eace page
        setDataFromServer(response.data);
        setnumPages(Math.ceil(response.data.length / TOTAL_PER_PAGE));
        setInitialDataFromServer(response.data);
        setDisplayData(
          response.data.slice(
            (page - 1) * TOTAL_PER_PAGE,
            page * TOTAL_PER_PAGE
          )
        );
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
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
      // Handle empty response here
      WarningMessage("No cards match the filter");
    }
    if (filter) {
      //if he dose search something then show the result
      setDisplayData(filteredCards);
    } else {
      //if not or if he deleted thje search slice the user depends on the page
      setDisplayData(
        dataFromServer.slice((page - 1) * TOTAL_PER_PAGE, page * TOTAL_PER_PAGE)
      );
    }
  }, [search.filter, initialDataFromServer]);
  const handleEditCard = useCallback((idToEdit) => {
    // Navigate to the specified path to edit the card
    navigate(`/cards/${idToEdit}/edit`);
  }, []);
  const handleLikeCard = useCallback((idToLike, like) => {
    axios
      .patch(`/cards/${idToLike}`)
      .then(function (response) {
        dispatch(likeAction.changeState(true));

        if (!like) {
          SuccessMessage("liked");
        } else {
          SuccessMessage("unliked");
        }
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
      });
  }, []);

  const handeDeleteCard = useCallback((idToDelete) => {
    axios
      .delete(`/cards/${idToDelete}`)
      .then(function (response) {
        SuccessMessage("delete complete");
        console.log(response.data);
      })
      .catch(function (error) {
        WarningMessage(error.response.data);
      });
  }, []);
  if (
    initialDataFromServer.length > 0 &&
    dataFromServer.length > 0 &&
    displayData.length > 0
  ) {
    return (
      <Container>
        <Box sx={{ flexGrow: 1, mt: "1em" }}>
          <Grid container spacing={3}>
            {displayData.map((card) => (
              <Grid xs={12} sm={6} md={3} key={card._id}>
                <TemplateCardComponent
                  cardIsInHome={true}
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
      </Container>
    );
  } else if (initialDataFromServer.length > 0 && displayData.length == 0) {
    //no one match after the search
    return <Typography variant="h1">No card match</Typography>;
  } else {
    return (
      <Container>
        <Box sx={{ flexGrow: 1, mt: "1em" }}>
          <Grid container spacing={3}>
            {skeleton.map((card) => (
              <Grid xs={12} sm={6} md={3} key={card}>
                <SkeletonTamplateForCard cardIsInHome={true} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mt: 4,
            }}
            count={5}
            page={1}
          />
        </Box>{" "}
      </Container>
    );
  }
}
