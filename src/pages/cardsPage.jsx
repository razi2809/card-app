import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TemplateCardComponent from "../components/TemplateCardComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Switch, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import useSearchquery from "../hooks/useSearchParams";
import WarningMessage from "../tostifyHandeker/WarningMessage";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const memoCard = React.memo(TemplateCardComponent);
export default function Cards() {
  const search = useSearchquery();
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const [dataFromServer, setDataFromServer] = useState("");
  const userData = useSelector((bigPie) => bigPie.authReducer.userInfo);
  const userId = userData._id;

  const navigate = useNavigate();
  // console.log(userData);
  useEffect(() => {
    axios
      .get("/cards")
      .then(function (response) {
        // console.log(response.data);
        setDataFromServer(response.data);

        setInitialDataFromServer(response.data);
      })
      .catch(function (error) {
        console.log(error);
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
    setDataFromServer(filteredCards);
  }, [search.filter, initialDataFromServer]);
  const handleEditCard = useCallback((idToEdit) => {
    // Navigate to the specified path אם קגןא איק בשרג
    navigate(`/cards/${idToEdit}/edit`);
  }, []);
  const handleLikeCard = useCallback((idToLike, like) => {
    // console.log("Card to like:", idToLike);
    axios
      .patch(`/cards/${idToLike}`)
      .then(function (response) {
        // setDataFromServer(response.data);
        if (!like) {
          SuccessMessage("liked");
        } else {
          SuccessMessage("unliked");
        }
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
      });

    // navigate(`/cards/${idToEdit}`); // Navigate to the specified path after the delay
  }, []);

  const handeDeleteCard = useCallback((idToDelte) => {
    axios
      .delete(`/cards/${idToDelte}`)
      .then(function (response) {
        SuccessMessage("delete complete");
        console.log(response.data);
        // setDataFromServer(response.data);
      })
      .catch(function (error) {
        WarningMessage(error.response.data);
        console.log(error.response.data);
      });
  }, []);
  // console.log("grid render");
  if (initialDataFromServer.length > 0 && dataFromServer.length > 0) {
    return (
      <Box sx={{ flexGrow: 1, mt: "1em" }}>
        <Grid container spacing={3}>
          {dataFromServer.map((card) => (
            <Grid xs={12} sm={6} md={3} key={card._id}>
              {/*  {userData && card.likes.includes(userData) ? (
                  <Typography variant="h6">like</Typography>
                ) : (
                  <Typography variant="h6">does not like</Typography>
                )} */}
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
    );
  } else if (initialDataFromServer.length > 0 && dataFromServer.length == 0) {
    //no one match after the search
    return <Typography variant="h1">No card match</Typography>;
  } else {
    return (
      <>
        <h1>loadwing data from the server...</h1>
      </>
    );
  }
}
