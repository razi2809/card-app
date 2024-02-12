import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { normalizUpdatUser } from "../NormaliezedDate/normalizUpdatUser";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import useAutoLogin from "../hooks/useAutoLogin";

const ProfileEdit = () => {
  // const [userDate, setDataFromServer] = useState(null);
  const login = useAutoLogin();
  const userinfo = useSelector((bigPie) => bigPie.authReducer.userInfo);
  const [userDate, setuserDate] = useState(userinfo);
  const [done, setDone] = useState(false);
  const [disableEdit, setdisableEdit] = useState(true);
  const [disableSubmit, setdisableSubmit] = useState(true);
  let { userId } = useParams();
  const navigate = useNavigate();
  const [inputsValue, setInputsValue] = useState({
    firstName: userDate.name.first,
    lastName: userDate.name.last,
    phone: userDate.phone,
    url: userDate.image.url,
    country: userDate.address.country,
    city: userDate.address.city,
    street: userDate.address.street,
  });
  const [inputsSkeleton, setInputsSkelton] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    url: "",
    country: "",
    city: "",
    street: "",
  });
  useEffect(() => {
    if (userinfo.isAdmin) {
      //check if he is admin and if so get the user he wants to edit and inform him he can edit
      axios
        .get(`/users/${userId}`)
        .then(function (response) {
          setuserDate(response.data.user);

          setInputsValue({
            firstName: response.data.user.name.first,
            lastName: response.data.user.name.last,
            phone: response.data.user.phone,
            url: response.data.user.image.url,
            country: response.data.user.address.country,
            city: response.data.user.address.city,
            street: response.data.user.address.street,
          });
          SuccessMessage(
            `you can edit ${response.data.user.name.first}'s profile`
          );
          setDone(true);
        })
        .catch((err) => {
          //catch an server error

          ErrorMessage(err.response.data.message);
        });
    } else {
      setDone(true);
    }
  }, []);

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    if (e.target.id == "street") {
      setdisableSubmit(false);
    }
  };
  const handleWantToEdit = () => {
    setdisableEdit(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //when he hit submit then send the udape and th non update to a normalize data strucutre
    //then send it to server and toast a message indicat if it succeed
    const request = normalizUpdatUser(inputsValue, userDate);
    axios
      .put(`/users/${userDate._id}`, request)
      .then(function (response) {
        SuccessMessage("edit succseed");
        login();
        navigate(ROUTES.HOME);
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
      });
  };

  if (done && userDate == null) {
    //sholdnt happen unlees server erro
    return (
      <Typography variant="h1">didnt succeed geting the user info</Typography>
    );
  } else if (userDate) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            src={done ? userDate.image.url : "/static/images/avatar/2.jpg"}
          />
          <Typography component="h1" variant="h5">
            information of {done ? inputsValue.firstName : ""}{" "}
            {disableEdit && (
              <Button onClick={handleWantToEdit}>edit user</Button>
            )}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              {done &&
                Object.keys(inputsValue).map((key) => (
                  <Grid container item spacing={2} key={key}>
                    <TextField
                      disabled={disableEdit}
                      fullWidth
                      id={key}
                      type={key}
                      label={key}
                      value={inputsValue[key]}
                      onChange={handleInputsChange}
                    />
                  </Grid>
                ))}
              {!done &&
                Object.keys(inputsSkeleton).map((key) => (
                  <Grid container item spacing={2} key={key}>
                    <TextField
                      disabled={disableEdit}
                      fullWidth
                      id={key}
                      type={key}
                      label={key}
                      value={inputsSkeleton[key]}
                    />
                  </Grid>
                ))}
              {!disableEdit && (
                <>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={disableSubmit}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    upadate information
                  </Button>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
};
export default ProfileEdit;
