import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const PopUpBox = styled(Box)(({ theme }) => ({
  width: "15rem",
  height: "15rem",
  margin: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: 10,
  background: theme.palette.grey[500],
  boxShadow: theme.shadows[15],
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  "&:hover": {
    boxShadow: "5px 5px 5px red",
  },
}));

const PopUp = ({ choice }) => {
  const handleChoice = (e) => {
    choice(e.target.innerText);
  };
  return (
    <Box
      sx={{
        zIndex: 100,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PopUpBox onClick={handleChoice}>
        <Typography variant="h6">user is admin</Typography>
      </PopUpBox>
      <PopUpBox onClick={handleChoice}>
        <Typography variant="h6">user is business</Typography>
      </PopUpBox>
      <PopUpBox onClick={handleChoice}>
        <Typography variant="h6">user is regular </Typography>
      </PopUpBox>
    </Box>
  );
};

export default PopUp;
