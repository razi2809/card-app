import { Fragment, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { normalizeDataRegister } from "../../NormaliezedDate/normalizeDataRegister";
import { validateRegister } from "../..//validation/registerValidation";
import { Alert, Container, CssBaseline, Switch } from "@mui/material";
import SuccessMessage from "../../tostifyHandeker/SuccessMessage";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import ErrorMessage from "../../tostifyHandeker/ErrorMessage";
const RegisterPage = () => {
  const [inputsValue, setInputsValue] = useState({
    firstName: "",
    middle: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const requierd = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "password",
    "country",
    "city",
    "street",
    "houseNumber",
  ];
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState("");
  const [secondtrychance, setSeconrychance] = useState(false);
  const [business, setBusiness] = useState(false);
  // console.log(errorsState);
  const handleBusinessChange = () => {
    setBusiness(!business);
  };
  const handleInputsChange = (e) => {
    // console.log(e.target.value);
    const updatedInputs = {
      ...inputsValue,
      [e.target.id]: e.target.value,
    };
    setInputsValue((currentState) => ({
      //update the state  values
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    if (secondtrychance) {
      //when its his second try and we gave him the warning then
      //alert him if its still an error or if its not
      const joiResponse = validateRegister(updatedInputs);
      setErrorsState(joiResponse);
    }
    if (e.target.id === "houseNumber") {
      //check if its the lest input and want to regisert
      //sende the inpunts to the joi validate
      //if error from joi then set them and trigerr a alert for each input
      //if the joi dosent have value it empty so let the user hit submit
      const joiResponse = validateRegister(updatedInputs);
      setErrorsState(joiResponse);
      setSeconrychance(true);
    }
  };
  const handleSubmit = async (event) => {
    // after the joi validate it send the the data to the server and register
    //trigerr a toast meesage to the user
    try {
      event.preventDefault();
      let request = normalizeDataRegister(inputsValue, business);
      const { data } = await axios.post("/users", request);
      SuccessMessage("successfully register please perform log in");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      //toast the server meassege
      ErrorMessage(err);
    }
  };
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            register
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={4} sx={{ mt: 0 }}>
            <Grid container item md={6} sm={6} xs={12}>
              {Object.keys(inputsValue)
                .slice(0, Math.ceil(Object.keys(inputsValue).length / 2))
                .map((key) => (
                  <Fragment key={key}>
                    <Grid item container xs={1} sm={false} md={false}></Grid>
                    <Grid
                      container
                      item
                      spacing={2}
                      xs={10}
                      sm={12}
                      md={12}
                      sx={{ mb: "1.8em" }}
                    >
                      <TextField
                        fullWidth
                        autoFocus={key == "firstName" ? true : false}
                        id={key}
                        label={key}
                        value={inputsValue[key]}
                        onChange={handleInputsChange}
                        required={requierd.includes(key)}
                        type={key}
                      />
                      {errorsState && errorsState[key] && (
                        <Alert severity="warning">{errorsState[key]}</Alert>
                      )}
                    </Grid>
                    <Grid item container xs={1} sm={false} md={false}></Grid>
                  </Fragment>
                ))}
            </Grid>
            <Grid container item md={6} sm={6} xs={12}>
              {Object.keys(inputsValue)
                .slice(Math.ceil(Object.keys(inputsValue).length / 2))
                .map((key) => (
                  <Fragment key={key}>
                    <Grid item container xs={1} sm={false} md={false}></Grid>
                    <Grid
                      container
                      item
                      spacing={2}
                      xs={10}
                      sm={12}
                      md={12}
                      sx={{ mb: "1.8em" }}
                    >
                      <TextField
                        fullWidth
                        id={key}
                        label={key}
                        value={inputsValue[key]}
                        onChange={handleInputsChange}
                        required={requierd.includes(key)}
                        type={key}
                      />
                      {errorsState && errorsState[key] && (
                        <Alert severity="warning">{errorsState[key]}</Alert>
                      )}
                    </Grid>
                    <Grid item container xs={1} sm={false} md={false}></Grid>{" "}
                  </Fragment>
                ))}
            </Grid>
            <Grid
              container
              item
              sx={{ justifyContent: "center", alignItems: "center" }}
              sm={6}
              xs={6}
            >
              {" "}
              <Typography sx={{ display: "flex", alignSelf: "center" }}>
                is this a business account?
              </Typography>
              <Switch checked={business} onChange={handleBusinessChange} />
            </Grid>
            <Grid
              item
              container
              sx={{ justifyContent: "center" }}
              sm={6}
              xs={6}
            >
              <Button
                type="submit"
                fullWidth
                disabled={errorsState !== null}
                variant="contained"
              >
                regiser{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
