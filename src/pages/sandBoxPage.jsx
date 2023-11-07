import axios from "axios";
import React, { useEffect, useState } from "react";
import TamplateUserComponent from "../components/TamplateUserComponent";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import useSearchquery from "../hooks/useSearchParams";

const SandBoxPage = () => {
  const [dataFromServer, setDataFromServer] = useState("");
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const search = useSearchquery();

  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const handleEdituser = (id) => {
    // Navigate to the specified path after the delay
    //with the id provided of the user
    navigate(`/profile/${id}`);
  };
  const handeDeleteuser = (id) => {
    axios
      .delete(`/users/${id}`)
      .then(function (response) {
        SuccessMessage("user deleted");
      })
      .catch((err) => {
        ErrorMessage(err.response.data);
      });
    console.log(id);
  };
  useEffect(() => {
    axios
      .get("/users")
      .then(function (response) {
        setDataFromServer(response.data);
        setInitialDataFromServer(response.data);
        setDone(true);
      })
      .catch((err) => {
        console.log(err);
        setDone(true);
      });
  }, []);
  useEffect(() => {
    //check if initial data is populate if not return
    //check the value of the hook in filter key if empty return
    //if filter does contain something the fiter the cards
    if (!initialDataFromServer.length) return;
    const filter = search.filter ? search.filter : "";
    const filteredCards = initialDataFromServer.filter((user) =>
      user.name.first.startsWith(filter)
    );
    if (filteredCards.length === 0) {
      // Handle empty response here
      WarningMessage("No users match the filter");
    }
    setDataFromServer(filteredCards);
  }, [search.filter, initialDataFromServer]);
  if (done && dataFromServer.length > 0) {
    return (
      <Box sx={{ flexGrow: 1, mt: "1em" }}>
        <Grid container spacing={3}>
          {dataFromServer.map((user) => (
            <Grid xs={12} sm={6} md={3} key={user._id} item>
              <TamplateUserComponent
                id={user._id}
                firstName={user.name.first}
                lastName={user.name.last}
                email={user.email}
                onEdituser={handleEdituser}
                onDeleteuser={handeDeleteuser}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
};

export default SandBoxPage;
