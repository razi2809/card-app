import { Box, CircularProgress, Fab } from "@mui/material";
import React from "react";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { normalizUpdatUserFromTable } from "../../NormaliezedDate/normalizUpdatUserFromTable";
import axios from "axios";
import SuccessMessage from "../../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../../tostifyHandeker/ErrorMessage";

const SaveChangeButton = ({ users, rowId, params }) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {}, []);

  const handleButtonClick = () => {
    const [user] = users.filter((user) => user._id === rowId);
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      //do stuff
      const req = normalizUpdatUserFromTable(params.row, user);
      axios
        .put(`/users/${rowId}`, req)
        .then(function (response) {
          setSuccess(true);
          setLoading(false);
          SuccessMessage("edit succseed");
        })
        .catch(function (error) {
          console.log(error);
          ErrorMessage(error.response.data);
          setLoading(false);
        });
    }
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Fab
        aria-label="save"
        color="primary"
        sx={{ ...buttonSx, height: 40, width: 40 }}
        onClick={handleButtonClick}
        disabled={params.id !== rowId || loading}
      >
        {success ? <CheckIcon /> : <SaveIcon />}
      </Fab>
      {loading && (
        <CircularProgress
          size={48}
          sx={{
            color: green[500],
            position: "absolute",
            top: -3,
            left: -4,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default SaveChangeButton;
