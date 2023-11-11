import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import TamplateUserComponent from "../components/TamplateUserComponent";
import {
  Box,
  Grid,
  Pagination,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import useSearchquery from "../hooks/useSearchParams";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import UsersTableComponent from "../components/usersTableComponent";
import GridOnIcon from "@mui/icons-material/GridOn";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
const SandBoxPage = () => {
  const [layout, setLayout] = useState("table");
  const [dataFromServer, setDataFromServer] = useState([]);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const search = useSearchquery();
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  /*   const [searchParams] = useSearchParams();
  const WhatPage = searchParams.get("page") || 1; */
  const [page, setPage] = useState(+1);
  const TOTAL_PER_PAGE = 12;
  const [numPages, setnumPages] = useState("0");
  const [displayData, setDisplayData] = useState([]);
  const handleDevices = (event, newDevices) => {
    if (newDevices) {
      setLayout(newDevices);
    }
  };

  useEffect(() => {
    if (dataFromServer.length > 0) {
      //get the page number from the param
      //setting the user data accordingly
      setDisplayData(
        dataFromServer.slice((page - 1) * TOTAL_PER_PAGE, page * TOTAL_PER_PAGE)
      );
    }
  }, [page]);
  const handlePageChange = (_, newPage) => {
    //when he clicks to move a page then navigate to a new one
    //the page state will upate automaticly
    setPage(newPage);
    navigate(`/sandbox?page=${newPage}`);
  };
  /* const handleEdituser = (id) => {
    // Navigate to the specified path after the delay
    //with the id provided of the user
    navigate(`/profile/${id}`);
  }; */
  const handleEdituser = useCallback((id) => {
    // Navigate to the specified path to edit the card
    navigate(`/profile/${id}`);
  }, []);
  /*  const handeDeleteuser = (id) => {
    axios
      .delete(`/users/${id}`)
      .then(function (response) {
        SuccessMessage("user deleted");
      })
      .catch((err) => {
        ErrorMessage(err.response.data);
      });
    console.log(id);
  }; */
  const handeDeleteuser = useCallback((idToDelete) => {
    axios
      .delete(`/users/${idToDelete}`)
      .then(function (response) {
        SuccessMessage("delete complete");
        console.log(response.data);
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/users")
      .then(function (response) {
        setDataFromServer(response.data);
        setInitialDataFromServer(response.data);
        setDone(true);
        setnumPages(Math.ceil(response.data.length / TOTAL_PER_PAGE));
        // get all the user data and divide it to pages by calc how much pages
        //then set up the wanted data on eace page
        setDisplayData(
          response.data.slice(
            (page - 1) * TOTAL_PER_PAGE,
            page * TOTAL_PER_PAGE
          )
        );
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
      if (layout === "grid") {
        WarningMessage("No users match the filter");
      }
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
  }, [search.filter]);

  if (done && dataFromServer.length > 0) {
    return (
      <Box>
        <Typography variant="h3" sx={{ textAlign: "center", mt: 3, mb: 3 }}>
          manage users
        </Typography>
        <Box
          sx={{
            // borderRadius: "50%",
            mb: 2,
          }}
        >
          <ToggleButtonGroup
            value={layout}
            onChange={handleDevices}
            aria-label="device"
            exclusive
          >
            <ToggleButton
              value="grid"
              aria-label="grid"
              sx={{ borderRadius: "30%", mr: 0, height: 1 }}
            >
              <Tooltip title="grid view" placement="top">
                <GridOnIcon />
              </Tooltip>
            </ToggleButton>

            <ToggleButton
              value="table"
              aria-label="table"
              sx={{ borderRadius: "30%", height: 1 }}
            >
              <Tooltip title="table view" placement="top">
                <TocOutlinedIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {layout === "table" && (
          <UsersTableComponent
            dataOfUsers={dataFromServer.map((user) => {
              return {
                id: user._id,
                firstName: user.name.first,
                lastName: user.name.last,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
                avatar: user.image.url,
                country: user.address.country,
              };
            })}
            onEdituser={handleEdituser}
            onDeleteuser={handeDeleteuser}
            users={dataFromServer}
          />
        )}
        {layout === "grid" && (
          <Box sx={{ flexGrow: 1, mt: "1em" }}>
            <Grid container spacing={3}>
              {displayData.map((user) => (
                <Grid xs={12} sm={6} md={3} key={user._id} item>
                  <TamplateUserComponent
                    id={user._id}
                    firstName={user.name.first}
                    lastName={user.name.last}
                    email={user.email}
                    user={user}
                    onEdituser={handleEdituser}
                    onDeleteuser={handeDeleteuser}
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
                  mt: 2,
                }}
                count={numPages}
                page={page}
                onChange={handlePageChange}
              />
            )}
          </Box>
        )}
      </Box>
    );
  }
};
export default SandBoxPage;

/* if (done && dataFromServer.length > 0) {
  return (
  );
} */
