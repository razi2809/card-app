import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import TamplateUserComponent from "../components/userCoponents/TamplateUserComponent";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import useSearchquery from "../hooks/useSearchParams";
import UsersTableComponent from "../components/userCoponents/usersTableComponent";
import GridviewLayout from "../components/layoutRelatedComponents/GridviewLayout";
import TableSkeleton from "../components/userCoponents/TableSkeleton";
import SkeletonTamplateForUser from "../components/userCoponents/SkeletonTamplateForUser";
const SandBoxPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const search = useSearchquery();
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const WhatPage = parseInt(searchParams.get("page")) || 1;
  const WhatView = searchParams.get("view") || "table";
  const [layout, setLayout] = useState(WhatView);
  const [page, setPage] = useState(WhatPage);
  const TOTAL_PER_PAGE = 12;
  const [numPages, setnumPages] = useState("0");
  const [displayData, setDisplayData] = useState([]);
  const skeleton = [0, 1, 2, 3, 4, 5];
  const handleDevicesChage = (newDevices) => {
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
    window.scrollTo({ top: 0, left: 0 });

    navigate(`/sandbox?page=${newPage}&view=${WhatView}`);
  };
  const handleEdituser = useCallback((id) => {
    // Navigate to the specified path to edit the user
    navigate(`/profile/${id}`);
  }, []);

  const handeDeleteuser = (idToDelete) => {
    axios
      .delete(`/users/${idToDelete}`)
      .then(function (response) {
        SuccessMessage("delete complete");
        displayData.map((user, index) => {
          console.log(user);
          if (user._id == idToDelete) {
            //update the cards to delete it
            const copied = [...displayData];
            copied.splice(index, 1);
            setDisplayData(copied);
          }
        });
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
      });
  };
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
        ErrorMessage(err.response);
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
      //if not or if he deleted the search slice the user depends on the page
      setDisplayData(
        dataFromServer.slice((page - 1) * TOTAL_PER_PAGE, page * TOTAL_PER_PAGE)
      );
    }
  }, [search.filter, initialDataFromServer]);

  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{ textAlign: "center", mt: 3, mb: 3 }}>
          manage users
        </Typography>
        <Box
          sx={{
            mb: 2,
          }}
        >
          <GridviewLayout handleDevices={handleDevicesChage} />
        </Box>
        {layout === "table" && done && dataFromServer.length > 0 && (
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
        {layout === "table" && !done && <TableSkeleton />}
        {layout === "grid" && done && dataFromServer.length > 0 && (
          <Box sx={{ flexGrow: 1, mt: "1em" }}>
            <Grid container spacing={3}>
              {displayData.map((user) => (
                <Grid xs={12} sm={6} md={3} key={user._id} item>
                  <TamplateUserComponent
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
        {layout === "grid" && !done && (
          <Box sx={{ flexGrow: 1, mt: "1em" }}>
            <Grid container spacing={3}>
              {skeleton.map((card) => (
                <Grid xs={12} sm={6} md={3} key={card} item>
                  <SkeletonTamplateForUser />
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
          </Box>
        )}
      </Box>
    </Container>
  );
};
export default SandBoxPage;
